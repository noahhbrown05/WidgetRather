# Status: Widget Rather

_Rewrite this page (don't append) whenever things change. Last updated: 2026-09-10 by Noah's session._

## Current phase
**Development is on hold (D-014).** We're following **`docs/ROADMAP.md`** step by step, with no timeline. We're at **Stage 1: Define the product**. **The MVP spec draft is written: `docs/MVP-SPEC.md`** (2026-09-11). It expands the MVP: all 3 widget sizes, public communities, and insights, so **D-008 needs all three to re-sign**. No app code until Stages 1–3 are done *and* D-005 + D-008 are signed.

## The goal
A learning project: prove the three of us can build and grow an app. Target: the smallest working MVP, then a small friends beta, then the App Store.

## The MVP (D-008)
Each morning before school, the question drops at a random time (same moment for everyone in a time zone). You answer on the home-screen widget, see your friend group's % split, and react with emoji. Plus sign in with Apple, a 13+ age gate, one friend group, report/block, and account deletion.

## Roles (D-012)
- **Greg:** backend + builds (Claude Max). Supabase, security, data layer, widget ↔ backend, drop scheduler, EAS builds, widget test.
- **Noah:** front end (onboarding, sign-in, age gate, groups, settings/safety) + misc (spec, accounts, policies, waitlist, beta, App Store listing).
- **Tiago:** front end (design system, question → results → reactions, widget look) + misc (designs, brand, question bank, screenshots).

## Decisions
Noah ☑ + Greg ☑ on D-001–D-013; Tiago pending. D-014 (development hold) is new: Noah ☑.

## Waiting on
| Who | What |
|---|---|
| Tiago | Sign off on D-004–D-014 |
| Team (kickoff) | Widget sizes (recommend medium only) · "Everyone" % (recommend yes) · morning drop window · hide friends' picks until you vote (recommend yes) · who answers reports (recommend Noah) |
| Tiago, Greg | Read `docs/MVP-SPEC.md`; re-sign D-008 (revised); sign D-015 (duo mode after launch) |
| Team | Spec §9: public communities with strangers of all ages, option A (totals only, recommended), B (age-banded), or C (fully social) |
| Noah | Review the spec's [proposed defaults] |
| Tiago | ROADMAP 1.2 + 1.4: question bank v1 + brand |
| Noah | ROADMAP 1.3: App Store name check |
| Greg | Prototype bug fixes (empty result bars, squashed note tags, Apple logo, missing doctype; see Noah's session 2026-09-10) whenever convenient |

## Where things are
**Roadmap: `docs/ROADMAP.md`** · Tasks/owners: `docs/MVP-GAMEPLAN.md` · Mockups: `design/mockups/` · Clickable mockup: `prototype/index.html` · Kickoff: `docs/KICKOFF-AGENDA.md` · Decisions: `docs/DECISIONS.md` · How we work: `docs/COLLABORATION.md` · Research: `research/` · Session summaries: `docs/sessions/`
