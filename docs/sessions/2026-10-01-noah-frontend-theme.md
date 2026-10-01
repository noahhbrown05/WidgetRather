# 2026-10-01 — Noah — Front-end coding starts: theme + shared components
**Teammate:** Noah · **Model:** Claude Opus 5.5 · **Status:** wrapped

> **Where we are now:** branch `noah/theme-shared-components` is pushed and waiting on **Greg's PR review**, which doubles as his sign-off on **D-023**. Nothing front-end is on `main` yet.

## Asked for
- "Let's start the process of coding the front end of the app."

## Found first
- Greg's **pass 1** landed 2026-09-14 (`app/`: widget, on-device scheduler, local store; `App.tsx` is a harness). No commits since.
- **D-014 (+ D-021's exception) still said screens wait for a design freeze**, and Stage 2 hadn't happened. Flagged it rather than coding past it.

## Decided by Noah
- **D-023 (PROPOSED, needs Greg): design in code, on a branch.** The design freeze happens in code, from the mockups + Greg's prototype. All front-end work goes on feature branches; **Greg approving the PR = his sign-off.** Chosen over "design first, then code".
- First piece: **theme + shared components** (ROADMAP 5.1).

## Did (branch `noah/theme-shared-components`, commit `ba1c24d`)
- `app/src/ui/`: design tokens (palette from `prototype/index.html`, pink = A / blue = B, 8 critter body colours, Nunito type scale) + `T`, `Card`, `AnswerPill`, `CheckDisc`, `ResultBar`, `CritterAvatar` (placeholder art, bandana pick-tint), `AvatarStack`, `Screen`.
- `app/src/dev/Gallery.tsx`: every component + mockup 01's Today screen with dummy data. `app/App.web.tsx`: web-only root, so Greg's native harness is untouched.
- Added web support + Nunito. **Removed the `expo-font` config plugin `expo install` auto-added**, so Greg's build config is unchanged; `expo-font` still rides along in his next native build.
- `.claude/launch.json`: one-click web preview in the Claude desktop app.
- Verified: typecheck clean · renders at phone size in the browser · tapping a pill flips to the voted state · no console errors.

## Learned (with sources)
- Web support for an existing Expo app: `npx expo install react-dom react-native-web @expo/metro-runtime`. [Expo docs](https://docs.expo.dev/workflow/web/)
- Nunito via `@expo-google-fonts/nunito` + `useFonts` works on web with **no native rebuild**; the config-plugin route needs a rebuild and doesn't work on web. [Expo docs](https://docs.expo.dev/develop/user-interface/fonts/)
- RN 0.76+ draws gradients with `experimental_backgroundImage`, but react-native-web doesn't translate it; use `backgroundImage` on web. [react-native-web#2787](https://github.com/necolas/react-native-web/issues/2787), [Medium](https://retyui.medium.com/%EF%B8%8F-warning-you-dont-need-any-third-party-libraries-to-use-linear-gradients-in-react-native-aec3e528bbb6)

## Open questions / next steps
- **Noah:** open the PR (link below) · next screen after Greg approves.
- **Greg:** review the PR = D-023 sign-off · note `expo-font` for the next native build · `expo` 57.0.22 → 57.0.26 update available (`npx expo install --check`).
- PR link: https://github.com/noahhbrown05/WidgetRather/pull/new/noah/theme-shared-components
