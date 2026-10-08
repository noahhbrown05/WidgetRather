# Status: Widget Rather

_Last updated 2026-10-07 by Greg's review session. Summarizes the approved front-end integration in PR #4._

## Current phase
Pass 1 remains a build step, not a release (D-021). D-023 allows front-end design in code on feature branches, reviewed before merging. The Today screen uses mock data; the native entry point is still the widget/data harness.

## Review completed
- [#2: shared components](https://github.com/noahhbrown05/WidgetRather/pull/2): approved by Greg and merged into `main`; D-023 signed.
- [#3: Today mockup](https://github.com/noahhbrown05/WidgetRather/pull/3): approved by Greg and merged into `main`.
- [#4: all 12 critters](https://github.com/noahhbrown05/WidgetRather/pull/4): Greg approved Noah's work and D-024. This PR brings the critters and the already-reviewed interaction polish into `main`.
- [#1: interaction polish](https://github.com/noahhbrown05/WidgetRather/pull/1): Noah approved and merged it into the critter branch. Keeps the palette/art, adds press feedback, reveals, result-bar motion, reactions, reduced-motion support, and a compact voted card.

The final roster and art are in `design/critters.md` and `app/src/ui/critters/`. The user approved the current colors and critters; interaction polish is the focus.

## Verified and still unverified
- TypeScript passes for the exact foundation, Today and critter snapshots. The foundation's nine scheduler checks pass. Locked installs succeeded; the SVG version matches Expo SDK 57's documented recommendation.
- The final critter integration's app tree matches the browser-tested polish snapshot. Browser checks cover both votes, result percentages, reactions, group/community views and narrow layouts.
- **Still unverified:** iOS builds/rendering, OS reduced-motion behavior, widget timeline timing and whether widget changes require a native rebuild.
- **Still to implement:** PNG exports of the critters for widgets. Accepting D-024 approves this architecture; it does not mean the export pipeline exists.

## Next up
| Owner | Work |
|---|---|
| Greg | EAS iOS simulator build from integrated `main`; ensure the native preview can show the reviewed screens before claiming iOS UI/motion coverage (`App.tsx` is still the harness). Include `expo-font` and `react-native-svg` in the build. |
| Greg | ROADMAP 4.4: Supabase schema + data-layer function contract; screens call these functions rather than querying the database. |
| Greg | Export critter PNGs for the widget/App Group container and verify all three widget sizes. |
| Noah | Real question bank (current questions are placeholders), wordmark/app icon, D-022 bundle identifier and domain. |
| Noah + Greg | Morning drop window (07:00–08:30 is a placeholder), who answers reports, remaining proposed spec defaults. |

## Product and roles
MVP: a random morning question per time zone, local widget voting with later sync, friend groups capped at 50, public communities showing totals only, three insights, and fixed emoji reactions. Your twin stays scoped to friend groups. Duo mode follows the MVP.

Greg owns backend/native builds; Noah owns front end/design; Tiago advises when asked. Decisions need Noah + Greg. No release is authorized by these prototype reviews.

References: `docs/DECISIONS.md`, `docs/ROADMAP.md`, `docs/MVP-SPEC.md`, `app/README.md`, `docs/reviews/README.md`, `docs/sessions/2026-10-07-greg-noah-pr-reviews.md`.
