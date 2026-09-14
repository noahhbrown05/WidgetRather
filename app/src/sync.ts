/**
 * The seam between the widget and the app (pass 1, D-021).
 *
 * Two directions, and they are the two halves of D-020:
 *
 *   publishToday()      app -> widget.  Schedules what the widget shows and when.
 *                       Uses updateTimeline with a FUTURE entry for the drop moment,
 *                       which is what makes the on-device drop possible at all.
 *
 *   collectWidgetVotes() widget -> app.  Reads back props the widget persisted while
 *                       the app was not running, and writes them into local history.
 *                       In pass 2 the flush-to-server step hangs off the same call.
 *
 * Why getTimeline and not addUserInteractionListener: the listener "only fires while
 * the app process is alive, so use it to mirror interactions into app state, not as
 * the widget's update mechanism" (SDK 57 docs). A widget tap at 07:15 with the app
 * closed is the normal case, not the edge case, so the listener would miss most votes.
 * getTimeline "returns the entries currently scheduled for a widget, including past
 * and future entries", and a tap's persisted props are among them.
 * https://docs.expo.dev/versions/v57.0.0/sdk/widgets/
 */

import TodayWidget, { type TodayWidgetProps } from './widget/TodayWidget';
import { QUESTIONS } from './questions';
import { dropTimeForDay, hasDropped, localDayKey, questionForDay, type MorningWindow, MORNING_WINDOW } from './schedule';
import { answerFor, recordAnswer, type Choice } from './store';

/**
 * Dummy group numbers for pass 1. D-021: "dummy numbers where group results go".
 * Deliberately obvious rather than realistic, so nobody mistakes a pass-1 build for
 * a working social app. Pass 2 replaces this with the group's real split.
 */
const DUMMY_SPLIT = { aPercent: 50, bPercent: 50 };

/**
 * Push today's timeline to the widget.
 *
 * Entry 1 (now):        yesterday's results, if the drop has not happened yet.
 * Entry 2 (drop time):  today's question, interactive.
 * The system flips between them on its own, with no app process and no server push.
 * If the question has already been answered, a single answered entry replaces both.
 */
export function publishToday(now: Date = new Date(), window: MorningWindow = MORNING_WINDOW): void {
  const key = localDayKey(now);
  const question = questionForDay(key);
  const existing = answerFor(question.id);

  const base = {
    questionId: question.id,
    a: question.a,
    b: question.b,
    ...DUMMY_SPLIT,
  };

  if (existing) {
    TodayWidget.updateSnapshot({
      ...base,
      phase: 'answered',
      choice: existing.choice,
      answeredAt: existing.answeredAt,
    });
    return;
  }

  const entries: { date: Date; props: TodayWidgetProps }[] = [];

  if (!hasDropped(now, window)) {
    entries.push({
      date: now,
      props: { ...base, phase: 'before-drop', choice: null, answeredAt: null },
    });
  }

  entries.push({
    date: hasDropped(now, window) ? now : dropTimeForDay(now, window),
    props: { ...base, phase: 'unanswered', choice: null, answeredAt: null },
  });

  TodayWidget.updateTimeline(entries);
}

export type CollectedVote = {
  questionId: string;
  choice: Choice;
  answeredAt: number;
  /** ms between the tap and the app first seeing it. The ROADMAP 4.3 measurement. */
  delayMs: number;
  wasDuplicate: boolean;
};

/**
 * Read any votes the widget recorded while the app was closed and store them locally.
 * Safe to call on every launch: recordAnswer enforces first-write-wins (D-020), so
 * re-reading the same timeline entry does not create a second answer.
 */
export async function collectWidgetVotes(now: number = Date.now()): Promise<CollectedVote[]> {
  const entries = await TodayWidget.getTimeline();
  const collected: CollectedVote[] = [];

  for (const entry of entries) {
    const props = entry.props;
    if (!props || props.phase !== 'answered' || !props.choice) continue;

    // answeredAt may be missing if Date.now() turns out to be unavailable in the
    // widget runtime (see TodayWidgetProps). Fall back to the entry's own date so a
    // vote is never dropped just because its timestamp is.
    const answeredAt = props.answeredAt ?? entry.date.getTime();

    const { wasDuplicate } = recordAnswer(props.questionId, props.choice, 'widget', answeredAt, now);
    collected.push({
      questionId: props.questionId,
      choice: props.choice,
      answeredAt,
      delayMs: now - answeredAt,
      wasDuplicate,
    });
  }

  return collected;
}

/**
 * Launch routine: pick up anything the widget recorded, then re-arm the widget.
 * Pass 2 inserts the server flush between the two, which is the whole of its change
 * to this file.
 */
export async function onAppForeground(now: Date = new Date()): Promise<CollectedVote[]> {
  const collected = await collectWidgetVotes(now.getTime());
  // TODO(pass 2): flush pendingAnswers() to Supabase here, then mark syncedAt.
  publishToday(now);
  return collected;
}

/** Answering inside the app. Same store, same first-write-wins rule. */
export function answerInApp(questionId: string, choice: Choice, now: Date = new Date()) {
  const result = recordAnswer(questionId, choice, 'app', now.getTime(), now.getTime());
  publishToday(now);
  return result;
}

/** Re-exported so the dev harness does not need to know the module layout. */
export { QUESTIONS };
