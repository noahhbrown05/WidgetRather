# 2026-09-14 — Greg — Pass 1: the app scaffold, the widget, and the on-device scheduler
**Teammate:** Greg · **Model:** Claude Opus 5 · **Status:** wrapped

> **Where we are now:** pass 1 exists and is verified as far as Windows allows. The next step needs an EAS cloud build, and after that a simulator (cloud Mac or Appetize) to answer ROADMAP 4.3's two questions.

## Asked for
- Pull Noah's commits, then start pass 1.

## Did
- Pulled Noah's sign-offs (`b719dae..a785005`). **All four proposals approved**, D-008 fully DECIDED.
- Checked the gate before writing code: CLAUDE.md RULE 2 lifts when D-005 + D-008 are `DECIDED` with Noah + Greg ticks. Both are. D-021's narrow exception covers the rest.
- Built pass 1 in [`app/`](../../app/README.md) — Expo SDK 57, `expo-widgets`, `@expo/ui`, `expo-sqlite`:
  - [`src/questions.ts`](../../app/src/questions.ts) — the question file. **Placeholder content only**; the real bank (ROADMAP 1.2) is Noah's.
  - [`src/schedule.ts`](../../app/src/schedule.ts) — deterministic question-of-the-day + drop minute, derived from the device's local date.
  - [`src/store.ts`](../../app/src/store.ts) — local answer history, first write wins (D-020 + MVP-SPEC §4).
  - [`src/widget/TodayWidget.tsx`](../../app/src/widget/TodayWidget.tsx) — the widget, all three sizes.
  - [`src/sync.ts`](../../app/src/sync.ts) — the widget↔app seam. Pass 2's server flush hangs off `onAppForeground()`.
  - `App.tsx` — a dev harness, deliberately unstyled. **Not a screen.**
- Verified what Windows can verify: typecheck clean · 9 scheduler checks pass over 3,650 simulated days (`npm run check:schedule`) · Expo config plugins and the App Group entitlement resolve.
- Rewrote **CLAUDE.md RULE 2**. It still said "no production code yet", but both gates it named have passed — a future session would have refused legitimate work. It now says plumbing is allowed and screens are not.

## Learned (with sources)
- **A widget tap persists without the app running.** A button's `onPress` return value becomes the widget's new props, and the runtime "persists it and reloads the widget on device, with no running app process required" — so the widget's own timeline *is* the local vote store. The app reads votes back with `getTimeline()`, which returns entries "including past and future entries". ([Expo SDK 57 widgets](https://docs.expo.dev/versions/v57.0.0/sdk/widgets/))
- **`addUserInteractionListener` is the wrong tool for this**, confirming D-020: it "only fires while the app process is alive", and a 07:15 tap with the app closed is our normal case.
- **Widget code is more restricted than we recorded.** Beyond no async and no imports, it "cannot reference anything declared outside the component function, including plain top-level `const`s in the same file" — so the question text *must* arrive as props. Same source.
- **`updateTimeline` accepts future-dated entries**, which is what makes an on-device drop conceivable at all. Same source.
- **iOS simulator builds still need no Apple account** (`"simulator": true` in `eas.json`), as D-013 assumed. ([Expo docs](https://docs.expo.dev/build-reference/simulators/))

## Found a bug worth knowing about
The first scheduler drifted the drop time **one minute per day** — 07:31, 07:30, 07:29, then 07:36, 07:35, 07:34. Cause: a plain FNV-1a hash avalanches weakly when inputs differ only in the last character, and consecutive dates do exactly that. Students would have learned the pattern inside a week, quietly breaking MVP-SPEC §4's promise of a random moment. Fixed with a hash finalizer; drop times are now statistically indistinguishable from random (120 near-repeats vs a random baseline of 122), and two regression checks guard it. A second bug — the same question landing two mornings running at a cycle boundary — was caught the same way and fixed.

## Decisions
- **D-022 PROPOSED** — bundle identifier `com.widgetrather.app` + App Group `group.com.widgetrather.app`. **Needs Noah.** Permanent once the app ships and normally tied to a domain we haven't registered yet, so it is cheap to change now and impossible later.
- **D-021's `[UNVERIFIED]` bonus → PARTLY VERIFIED.** The maths half holds: question and drop time can both be derived on-device from the local date, so every phone in a time zone agrees with no server. The scheduling half is still unverified — whether iOS actually fires a timeline entry at the drop minute needs a simulator. If it holds, the server's only drop-time job is the notification banner.

## Open questions / next steps
- **Greg:** run the EAS simulator build, then get it onto a cloud Mac or Appetize to answer ROADMAP 4.3 — does a widget change need a native rebuild, and does the timeline fire on time?
- **Noah:** D-022 (bundle identifier) · question bank v1 (1.2) · 22px critter test · Stage 2 designs.
- **Noah + Greg:** the morning drop window is still `[OPEN]` and `app/src/schedule.ts` ships a **placeholder** (07:00–08:30). Also still open: who answers reports · the spec's remaining `[proposed defaults]`.
- **Parked, not proposed:** trimming MVP scope back toward D-008 v1. Pass 1 doesn't touch that surface either way.
