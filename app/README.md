# `app/` — Widget Rather, pass 1

**Status: pass 1 of D-021, with approved screen previews under D-023. Not a release.**

Pass 1 is the local-only half of the real app: a question file shipped inside the app,
a widget that shows today's question, a tap that saves locally, and answer history.
No accounts, no server, dummy numbers where group results go. Pass 2 adds Supabase
behind it — **nothing here gets rewritten** (D-021).

D-023 now allows screen design in code through reviewed PRs. Both native and web
open the same **sample Today preview**. The native toolbar also opens **Widget tools**,
the original local diagnostics harness. Screen design remains Noah's (D-017).

## What's here

| File | What it does |
|---|---|
| `src/questions.ts` | The question file. **Placeholder content** — ROADMAP 1.2 (the real 60+ bank) is Noah's |
| `src/schedule.ts` | Deterministic question-of-the-day + drop time, computed on-device |
| `src/store.ts` | Local answer history. First write wins (D-020, MVP-SPEC §4) |
| `src/widget/TodayWidget.tsx` | The widget. Read the constraints comment before editing it |
| `src/sync.ts` | The widget ↔ app seam. Pass 2's server flush hangs off `onAppForeground` |
| `App.tsx` | Native preview entry point, with widget diagnostics available from the toolbar |
| `src/dev/PreviewApp.tsx` | Shared preview selector, fonts, replay and safe-area handling |
| `src/dev/WidgetHarness.tsx` | Original local schedule, answer history and widget diagnostics |
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

### Review the native preview

The toolbar is part of the pass-1 review build, including the standalone simulator
build (it is intentionally not hidden behind `__DEV__`). Start on **Open**, try
either answer and its reveal, then use **Replay** to clear the sample vote. Use
**Before drop**, **Voted**, **Critters** and **Components** to inspect other states.
These screens use mock data; their votes and reactions do not write local history.

**Widget tools** mounts the original harness: it collects pending widget votes and
publishes the timeline when opened. Use its A/B buttons, delay readout, history and
reset for plumbing checks. Switching away unmounts the panel; reopening refreshes
it. The preview does not run widget collection/publication on launch; open Widget
tools explicitly before testing the widget. This is a review shell, not the final
foreground-sync lifecycle or product navigation.

`react-native-safe-area-context` keeps the toolbar and footer inside device insets;
SDK 57 recommends `~5.7.0` ([versioned docs](https://docs.expo.dev/versions/v57.0.0/sdk/safe-area-context/)).
It joins `expo-font` and `react-native-svg` in the next native build.

Before claiming iOS coverage, check notch/home-indicator spacing, both votes and
replay, critter rendering, the OS Reduce Motion setting, and the Widget tools flow
on a simulator/device. `npx expo export --platform ios` verifies JavaScript bundling
and assets only; it does not compile Swift or run the app on iOS.

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

## Front end (D-023: design in code, on a branch)

Noah's front-end work lives in `src/ui/` and reaches `main` only through PRs Greg reviews.

| Path | What it is |
|---|---|
| `src/ui/theme.ts` | **Design tokens**: colours (sampled from the mockups via `prototype/index.html`), the pink = option A / blue = option B rule, critter body colours, Nunito type scale, spacing, radii, washes |
| `src/ui/gradient.ts` | Cross-platform gradients/shadows: `experimental_backgroundImage` on phones, `backgroundImage` on web ([react-native-web#2787](https://github.com/necolas/react-native-web/issues/2787)) |
| `src/ui/*.tsx` | Shared components: `T` (text), `Card`, `AnswerPill`, `CheckDisc`, `ResultBar`, `CritterAvatar`, `AvatarStack`, `Screen` |
| `src/dev/Gallery.tsx` | Dev-only gallery of every component + mockup 01's Today screen with dummy data. **Not a product screen** |
| `App.web.tsx` | Web-only entry into the shared preview; excludes SQLite/widget diagnostics imports |

See it in a browser on Windows (no Mac, no simulator):

```bash
npm run web
```

Fonts load at runtime with `useFonts` from `@expo-google-fonts/nunito` (works on web, no native rebuild, [Expo docs](https://docs.expo.dev/develop/user-interface/fonts/)).
**Note for Greg:** `expo-font` is now a dependency, so it rides along in the next native build. No config plugin was added.
