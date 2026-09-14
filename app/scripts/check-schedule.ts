/**
 * Checks the on-device drop claim without a simulator, a Mac, or a server.
 *
 * D-021 listed this as [UNVERIFIED]: "If today's question *and* its drop time can both
 * be computed on-device [...] the morning drop may not need the server at all."
 * schedule.ts is pure, so the claim is testable on any machine. Run:
 *
 *   npx tsx scripts/check-schedule.ts
 *
 * This checks the maths only. It does NOT prove iOS fires a timeline entry at the
 * scheduled minute - that needs a simulator build (ROADMAP 4.3).
 */

import { QUESTIONS } from '../src/questions';
import { dropMinuteForDay, dropTimeForDay, localDayKey, questionForDay, MORNING_WINDOW } from '../src/schedule';

let failures = 0;
function check(name: string, ok: boolean, detail = '') {
  if (!ok) failures++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  ' + detail : ''}`);
}

const days: string[] = [];
for (let i = 0; i < 365; i++) {
  const d = new Date(2026, 8, 14 + i);
  days.push(localDayKey(d));
}

// 1. Determinism: the whole point. Two devices computing independently must agree.
const firstPass = days.map((k) => `${questionForDay(k).id}@${dropMinuteForDay(k)}`);
const secondPass = days.map((k) => `${questionForDay(k).id}@${dropMinuteForDay(k)}`);
check('same day always yields the same question and drop minute', firstPass.every((v, i) => v === secondPass[i]));

// 2. Every drop lands inside the agreed morning window.
const outside = days.filter((k) => {
  const m = dropMinuteForDay(k);
  return m < MORNING_WINDOW.startMinute || m >= MORNING_WINDOW.endMinute;
});
check('every drop minute is inside the morning window', outside.length === 0, `${outside.length} outside`);

// 3. The drop time is a real local-time Date on the right calendar day.
const wrongDay = days.slice(0, 30).filter((_, i) => {
  const d = new Date(2026, 8, 14 + i);
  return localDayKey(dropTimeForDay(d)) !== localDayKey(d);
});
check('drop time falls on the same local calendar day', wrongDay.length === 0);

// 4. No repeats within a cycle: the bank is exhausted before anything comes back.
// Measured on a cycle-ALIGNED window, which is what the guarantee is actually about.
const alignedStart = new Date(2026, 8, 14);
while (Math.floor(Math.floor(Date.UTC(alignedStart.getFullYear(), alignedStart.getMonth(), alignedStart.getDate()) / 86400000) % QUESTIONS.length) !== 0) {
  alignedStart.setDate(alignedStart.getDate() + 1);
}
const alignedCycle: string[] = [];
for (let i = 0; i < QUESTIONS.length; i++) {
  const d = new Date(alignedStart);
  d.setDate(d.getDate() + i);
  alignedCycle.push(questionForDay(localDayKey(d)).id);
}
check('one full cycle uses every question exactly once', new Set(alignedCycle).size === QUESTIONS.length,
  `${new Set(alignedCycle).size}/${QUESTIONS.length} distinct`);

// 4b. The property users actually feel: never the same question two mornings running.
// This is the one that caught the cycle-boundary bug.
const consecutiveRepeats = days.filter((k, i) => i > 0 && questionForDay(k).id === questionForDay(days[i - 1]).id);
check('never the same question on consecutive days', consecutiveRepeats.length === 0,
  `${consecutiveRepeats.length} repeats across ${days.length} days`);

// 5. Drop times are actually spread across the window, not clustered on one minute.
const minutes = new Set(days.map((k) => dropMinuteForDay(k)));
const span = MORNING_WINDOW.endMinute - MORNING_WINDOW.startMinute;
check('drop minutes are spread across the window', minutes.size > span * 0.5,
  `${minutes.size} distinct minutes out of ${span} possible`);

// 6. Consecutive days get different drop minutes (it should feel random, not fixed).
let sameAsYesterday = 0;
for (let i = 1; i < days.length; i++) {
  if (dropMinuteForDay(days[i]) === dropMinuteForDay(days[i - 1])) sameAsYesterday++;
}
check('consecutive days rarely share a drop minute', sameAsYesterday < days.length * 0.05,
  `${sameAsYesterday} of ${days.length - 1} repeats`);

// 7. Drop times are uniform across the window, not bunched at one end.
const buckets = new Array(6).fill(0);
for (let i = 0; i < 3650; i++) {
  const m = dropMinuteForDay(localDayKey(new Date(2026, 8, 14 + i))) - MORNING_WINDOW.startMinute;
  buckets[Math.min(5, Math.floor(m / (span / 6)))]++;
}
const expected = 3650 / 6;
const worstSkew = Math.max(...buckets.map((b) => Math.abs(b - expected) / expected));
check('drop times are uniform across the window', worstSkew < 0.15,
  `buckets ${buckets.join('/')}, worst skew ${(worstSkew * 100).toFixed(1)}%`);

// 8. Neighbouring days must be uncorrelated. THIS IS THE CHECK THAT EARNS ITS KEEP:
// plain FNV-1a without a finalizer crawled one minute per day (07:31, 07:30, 07:29...),
// which a user would learn inside a week. If someone simplifies hash32, this fails.
let nearYesterday = 0;
for (let i = 1; i < 3650; i++) {
  const today = dropMinuteForDay(localDayKey(new Date(2026, 8, 14 + i)));
  const yesterday = dropMinuteForDay(localDayKey(new Date(2026, 8, 13 + i)));
  if (Math.abs(today - yesterday) <= 1) nearYesterday++;
}
const randomBaseline = (3650 * 3) / span;
check('drop time is uncorrelated with yesterday', nearYesterday < randomBaseline * 2,
  `${nearYesterday} within a minute of yesterday, random baseline ~${Math.round(randomBaseline)}`);

console.log('\nSample of the first 7 days:');
for (const k of days.slice(0, 7)) {
  const q = questionForDay(k);
  const m = dropMinuteForDay(k);
  const hh = String(Math.floor(m / 60)).padStart(2, '0');
  const mm = String(m % 60).padStart(2, '0');
  console.log(`  ${k}  ${hh}:${mm}  ${q.id}  ${q.a} / ${q.b}`);
}

console.log(failures === 0 ? '\nAll checks passed.' : `\n${failures} check(s) FAILED.`);
process.exit(failures === 0 ? 0 : 1);
