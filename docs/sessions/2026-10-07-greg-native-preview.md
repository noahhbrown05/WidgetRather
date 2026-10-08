# 2026-10-07 — Greg — Native screen preview
**Teammate:** Greg · **Assistant:** Codex

## Asked for
- Start the next coding task after reviewing and merging Noah's front-end work.

## Changed
- `App.tsx` now opens the shared sample Today preview. `App.web.tsx` uses the same shell while keeping widget/SQLite modules out of the web dependency graph.
- Extracted the original native harness into `src/dev/WidgetHarness.tsx`, reachable through **Widget tools**. Collection/publication runs when that panel mounts; it no longer runs just by opening the sample preview.
- Shared selectors cover Before drop, Open, Voted, Critters and Components; Replay resets the sample vote. Native builds keep the toolbar even when `__DEV__` is false.
- Added SDK-compatible `react-native-safe-area-context ~5.7.0` for device insets and made toolbar buttons at least 44 points tall. This native dependency must be included in the next EAS build.
- Updated the app README and status with the native review procedure and remaining limits.

## Verified
- TypeScript and all nine existing scheduler checks pass.
- `expo export --platform ios` succeeds, including Hermes bundle and font assets. This verifies bundling, not native compilation or rendering.
- Shared web shell checked at 390px: before-drop, both voted states, Replay, Critters and Components navigation. Sample votes still reset without local storage; web exposes no Widget tools button.

## Next
- Noah reviews the branch; merge through a PR.
- EAS simulator build, followed by notch/home-indicator, SVG, Reduce Motion and actual Widget tools checks on iOS.
- Widget PNG exports and the backend/data-layer contract remain separate work.

## Sources
- [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/)
- [SDK 57 safe-area support and recommended version](https://docs.expo.dev/versions/v57.0.0/sdk/safe-area-context/)
- Existing `App.tsx`, `App.web.tsx`, D-021/D-023/D-024, and `docs/COLLABORATION.md`.
