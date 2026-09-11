# 2026-09-10 — Greg — Sign-offs + clickable prototype
**Teammate:** Greg · **Model:** Claude Opus 5

## Asked for
- Clone the repo onto Greg's desktop and read everything.
- Sign off on all open decisions.
- Something clickable to look at the same evening, built from the mockups: "pure visual and form function right now."

## Did
- Cloned to `C:\Users\greg\projects\widget-rather`; ran the one-time setup from `COLLABORATION.md` (git identity on the GitHub no-reply address, research venv from `requirements.txt`). Verified the `youtube-transcript` skill works.
- **Greg signed D-001–D-013** (commit `f933182`). D-005 and D-008 stay `PROPOSED` — the gate needs Tiago too.
- Built `prototype/index.html`: a clickable, form-only mockup reproduced from `design/mockups/`. Open it by double-clicking the file; no build step, no dependencies.
  - All four widget states on a real home screen: small (2×2 slot), medium before voting, medium after voting, large with "Who agrees with you?".
  - The in-app loop: Today, Today-voted (mockup 01's screen), Friends, Sign in, Age gate, You.
  - Every screen is annotated with its governing decision, its owner under D-012, and the cited constraint behind it.
  - **An "Everyone %" toggle**, so the kickoff can compare the mockup version against what D-008 actually scopes.

## Learned (with sources)
- The mockups are 512px wide; the detail only resolves when cropped and upscaled. Worth doing before building from them.
- Decoding the design language in `design/mockups/`: **pink is always "Read minds" and blue is always "See the future"** — the colour names the option, not your choice. Picked state is the same pink pill plus a magenta check disc. Pill labels are near-black plum, never white. The app background is a lavender-to-blue wash, not white. The wordmark is a heavy rounded geometric (Nunito 900 is a close free match).
- The widget's after-voting rows put label and % on one line with the bar beneath, while the large widget puts label, bar and % inline — two different row layouts, both needed.

## Decisions
- None new. Greg ticked D-001–D-013; nothing moved to `DECIDED`.

## Open questions / next steps
- **Tiago:** sign off on D-004–D-013. That is the only thing holding the gate shut.
- **Team, new:** mockup 02 shows three widget sizes. That is three layouts to build, test and keep in sync, and D-008 never says how many ship. Does the MVP ship medium only?
- **Team:** add the "Everyone" % to D-008? Toggle it in the prototype and decide.
- **Team:** the exact morning drop window.
- Prototype is form only. It proves nothing about **G2** — whether an `expo-widgets` button can write to Supabase without opening the app is still the open bet.
