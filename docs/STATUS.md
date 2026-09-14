# Status: Widget Rather

_Rewrite this page (don't append) whenever things change. Last updated: 2026-09-14 by Greg's sessions (two that day)._

## Current phase
**Development is on hold (D-014, now DECIDED).** We're following **`docs/ROADMAP.md`** step by step, with no timeline, and are at **Stage 1: Define the product**.
- ✅ 1.1 MVP spec: **`docs/MVP-SPEC.md`** (Greg signed 2026-09-14, conditional — see below)
- ✅ 1.3 Name check: "Widget Rather" looks available (`research/name-check.md`)
- 🟡 1.4 Brand/avatars: **Pastel Critters** DECIDED (D-016); roster in `design/critters.md`; still needs the 22px test
- ☐ 1.2 Question bank v1 (Noah)

## New: if you're lost, start here
**`docs/PLAIN-ENGLISH.html`** (Greg, 2026-09-14, second session) — a pastel one-pager written because neither Noah nor Greg has shipped an app before and the jargon is in the way. What "back end", "API", "RLS", "EAS Build" and eleven other terms actually mean; a diagram of the seven steps a question takes from the server to your widget and back; and an honest read on how far along we are. **Pull the repo and open the file in a browser.** It explains, it doesn't decide — if it ever disagrees with `DECISIONS.md`, the decision log wins.

## What changed on 2026-09-14 (Greg)
**Greg signed everything that was waiting.** D-017 is DECIDED, so **Noah + Greg now decide on their own**, and the cascade it triggered landed: **D-004–D-007, D-009–D-011, D-013 are DECIDED, including D-005 (the stack)**. D-012 is `SUPERSEDED by D-017`.

**The big finding — the G2 bet is answered, and it went against us (D-020).** `expo-widgets` gives a widget button **no way to reach the server**: widget code "cannot perform asynchronous work", and a button's `onPress` only sets the widget's own props ([Expo SDK 57 docs](https://docs.expo.dev/versions/v57.0.0/sdk/widgets/)). **A tap on the widget is a local write** that syncs when the app next runs.
- The stack survives; the **core loop's wording doesn't**. Tapping the widget can't show live numbers — only the last pushed ones.
- The fix is cheap if adopted now: local pending vote → flush on app open → server takes a client timestamp and rejects duplicates.
- Full read, with the native-Swift escape hatch and its caveats: **`research/backend-read-mvp-spec.md`**.

## Waiting on
| Who | What |
|---|---|
| **Noah** | Sign **D-018** (§9 Option A: communities show totals only) · **D-019** (cap friend groups at ~50) · **D-020** (widget votes sync late). D-018 + D-019 are **conditions on Greg's D-008 signature** — if they don't land, D-008 reverts to `PROPOSED` |
| **Noah** | Sign or reject **D-021** — a different kind of call from the three above. Those unblock the *spec*; D-021 would unblock *starting to build*: build in two passes (pass 1 local-only, pass 2 adds the server), and give D-014's hold a **narrow exception** — plumbing may start, screens still wait for the design freeze. Plain-English version: `docs/PLAIN-ENGLISH.html` §05 |
| Noah + Greg | ROADMAP 0.5 sync: **drop window** · who answers reports · the spec's [proposed defaults] · reword §3's core loop per D-020 |
| Noah | 1.2 question bank · test the critter roster at 22px (Fen vs Mochi, Maple vs Beanie) · register the domain once agreed |
| Greg | Revised **G2 spike** (ROADMAP 4.3): does a widget change need a native rebuild, and **how late do votes actually arrive**? Blocked by D-014 |

## The MVP (spec, signed conditionally)
A random morning drop (per time zone) → answer on the widget (all 3 sizes) → friend groups + public communities → results + insights (Rare pick, Your twin, Split meter) → emoji reactions on friends' picks. Pastel Critter avatars, no photos. Duo mode comes right after launch (D-015, DECIDED).

**Greg's open flags on scope:** three widget sizes are near-free on the back end. The costly part is **uncapped group size × "your twin"** (pairwise per user), hence D-019. And the **simultaneous per-timezone drop is a thundering herd** — Supabase Free caps at 200 peak Realtime connections, Pro at 500, so push to the device rather than letting every device pull.

## Roles (D-017, DECIDED)
- **Greg:** back end + builds (Claude Max).
- **Noah:** **the main front end + design + everything else** (spec, content, accounts, policies, App Store).
- **Tiago:** advisor. Weighs in only when Noah and Greg ask.
- **Decisions need Noah + Greg.**

## Where things are
**Plain English (start here if lost): `docs/PLAIN-ENGLISH.html`** · **Roadmap: `docs/ROADMAP.md`** · **Spec: `docs/MVP-SPEC.md`** · **Back-end read: `research/backend-read-mvp-spec.md`** · Critters: `design/critters.md` · Tasks/owners: `docs/MVP-GAMEPLAN.md` · Mockups: `design/mockups/` · Clickable mockup: `prototype/index.html` · Decisions: `docs/DECISIONS.md` · How we work: `docs/COLLABORATION.md` · Research: `research/` · Session summaries: `docs/sessions/`
