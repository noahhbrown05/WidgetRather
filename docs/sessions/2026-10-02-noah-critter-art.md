# 2026-10-01/02 — Noah — Critter avatar art (D-024)
**Teammate:** Noah · **Model:** Claude Opus 5.5 · **Status:** wrapped

> **Where we are now:** 3 test critters (Capy, Axie, Fen) are drawn and pushed on `noah/critters-svg`, the third stacked PR for Greg. Next: Noah reviews them in the Critter lab, then the other 9 get drawn in the same style.

## Asked for
- Work on the critter profile-icon designs; "ask me a bunch of questions to refine how we should design and structure these."

## Decided by Noah (three rounds of questions)
- **Look:** soft & round, no outlines · tiny dot eyes + small mouth · head only, in a circle · **"cute but a bit chaotic"**.
- **System:** any critter x 8 colours · a **ring** that tints pink/blue after voting · moods **sleepy / happy / chaotic** · **all 12** in the MVP.
- **Making them:** Claude draws them as **SVG code** · **modular faces** · **3 test critters first** · punch up the personality lines.
- Recorded as **D-024 (PROPOSED, needs Greg)**.

## Did (branch `noah/critters-svg`, commit `d206734`)
- `app/src/ui/critters/`: `roster.ts` (12 names + new lines), `faces.tsx` (3 moods), `heads.tsx` (Capy, Axie, Fen), `color.ts` (tones from the body colour).
- `CritterAvatar` draws real art + `mood`; letter placeholder for the other 9.
- **Critter lab** in the dev bar: moods at full size, 48px + 22px checks, every colour.
- Fixed in review: lilac critters vanished on the shared lavender background, so each avatar's background is now a light tint of its own colour. Near-white `cloudWhite` became a soft cloud grey. Capy redrawn (long snout, high eyes) after reading as a bear.

## Learned (with sources)
- `react-native-svg` works in Expo SDK 57 on iOS, Android and web; it's native, so it needs Greg's next build. [Expo docs](https://docs.expo.dev/versions/v57.0.0/sdk/svg/)
- **Widgets can't render SVG**: only `@expo/ui/swift-ui` components, with images from the App Group `widgetsDirectory` or SF Symbols. So the widget needs PNGs exported from the art. [Expo SDK 57 widgets](https://docs.expo.dev/versions/v57.0.0/sdk/widgets/)

## Open questions / next steps
- **Noah:** review Capy / Axie / Fen in the Critter lab (preview, then dev bar, then Critters); then draw the other 9.
- **Greg:** PRs in order (theme, then today, then critters); `react-native-svg` + `expo-font` in the next native build; later, the critter PNG export for the widget.
- PR 3: https://github.com/noahhbrown05/WidgetRather/compare/noah/today-screen-mock...noah/critters-svg?expand=1
