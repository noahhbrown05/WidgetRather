# 2026-09-14 — Greg — Sign-offs + the back-end read on the revised spec
**Teammate:** Greg · **Model:** Claude Opus 5 · **Status:** wrapped

> **Where Greg left off:** every sign-off Noah was waiting on is done. **D-017 is DECIDED, so Noah + Greg now decide alone**, and the cascade landed — **D-005 (the stack) is DECIDED**. D-008 is signed **conditional on D-018 + D-019**. One finding changes the product: **a widget tap cannot reach the server** (D-020). **Noah now has 3 sign-offs waiting: D-018, D-019, D-020.**

## Asked for
- Pull the repo onto Greg's machine and catch up.
- Walk the 5 open sign-offs and record his decisions.
- A back-end read on what the revised spec actually costs, before signing D-008.
- (Explicitly dropped: the prototype bug fixes — Greg: that was a visualisation exercise, not real work.)

## Did
- Cloned the repo; set the local git identity to the GitHub no-reply address (the repo is public, D-010).
- Wrote **`research/backend-read-mvp-spec.md`** — the cost of the revised spec on the back end, with sources.
- **Greg signed D-014, D-015, D-016, D-017**, and re-signed **D-008 conditionally**. Cascade applied: D-004–D-007, D-009–D-011, D-013 → `DECIDED`; **D-012 → `SUPERSEDED by D-017`**.
- Proposed **D-018, D-019, D-020** (need Noah).
- Updated `MVP-SPEC.md` (§3, §6, §7, §16 + status line), `ROADMAP.md` 4.3 and `MVP-GAMEPLAN.md` G2 — all of which described G2 as an open question it no longer is. Rewrote `STATUS.md`.

## Learned (with sources)
- **The G2 bet is answered by the docs, and the answer is no.** Widget code "cannot perform asynchronous work, import other modules, or access your app's runtime or in-memory state"; a button's `onPress` return value only "becomes the widget's new props... with no running app process required"; `addUserInteractionListener` "only fires while the app process is alive... **not as the widget's update mechanism**." — [Expo SDK 57 widgets docs](https://docs.expo.dev/versions/v57.0.0/sdk/widgets/)
- Escape hatch exists: native Swift widget targets via [`@bacons/apple-targets`](https://github.com/EvanBacon/expo-apple-targets) build on EAS from Windows ([Expo: iOS App Extensions](https://docs.expo.dev/build-reference/app-extensions/)); `AppIntent.perform()` supports async. **[UNVERIFIED]** but devs report background network failing over cellular when the app isn't running ([Apple Forums 737162](https://developer.apple.com/forums/thread/737162)).
- **The widget reload budget is not a constraint for us:** ~40–70 timeline reloads/day, 72 manual/push refreshes ([Swift Senpai](https://swiftsenpai.com/development/refreshing-widget/), [Apple Forums 711091](https://developer.apple.com/forums/thread/711091)). We need ~2/day.
- **The simultaneous per-timezone drop is a thundering herd.** Supabase Free = 200 peak Realtime connections, Pro = 500 ([Supabase pricing](https://supabase.com/pricing)). Push to the device; don't let every device pull.
- Scheduling is solved: `pg_cron` ships enabled on every plan incl. Free, and with `pg_net` can invoke an Edge Function ([Supabase: Scheduling Edge Functions](https://supabase.com/docs/guides/functions/schedule-functions)).
- Storage won't stop us: 500 MB / 50k MAU free; [ESTIMATE] 1,000 users × 365 questions ≈ 365K vote rows. But **free projects pause after 1 week of inactivity** ([Supabase pricing](https://supabase.com/pricing)).
- Apple Guideline 1.2 requires filtering, reporting with "timely responses", blocking, and published contact info for any UGC app ([App Store Guidelines](https://developer.apple.com/app-store/review/guidelines/)) — a staffing cost, not a build task.

## Decisions
- D-008 MVP scope (revised) → **DECIDED (Greg conditional on D-018 + D-019)**
- D-014 development hold · D-015 duo mode · D-016 Pastel Critters · **D-017 roles** → **DECIDED**
- Cascade: D-004, D-005 (**stack**), D-006, D-007, D-009, D-010, D-011, D-013 → **DECIDED** · D-012 → **SUPERSEDED**
- D-018 public communities = §9 **Option A**, totals only → **PROPOSED** (Greg)
- D-019 friend-group **size cap ~50** → **PROPOSED** (Greg)
- D-020 **widget votes are local-only and sync late** → **PROPOSED** (Greg)

## Open questions / next steps
- **Noah:** sign **D-018, D-019, D-020**. D-018 + D-019 are conditions on Greg's D-008 signature — if they don't land, D-008 goes back to `PROPOSED`.
- **Noah + Greg (ROADMAP 0.5):** drop window · who answers reports · the [proposed defaults] · **reword §3's core loop** so a widget tap doesn't promise live numbers.
- **Greg:** the revised G2 spike is now "does a widget change need a native rebuild?" + "how late do votes actually arrive?" — still blocked by D-014.
- **Worth a team beat:** "your twin" is the one expensive insight, and it's expensive only because group size is uncapped. That's the real cost of the D-008 revision, not the three widget sizes.
