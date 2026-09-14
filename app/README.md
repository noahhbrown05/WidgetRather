# `app/` — Widget Rather, pass 1

**Status: pass 1 of D-021 — plumbing only. Not a release, not a design.**

Pass 1 is the local-only half of the real app: a question file shipped inside the app,
a widget that shows today's question, a tap that saves locally, and answer history.
No accounts, no server, dummy numbers where group results go. Pass 2 adds Supabase
behind it — **nothing here gets rewritten** (D-021).

Built under D-014's narrow exception (Noah, 2026-09-14): *back-end and native plumbing
may start now; all front-end screens still wait for the design freeze.* So `App.tsx` is
a **dev harness**, deliberately unstyled. Screens are Noah's (D-017).

## What's here

| File | What it does |
|---|---|
| `src/questions.ts` | The question file. **Placeholder content** — ROADMAP 1.2 (the real 60+ bank) is Noah's |
| `src/schedule.ts` | Deterministic question-of-the-day + drop time, computed on-device |
| `src/store.ts` | Local answer history. First write wins (D-020, MVP-SPEC §4) |
| `src/widget/TodayWidget.tsx` | The widget. Read the constraints comment before editing it |
| `src/sync.ts` | The widget ↔ app seam. Pass 2's server flush hangs off `onAppForeground` |
| `App.tsx` | Dev harness. Delete or replace when real screens arrive |
| `scripts/check-schedule.ts` | Proves the scheduler's claims without a Mac or simulator |

## Running it

Checks that work on Windows, with no Apple account and no simulator:

```bash
npm run typecheck
```

```bash
npm run check:schedule
```

The iOS build (needs no Apple Developer account — D-013, [Expo docs](https://docs.expo.dev/build-reference/simulators/)):

```bash
npx eas-cli build -p ios --profile simulator
```

The result is a simulator `.app`. None of us has a Mac, so run it on a cloud Mac or
Appetize — see `research/testing-without-apple-account.md`.

## How a tap gets home (D-020)

A widget button cannot reach the server. Per the [SDK 57 docs](https://docs.expo.dev/versions/v57.0.0/sdk/widgets/),
widget code "cannot perform asynchronous work, import other modules, or access your
app's runtime". What a button *can* do is return new props, which the runtime
"persists [...] and reloads the widget on device, with no running app process required."

So the flow is:

1. `publishToday()` pushes a timeline: yesterday's results now, today's question **at the drop minute**.
2. The user taps. The widget flips to "answered" instantly and the choice is persisted.
3. Next app launch, `collectWidgetVotes()` calls `getTimeline()`, finds the recorded
   choice, and writes it into local history with the delay measured.

We use `getTimeline()` rather than `addUserInteractionListener` because the listener
"only fires while the app process is alive" — and a 07:15 tap with the app closed is
the normal case here, not an edge case.

## Open, and deliberately not decided here

- **The morning window** (`MORNING_WINDOW` in `src/schedule.ts`) is a placeholder.
  MVP-SPEC §4 marks it `[OPEN]`; ROADMAP 0.5 owes an answer. Every function takes the
  window as an argument, so changing it is one line.
- **The bundle identifier** `com.widgetrather.app` is provisional (D-022, proposed).
  It is permanent once the app ships, and it depends on the domain Noah still has to
  register. Cheap to change now, expensive later.
