import { useState, type ReactNode } from 'react';
import { Text, View } from 'react-native';

import {
  AnswerPill,
  AvatarStack,
  Card,
  CritterAvatar,
  ResultBar,
  Screen,
  T,
  colors,
  critterBodies,
  type CritterAvatarProps,
  type CritterBody,
  type Option,
} from '../ui';

/**
 * Dev-only gallery for ROADMAP 5.1 (theme + shared components). Not a product
 * screen. Top half rebuilds mockup 01's "Today, voted" layout from the shared
 * pieces with dummy data; bottom half is a sheet of every component state, so
 * Greg can review the design system in the PR (D-023).
 */

const QUESTION = { a: 'Read minds', b: 'See the future' };
const ICON_A = <Text style={{ fontSize: 17 }}>{'👁️'}</Text>; // eye
const ICON_B = <Text style={{ fontSize: 17 }}>{'🔮'}</Text>; // crystal ball

const FRIENDS: CritterAvatarProps[] = [
  { critter: 'Capy', body: 'butter', pick: 'a' },
  { critter: 'Axie', body: 'lilac', pick: 'a' },
  { critter: 'Bun', body: 'peach', pick: 'b' },
  { critter: 'Ribbs', body: 'mint', pick: 'a' },
  ...Array.from({ length: 8 }, (_, i): CritterAvatarProps => ({ critter: 'Mochi', body: 'skyGrey', pick: i % 3 ? 'a' : 'b' })),
];

export function Gallery() {
  const [pick, setPick] = useState<Option | undefined>(undefined);
  const voted = pick !== undefined;

  return (
    <Screen>
      {/* ---- Header (mockup 01) ---- */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <T v="wordmark">WidgetRather</T>
        <T v="caption">gallery · tap a pill</T>
      </View>

      {/* ---- Question card: before vs after voting ---- */}
      <Card>
        <T v="question" style={{ textAlign: 'center' }}>
          Would you rather
        </T>
        {voted ? (
          <>
            <AnswerPill option={pick} label={QUESTION[pick]} picked size="lg" onPress={() => setPick(undefined)} />
            <T v="label" style={{ textAlign: 'center' }}>
              You and 12 friends agree {'🎉'}
            </T>
          </>
        ) : (
          <>
            <AnswerPill option="a" label={QUESTION.a} icon={ICON_A} size="lg" onPress={() => setPick('a')} />
            <AnswerPill option="b" label={QUESTION.b} icon={ICON_B} size="lg" onPress={() => setPick('b')} />
          </>
        )}
      </Card>

      {/* ---- Results: hidden until you vote (MVP-SPEC §4) ---- */}
      {voted ? (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <T v="heading">Your friends</T>
            <AvatarStack people={FRIENDS} />
          </View>
          <View style={{ gap: 7 }}>
            <ResultBar label={QUESTION.a} percent={68} option="a" />
            <ResultBar label={QUESTION.b} percent={32} option="b" />
          </View>
          <Card style={{ gap: 6 }}>
            <T v="label">{'✨'} Rare pick</T>
            <T v="body">{rarePick(pick === 'a' ? 54 : 46)}</T>
            <T v="label" style={{ marginTop: 6 }}>
              {'🫶'} Your twin
            </T>
            <T v="body">You and Axie agree the most: 8 of the last 10.</T>
            <T v="label" style={{ marginTop: 6 }}>
              {'⚖️'} Split meter
            </T>
            <T v="body">Today split everyone 54/46.</T>
          </Card>
        </>
      ) : (
        <T v="caption" style={{ textAlign: 'center' }}>
          Pick one to see how your friends split.
        </T>
      )}

      {/* ---- Component sheet ---- */}
      <View style={{ height: 1, backgroundColor: colors.divider, marginVertical: 8 }} />
      <T v="title">Component sheet</T>

      <Section title="Type scale">
        <T v="wordmark">Wordmark · Nunito 900</T>
        <T v="title">Title</T>
        <T v="heading">Heading</T>
        <T v="question">Question</T>
        <T v="body">Body text for explanations and insights.</T>
        <T v="label">Label</T>
        <T v="caption">Caption</T>
      </Section>

      <Section title="Answer pills: sizes and states">
        <AnswerPill option="a" label="Option A · sm" size="sm" />
        <AnswerPill option="b" label="Option B · md" icon={ICON_B} />
        <AnswerPill option="a" label="Picked · lg" picked size="lg" />
        <AnswerPill option="b" label="Dimmed (not picked)" dimmed />
      </Section>

      <Section title="Result bars">
        <ResultBar label="Card style" percent={68} option="a" />
        <ResultBar label="Card style" percent={32} option="b" />
        <ResultBar label="Stacked (widget)" percent={54} option="a" variant="stacked" />
        <ResultBar label="Stacked (widget)" percent={46} option="b" variant="stacked" />
      </Section>

      <Section title="Critter avatars: body colours (placeholder art)">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
          {(Object.keys(critterBodies) as CritterBody[]).map((body) => (
            <View key={body} style={{ alignItems: 'center', gap: 4 }}>
              <CritterAvatar critter={body} body={body} />
              <T v="caption">{body}</T>
            </View>
          ))}
        </View>
      </Section>

      <Section title="Bandana tint: before vote / picked A / picked B">
        <View style={{ flexDirection: 'row', gap: 14, alignItems: 'center' }}>
          <CritterAvatar critter="Capy" body="butter" size={44} />
          <CritterAvatar critter="Capy" body="butter" pick="a" size={44} />
          <CritterAvatar critter="Capy" body="butter" pick="b" size={44} />
        </View>
      </Section>

      <Section title="22px check (large widget face stack)">
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          {(['Fen', 'Mochi', 'Maple', 'Beanie'] as const).map((c) => (
            <CritterAvatar key={c} critter={c} body="lilac" pick="a" size={22} />
          ))}
          <T v="caption">Fen · Mochi · Maple · Beanie: retest with real art</T>
        </View>
      </Section>
    </Screen>
  );
}

/**
 * MVP-SPEC §5 Rare pick wording: <=25% -> rare, >=75% -> with the crowd,
 * otherwise a plain split. (Thresholds are [proposed defaults] in the spec.)
 */
function rarePick(myPct: number): string {
  if (myPct <= 25) return `Only ${myPct}% picked this. You're rare.`;
  if (myPct >= 75) return `You're with ${myPct}% of people.`;
  return `Split: ${myPct}/${100 - myPct}.`;
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card style={{ gap: 10 }}>
      <T v="label" style={{ color: colors.plum3, textTransform: 'uppercase', letterSpacing: 0.8, fontSize: 10.5 }}>
        {title}
      </T>
      {children}
    </Card>
  );
}
