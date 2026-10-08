# 2026-10-07 — Noah — Status check, tonight's plan, all 12 critters
**Teammate:** Noah · **Model:** Claude Opus 5.5 · **Status:** wrapped

> **Where we are now:** all 12 critters are drawn on `noah/critters-svg`. Front end = three stacked branches (theme, Today mockup, critters). **No PR has been opened yet**, so Greg still has nothing to review. Back end is at pass 1 (2026-09-14), never built on iOS.

## Asked for
- A full status update, a plan for Noah + Greg tonight, then finishing the critter avatars.

## Found (checked against GitHub)
- GitHub API `pulls?state=all` is empty: **no PR was ever opened**; STATUS's "review queue" wasn't real. Still 0 at session end.
- Last Greg commit on GitHub: 2026-09-14 (`87a74fa`, pass 1). He may have unpushed local work.

## Plan set (in STATUS "Tonight's plan")
- **Noah:** open the 3 PRs in order; finish the critters.
- **Greg:** merge PRs -> EAS iOS simulator build from `main` (one native build picks up `react-native-svg` + `expo-font`; no Apple account needed with `"ios": { "simulator": true }`, [Expo docs](https://docs.expo.dev/build-reference/simulators/)) -> ROADMAP 4.4 data-layer contract while it builds.
- **Both:** drop window, who answers reports, D-022 + domain, remaining `[proposed defaults]`.

## Decided by Noah (critters, D-024 still needs Greg)
- Test set style **locked**.
- **Swaps:** Axie -> **Kip** (koala); Maple -> **Oreo** (panda); Mochi / Beanie / Rascal -> **Truffle** (pig), **Chomp** (T-rex, Toy Story's Rex as inspiration, not a copy), **Tux** (penguin), picked from a brainstorm on distinct outlines.
- **Chaotic face:** big left eye, small squint wink, sweat drop, tongue out; spiral eye and brow removed.
- Fixes from review: Fen's mouth onto the muzzle; Truffle's ears attached; Chomp redrawn twice (rectangle head; mouth now sits in a jaw panel); Kip's ears smaller; Maple's first draft read as a bear (moot after the swap).

## Did
- `noah/critters-svg`: commits `8955fda`..`94c9fb8` (heads, faces, roster, lab, mock data). Typecheck clean; checked in the web preview.
- `main`: STATUS + this log (morning), then `design/critters.md` final roster, D-024 review note, STATUS (evening).

## Next steps
- **Noah:** open PRs 1-3 (links in STATUS). Then: D-022, question bank v1, wordmark + app icon.
- **Greg:** see STATUS "Tonight's plan". D-024's widget PNG export now covers 12 critters x 3 moods.
