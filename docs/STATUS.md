# Status: Widget Rather

_Rewrite this page (don't append) whenever things change. Last updated: 2026-09-10 by Noah's session._

## Current phase
**Research & positioning. No app code yet** (D-001). The gate lifts when **D-005 (stack)** and **D-008 (MVP scope)** are signed off by all three of us. The plan for after that is **`docs/MVP-GAMEPLAN.md`**.

## The goal
A learning project: prove the three of us can build and grow an app. Target: the smallest working MVP.

## Roles (proposed, D-012)
- **Greg:** backend + builds (Claude Max). Supabase, security, data layer, widget ↔ backend, EAS builds, tech spike.
- **Noah:** front end (onboarding, sign-in, age gate, groups, settings/safety) + misc (accounts, policies, waitlist, beta, App Store listing).
- **Tiago:** front end (design system, question → results → reactions, widget look) + misc (designs, brand, question bank, screenshots).

## What's been decided
- Project rules: research-first, cite everything, repo is the shared memory (D-001–D-003)
- Repo is public: no secrets, no raw transcripts (D-010)

## Recommended, waiting on sign-off
- **Stack:** Expo + expo-widgets + EAS cloud builds + Supabase (D-005). Native Swift is ruled out (needs a Mac).
- **MVP:** one friend group, one question/day, answer on the home-screen widget, see group %, emoji reactions (D-008)
- iOS-first (D-006) · 13+ for the MVP (D-007) · non-anonymous (D-004) · GitHub flow (D-011) · logging format (D-009) · roles + game plan (D-012)

## Waiting on
| Who | What |
|---|---|
| Noah | Invite Tiago & Greg as repo collaborators |
| Tiago, Greg | Clone the repo, read this page → `DECISIONS.md` → `MVP-GAMEPLAN.md`, then sign off or push back |
| Team | **Who holds the Apple Developer account** ($99/yr, must be 18+). This is the #1 blocker for testing on iPhones |
| Team | Question drop timing (daily sync vs random): parked until after the MVP |

## Next up (once the gate lifts), from MVP-GAMEPLAN Phase 1
1. Noah: Apple Developer enrollment + team accounts (Expo, Supabase, PostHog, Sentry)
2. Greg: Expo scaffold → dev build on all 3 iPhones → **tech spike** (widget button saves an answer to Supabase) → schema + RLS
3. Tiago: design system + screen/widget designs + question bank (60+)
4. Noah & Tiago: set up Expo tooling on your PCs; start screens with dummy data once the scaffold exists

## Where things are
Plan: `docs/MVP-GAMEPLAN.md` · Decisions: `docs/DECISIONS.md` · How we work: `docs/COLLABORATION.md` · Research: `research/` · Session summaries: `docs/sessions/`
