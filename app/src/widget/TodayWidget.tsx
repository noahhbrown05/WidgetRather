/**
 * The home-screen widget (pass 1, D-021).
 *
 * LAYOUT IS DELIBERATELY PLAIN. Design is Noah's (D-017) and waits for the design
 * freeze (ROADMAP Stage 2). D-021's exception covers plumbing, not screens. What is
 * being proven here is the mechanism, not the look: question in, tap out, state
 * persisted with no app process running.
 *
 * RUNTIME CONSTRAINTS - read before editing. Code inside the 'widget'-marked function
 * runs in an isolated runtime and, per the SDK 57 docs:
 *   - "It can only render `@expo/ui/swift-ui` components and modifiers."
 *   - "It cannot use React hooks (`useState`, `useEffect`, and others), component
 *      state, or context."
 *   - "It cannot perform asynchronous work, import other modules, or access your
 *      app's runtime or in-memory state."
 *   - It cannot reference anything declared outside the component function,
 *     "including plain top-level `const`s in the same file".
 * So every value the widget needs arrives through props, and every helper is inline.
 * Type-only declarations are fine: they are erased before the bundle is built.
 * https://docs.expo.dev/versions/v57.0.0/sdk/widgets/
 */

import { Button, Spacer, Text, VStack } from '@expo/ui/swift-ui';
import { font, foregroundColor, minimumScaleFactor, multilineTextAlignment, padding } from '@expo/ui/swift-ui/modifiers';
import { createWidget, type WidgetEnvironment } from 'expo-widgets';

/** Erased at compile time, so referencing this from the widget is safe. */
export type TodayWidgetProps = {
  /** 'before-drop' shows yesterday; 'unanswered' is the live question; 'answered' is locked in. */
  phase: 'before-drop' | 'unanswered' | 'answered';
  questionId: string;
  a: string;
  b: string;
  choice: 'a' | 'b' | null;
  /**
   * ms since epoch, written by the tap itself. This is the number ROADMAP 4.3 wants:
   * comparing it to when the app first reads it back gives the real vote delay.
   * [UNVERIFIED] that Date.now() is available in the widget runtime - the docs list
   * what is forbidden but do not confirm the global clock. First simulator build
   * settles it; if it is missing, fall back to environment.date (the entry date),
   * which is coarser but always present.
   */
  answeredAt: number | null;
  /** Pass 1 ships dummy numbers here. Pass 2 replaces them with the group's real split. */
  aPercent: number;
  bPercent: number;
};

const TodayWidget = (props: TodayWidgetProps, environment: WidgetEnvironment) => {
  'widget';

  const isSmall = environment.widgetFamily === 'systemSmall';
  const isLarge = environment.widgetFamily === 'systemLarge';

  if (props.phase === 'before-drop') {
    return (
      <VStack modifiers={[padding({ all: 12 })]}>
        <Text modifiers={[font({ size: isSmall ? 13 : 15, weight: 'semibold' })]}>
          New question this morning
        </Text>
        <Spacer />
        <Text modifiers={[font({ size: 12 }), foregroundColor('#6b7280')]}>
          Yesterday: {props.aPercent}% / {props.bPercent}%
        </Text>
      </VStack>
    );
  }

  if (props.phase === 'answered') {
    const picked = props.choice === 'a' ? props.a : props.b;
    const pickedPercent = props.choice === 'a' ? props.aPercent : props.bPercent;
    return (
      <VStack modifiers={[padding({ all: 12 })]}>
        <Text modifiers={[font({ size: 12 }), foregroundColor('#6b7280')]}>You picked</Text>
        <Text
          modifiers={[
            font({ size: isSmall ? 15 : 18, weight: 'bold' }),
            multilineTextAlignment('leading'),
            minimumScaleFactor(0.6),
          ]}>
          {picked}
        </Text>
        <Spacer />
        <Text modifiers={[font({ size: 13 })]}>{pickedPercent}% of your group agrees</Text>
        {isLarge ? (
          <Text modifiers={[font({ size: 12 }), foregroundColor('#6b7280')]}>
            Numbers are from the last update, not live. Open the app for current ones.
          </Text>
        ) : null}
      </VStack>
    );
  }

  // 'unanswered': the only interactive state.
  // A button's onPress return value becomes the widget's new props. Per the docs the
  // runtime "persists it and reloads the widget on device, with no running app process
  // required" - which is exactly D-020's local pending vote.
  return (
    <VStack modifiers={[padding({ all: 12 })]}>
      <Text
        modifiers={[
          font({ size: isSmall ? 13 : 15, weight: 'semibold' }),
          multilineTextAlignment('leading'),
          minimumScaleFactor(0.6),
        ]}>
        Would you rather?
      </Text>
      <Spacer />
      <Button
        target="pick-a"
        label={props.a}
        onPress={() => ({
          phase: 'answered',
          questionId: props.questionId,
          a: props.a,
          b: props.b,
          choice: 'a',
          answeredAt: Date.now(),
          aPercent: props.aPercent,
          bPercent: props.bPercent,
        })}
      />
      <Button
        target="pick-b"
        label={props.b}
        onPress={() => ({
          phase: 'answered',
          questionId: props.questionId,
          a: props.a,
          b: props.b,
          choice: 'b',
          answeredAt: Date.now(),
          aPercent: props.aPercent,
          bPercent: props.bPercent,
        })}
      />
    </VStack>
  );
};

/** Name must match the "name" field in the expo-widgets config in app.json. */
export default createWidget<TodayWidgetProps>('TodayWidget', TodayWidget);
