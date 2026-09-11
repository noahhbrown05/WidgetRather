# 2026-09-10 — Noah — Kickoff: rules, research setup, first research pass
**Teammate:** Noah · **Model:** Claude Opus 5

## Asked for
- Set up the project rules for a 3-person team (Noah, Tiago, Greg). No coding until the stack and positioning are decided.
- **Rule 1, in Noah's words:** "never, ever rely on your internal knowledge for facts and decisions … go externally, whether that's in YouTube transcripts or your own external research."
- Research the concept (a would-you-rather widget for teens; group results, reactions, threads; BeReal-style "talk about it tomorrow"), the comparables Houseparty and YOLO, and a tech stack.
- Follow Chris Raroque's (@raroque) app-building philosophy; build a skill to read YouTube transcripts.
- Log all decisions and conversations in the GitHub repo so everyone can see them.
- **Follow-up answers:** repo is `noahhbrown05/WidgetRather`; **no Mac on the team; all coding with AI; target middle school → high school**; this is a **learning project** ("we just wanted to see if we could do this"), MVP first; question drop timing still open. Session logs shouldn't be verbatim (too big). Asked for a collaboration guide.

## Did
- `CLAUDE.md` rules: (1) external research only, (2) research-phase gate, (3) 3-person team, (4) logging, (5) public repo, (6) Raroque.
- `youtube-transcript` skill + script; pulled 21 Raroque transcripts (kept local, gitignored; IDs in `research/video-sources.txt`).
- `log-session` skill, redesigned per Noah's feedback: `STATUS.md` (one page) + `DECISIONS.md` + short session summaries.
- Research: `research/market-and-positioning.md`, `tech-stack.md`, `safety-and-legal.md`, `raroque-playbook.md`.
- `docs/COLLABORATION.md`: team workflow guide (GitHub flow, setup, accounts, secrets).
- Connected the repo and pushed.

## Learned (details + sources in research files)
- Widget-first teen social works: Locket (51% DAU/MAU), Airbuds (1.5M DAU).
- Apple bans apps used mainly for anonymous/random chat or rating people, and requires filter/report/block.
- iOS widgets accept taps on the home screen; on the **lock screen, buttons are inactive until unlock**.
- 87% of US teens own iPhones.
- **No Mac → native Swift is out** (Xcode is macOS-only). Expo + `expo-widgets` + EAS cloud builds work from Windows.
- **No Mac → testing on real iPhones needs the $99/yr Apple Developer account**, and the holder must be 18+ (legal age).
- **Middle school includes 11–12 year olds → under-13 → COPPA** (parental consent). The MVP proposal is 13+.
- The repo is **public**, so branch protection is free; never commit secrets.

## Decisions
- D-001–D-003 DECIDED (Noah's rules) · D-004–D-008, D-011 PROPOSED · D-009 PROPOSED (in use) · D-010 in effect.

## Open questions / next steps
- **Noah:** invite Tiago & Greg as collaborators; sign off (or not) on D-004–D-009, D-011.
- **Tiago & Greg:** clone, read `STATUS.md` → `DECISIONS.md` → research, sign off or push back.
- **Team:** who holds the Apple Developer account? Accept 13+ for the MVP?
- After the gate lifts: a tech spike on widget → Supabase answer submission.
