/**
 * Deterministic question-of-the-day and drop moment, computed entirely on-device.
 *
 * WHY THIS EXISTS
 * D-021 flagged as [UNVERIFIED]: if today's question *and* its drop time can both be
 * derived on-device, "the morning drop may not need the server at all", leaving the
 * server responsible only for the notification banner. This module is that experiment.
 *
 * The property we need (MVP-SPEC section 4): "Random, once per time zone per day",
 * the same moment for everyone in a time zone, with nobody coordinating them.
 * We get it by deriving everything from the device's LOCAL calendar date:
 *   - two phones in the same time zone share a local date, so they agree;
 *   - two phones in different zones have different local dates/offsets, so each zone
 *     drops at its own moment.
 * No network, no clock sync, no shared secret.
 *
 * Every function here is pure and synchronous, so the widget's timeline can be built
 * ahead of time and so this is testable without a simulator.
 *
 * NOT decided yet: the exact morning window. MVP-SPEC section 4 marks it [OPEN] and
 * ROADMAP 0.5 still owes an answer. MORNING_WINDOW below is a placeholder, not a
 * decision - every function takes the window as an argument so changing it is a
 * one-line edit once Noah and Greg agree.
 */

import { QUESTIONS, type Question } from './questions';

/**
 * PLACEHOLDER, NOT A DECISION. MVP-SPEC section 4: exact window is [OPEN], team decides
 * (ROADMAP 0.5). Minutes from local midnight: 07:00 -> 08:30.
 */
export const MORNING_WINDOW = { startMinute: 7 * 60, endMinute: 8 * 60 + 30 } as const;

export type MorningWindow = { startMinute: number; endMinute: number };

/** The device's local calendar date as "YYYY-MM-DD". The per-time-zone key. */
export function localDayKey(now: Date): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * FNV-1a 32-bit followed by a MurmurHash3 finalizer. Small, dependency-free, and
 * stable across JS engines.
 *
 * The finalizer is not decoration. Plain FNV-1a avalanches weakly when inputs differ
 * only in their last character - which is exactly our case, since consecutive days are
 * "...-09-14", "...-09-15". Without it, drop times crawled a minute at a time across
 * consecutive days (measured: 07:31, 07:30, 07:29, then 07:36, 07:35, 07:34...), which
 * a user would learn in a week and which would quietly break MVP-SPEC section 4's
 * promise of a random moment. Mixing the output spreads neighbouring days apart.
 */
function hash32(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b) >>> 0;
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35) >>> 0;
  h ^= h >>> 16;
  return h >>> 0;
}

/** mulberry32: deterministic PRNG seeded from a 32-bit int. Returns floats in [0, 1). */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Whole days from 1970-01-01 for a "YYYY-MM-DD" key. Calendar maths, no time zone. */
function dayNumber(dayKey: string): number {
  const [y, m, d] = dayKey.split('-').map(Number);
  return Math.floor(Date.UTC(y, m - 1, d) / 86400000);
}

/** A deterministic shuffle of the bank's indices for one cycle. */
function permutationForCycle(cycle: number, size: number): number[] {
  const order = Array.from({ length: size }, (_, i) => i);
  const rand = mulberry32(hash32(`widget-rather/cycle/${cycle}`));
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  // Cycles are shuffled independently, so without this the last question of one cycle
  // and the first of the next can be the same one - the same question two mornings
  // running, which is exactly what cycling was meant to prevent. Nudge deterministically
  // so every device still computes the same order.
  if (size > 1) {
    const previous = Array.from({ length: size }, (_, i) => i);
    const prevRand = mulberry32(hash32(`widget-rather/cycle/${cycle - 1}`));
    for (let i = previous.length - 1; i > 0; i--) {
      const j = Math.floor(prevRand() * (i + 1));
      [previous[i], previous[j]] = [previous[j], previous[i]];
    }
    if (order[0] === previous[size - 1]) [order[0], order[1]] = [order[1], order[0]];
  }
  return order;
}

/**
 * Today's question.
 *
 * Uses a seeded shuffle per cycle rather than a plain hash-mod, so the whole bank is
 * used once before any question repeats. Cycle N is a fresh deterministic shuffle, so
 * the order differs between cycles but every device computes the same order.
 */
export function questionForDay(dayKey: string, bank: Question[] = QUESTIONS): Question {
  if (bank.length === 0) throw new Error('questionForDay: empty question bank');
  const n = dayNumber(dayKey);
  const cycle = Math.floor(n / bank.length);
  const position = ((n % bank.length) + bank.length) % bank.length;
  return bank[permutationForCycle(cycle, bank.length)[position]];
}

/** Minutes from local midnight at which today's question drops. */
export function dropMinuteForDay(dayKey: string, window: MorningWindow = MORNING_WINDOW): number {
  const span = window.endMinute - window.startMinute;
  if (span <= 0) throw new Error('dropMinuteForDay: window end must be after start');
  return window.startMinute + (hash32(`widget-rather/drop/${dayKey}`) % span);
}

/**
 * The drop moment as a real Date in the device's local time zone.
 * Built with the local-time Date constructor, so the same wall-clock minute in every
 * zone - which is what "once per time zone per day" means.
 */
export function dropTimeForDay(now: Date, window: MorningWindow = MORNING_WINDOW): Date {
  const key = localDayKey(now);
  const minute = dropMinuteForDay(key, window);
  const at = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  at.setMinutes(minute);
  return at;
}

/** Has today's question dropped yet? Before the drop the widget shows yesterday's results. */
export function hasDropped(now: Date, window: MorningWindow = MORNING_WINDOW): boolean {
  return now.getTime() >= dropTimeForDay(now, window).getTime();
}
