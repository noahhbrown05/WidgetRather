# Status: Widget Rather

_Rewrite this page (don't append) whenever things change. Last updated: 2026-09-10 by Noah's session._

## Current phase
**Research phase: one signature from lifting.** Noah and Greg have signed every decision (D-001–D-013). Once **Tiago signs D-005 (stack) and D-008 (MVP scope)**, app coding can start. Use `docs/KICKOFF-AGENDA.md` for the call.

## The goal
A learning project: prove the three of us can build and grow an app. Target: the smallest working MVP.

## The MVP (D-008)
Each morning before school, the question drops at a random time (same moment for everyone in a time zone). You answer on the home-screen widget, see your friend group's % split, and react with emoji. Plus sign in with Apple, a 13+ age gate, one friend group, report/block, and account deletion.

## Roles (D-012)
- **Greg:** backend + builds (Claude Max). Supabase, security, data layer, widget ↔ backend, drop scheduler, EAS builds, widget test.
- **Noah:** front end (onboarding, sign-in, age gate, groups, settings/safety) + misc (accounts, policies, waitlist, beta, App Store listing).
- **Tiago:** front end (design system, question → results → reactions, widget look) + misc (designs, brand, question bank, screenshots).

## Decisions (Noah ☑ + Greg ☑ on all; Tiago pending)
Not anonymous (D-004) · Expo + expo-widgets + EAS + Supabase (D-005) · iOS-first (D-006) · 13+ (D-007) · MVP scope + random morning drop (D-008) · logging format (D-009) · public repo, no secrets (D-010) · GitHub flow (D-011) · roles (D-012) · test in simulators first, buy the Apple account before the beta (D-013)

## Waiting on
| Who | What |
|---|---|
| Tiago | Kickoff call → sign off on D-004–D-013 (Greg signed 2026-09-10) |
| Team | Exact morning drop window (e.g. roughly 6–8am local), based on school start times |
| Noah | Create Expo + Supabase team accounts and invite the others |
| Noah | Waitlist page (another day) |

## Next up (once the gate lifts)
1. Greg: Expo scaffold → **iOS simulator build** (no Apple account) → **widget test in a simulator** (cloud Mac or Appetize) → schema + RLS
2. Tiago: design system + screen/widget designs + question bank (60+)
3. Noah & Tiago: set up Expo tooling on your PCs; build screens with dummy data; test in the browser / Android emulator

## Where things are
Plan: `docs/MVP-GAMEPLAN.md` · Kickoff: `docs/KICKOFF-AGENDA.md` · Decisions: `docs/DECISIONS.md` · How we work: `docs/COLLABORATION.md` · Research: `research/` · Session summaries: `docs/sessions/`
