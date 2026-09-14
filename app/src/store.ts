/**
 * Local answer store (pass 1, D-021): "answer saved locally" + "your answer history".
 *
 * This is the real thing, not a stand-in. D-020 established that a widget tap is
 * ALWAYS a local write that syncs when the app next runs - that is how iOS widgets
 * work, not a shortcut we chose. So the local store is permanent architecture, and
 * pass 2 adds a flush step on top of it rather than replacing it.
 *
 * Storage is expo-sqlite/kv-store: first-party, SQLite-backed, and a drop-in
 * replacement for AsyncStorage with synchronous methods available.
 * https://docs.expo.dev/versions/v57.0.0/sdk/sqlite/
 */

import Storage from 'expo-sqlite/kv-store';

const ANSWERS_KEY = 'widget-rather/answers/v1';

export type Choice = 'a' | 'b';

export type AnswerRecord = {
  questionId: string;
  choice: Choice;
  /** When the user actually tapped, in ms. From the widget this can be well before it is read. */
  answeredAt: number;
  /** Where the tap happened. The widget path is the one that arrives late (D-020). */
  source: 'widget' | 'app';
  /**
   * When the app first observed this answer, in ms.
   * For widget taps, (observedAt - answeredAt) IS the vote delay that ROADMAP 4.3
   * asks us to measure. Keep both numbers; the difference is the deliverable.
   */
  observedAt: number;
  /**
   * Pass 2 seam: null until the answer reaches the server. Nothing in pass 1 sets it.
   */
  syncedAt: number | null;
};

export function readAnswers(): AnswerRecord[] {
  const raw = Storage.getItemSync(ANSWERS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as AnswerRecord[]) : [];
  } catch {
    // Corrupt payload: better to start clean than to crash on launch.
    return [];
  }
}

function writeAnswers(answers: AnswerRecord[]): void {
  Storage.setItemSync(ANSWERS_KEY, JSON.stringify(answers));
}

export function answerFor(questionId: string): AnswerRecord | undefined {
  return readAnswers().find((a) => a.questionId === questionId);
}

/**
 * Record an answer. First write wins.
 *
 * Two decisions land on this one line: MVP-SPEC section 4 "your first tap locks in",
 * and D-020's "rejects duplicates" for late and out-of-order votes. Enforcing it here
 * as well as on the server means a late widget vote can never overwrite an app vote
 * the user made first.
 *
 * @returns the stored record - the existing one if this was a duplicate.
 */
export function recordAnswer(
  questionId: string,
  choice: Choice,
  source: AnswerRecord['source'],
  answeredAt: number,
  now: number = Date.now()
): { record: AnswerRecord; wasDuplicate: boolean } {
  const answers = readAnswers();
  const existing = answers.find((a) => a.questionId === questionId);
  if (existing) return { record: existing, wasDuplicate: true };

  const record: AnswerRecord = {
    questionId,
    choice,
    answeredAt,
    source,
    observedAt: now,
    syncedAt: null,
  };
  answers.push(record);
  writeAnswers(answers);
  return { record, wasDuplicate: false };
}

/** Pass 2 seam: everything still waiting to go to the server, oldest first. */
export function pendingAnswers(): AnswerRecord[] {
  return readAnswers()
    .filter((a) => a.syncedAt === null)
    .sort((a, b) => a.answeredAt - b.answeredAt);
}

/** Dev-harness helper. Not wired to any user-facing control. */
export function clearAnswers(): void {
  Storage.removeItemSync(ANSWERS_KEY);
}
