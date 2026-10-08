Voting and reactions previously changed abruptly, and the selected-answer card held unnecessary empty space. This pass keeps the critters and palette, adds brief button springs, answer/result reveals, animated result bars and reaction feedback, and lets the voted card size to its content. At a 390px viewport, the card is 140px tall instead of 176px, bringing results 36px higher.

Actions stay immediate and the first vote stays locked. Reduced-motion handling skips animation; chip/reaction targets are at least 44px. The web review toolbar has a Replay control. No new dependencies, backend behavior, or native-harness changes.

## Review scope

Stacked on `noah/critters-svg`, synced through 94c9fb8, with current main documentation through 6c4cb62. Noah's latest completed critters are included in the preview. The session log records Greg's D-023 approval; D-024's native dependency and widget-PNG export review remains open. This PR does not merge the earlier feature branches into main.

## Try it

1. Check out `greg/interaction-polish`, then run `npm ci` and `npm run web` from `app/`.
2. Select Open, choose either answer, and watch the compact confirmation, result reveal, and bars.
3. Tap a friend and choose a reaction. Use Replay to repeat; try Cousins and Lincoln High too.
4. Review the feel and spacing, including keyboard input and reduced motion on your device.

## Validation

- `npm run typecheck` and `git diff --check` pass.
- Browser: both votes, locked selection, keyboard voting, replay, reactions, and totals-only community view tested.
- Measured the result-bar animation settle at its correct 71% tally.
- Rechecked both choices at 390px and community text at 320px; no horizontal overflow.
- No application errors; restarting Metro produced an expected development-server disconnect warning.
- iOS and OS-level reduced-motion behavior still need device verification. All results and reactions remain mock data.

## Before and after

The after screenshot also includes Noah's latest critter art. The layout change removes the empty space below the vote confirmation.

<img src="https://raw.githubusercontent.com/noahhbrown05/WidgetRather/greg/interaction-polish/docs/reviews/interaction-polish-before.jpg" alt="Before: tall selected-answer card" width="280" /> <img src="https://raw.githubusercontent.com/noahhbrown05/WidgetRather/greg/interaction-polish/docs/reviews/interaction-polish-after.jpg" alt="After: compact selected-answer card and results higher on screen" width="280" />
