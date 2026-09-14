# Status: Widget Rather

_Rewrite this page (don't append) whenever things change. Last updated: 2026-09-14 by Noah's session (after Greg's two)._

## Current phase
**Stage 1 of `docs/ROADMAP.md`, no timeline.** Development is still held by D-014, **but D-021 now grants a narrow exception: back-end and native plumbing may start; all front-end screens still wait for the design freeze (Stage 2).**
- ✅ 1.1 MVP spec: **`docs/MVP-SPEC.md`** — **D-008 is now fully DECIDED**
- ✅ 1.3 Name check (`research/name-check.md`)
- 🟡 1.4 Brand/avatars: Pastel Critters (D-016); roster in `design/critters.md`; still needs the 22px test
- ☐ 1.2 Question bank v1 (Noah)

## What changed on 2026-09-14
**Greg** signed D-014–D-017 and re-signed D-008 conditionally, then published a back-end read of the spec and the plain-English explainer.
**Noah** then approved all four of Greg's proposals, so **D-018, D-019, D-020, D-021 are DECIDED** and Greg's conditions on D-008 are met.

| Decision | What it means now |
|---|---|
| **D-018** | Public communities show **totals only**: split, insights, member count. No member list, no individual picks, no reactions between strangers. Names + reactions stay in friend groups |
| **D-019** | Friend groups are **capped at 50** |
| **D-020** | A widget tap is a **local save** that syncs when the app next opens; widget numbers are as of the last push. Independently verified against the [Expo SDK 57 docs](https://docs.expo.dev/versions/v57.0.0/sdk/widgets/) |
| **D-021** | Build in **two passes** — pass 1 local-only (never released), pass 2 adds the server — under D-014's narrow exception |

Everything above is reflected in the spec (§3 core loop, §5 twin, §6 table, §9 resolved to Option A).

## If you're lost
**`docs/PLAIN-ENGLISH.html`** (Greg) — what the jargon means, how one morning's question travels, and an honest read on where we are. Open it in a browser. If it ever disagrees with `DECISIONS.md`, the decision log wins.

## Waiting on
| Who | What |
|---|---|
| **Greg** | **Pass 1 can start** (D-021): widget + question file + local save + answer history, simulator only. Answers ROADMAP 4.3's two questions: does a widget change need a native rebuild, and how late do votes arrive? |
| **Noah** | 1.2 question bank v1 · test the critter roster at 22px (Fen vs Mochi, Maple vs Beanie) · Stage 2 designs |
| Noah + Greg | ROADMAP 0.5 leftovers: **the morning drop window** · who answers reports (recommend Noah) · the spec's remaining [proposed defaults] |
| Noah | Register the domain once agreed (needed for the privacy policy, ROADMAP 3.2) |

## The MVP (D-008, DECIDED)
A random morning drop (per time zone) → answer on the widget (all 3 sizes, local save) → friend groups (≤50, names + who picked what) and public communities (totals only) → insights (Rare pick, Your twin, Split meter) → emoji reactions on friends' picks in groups. Pastel Critter avatars, no photos. Duo mode right after launch (D-015).

**Known constraints to design around:** widget votes arrive late (D-020) · the simultaneous per-time-zone drop is a traffic spike, so push to devices rather than letting every device pull (Supabase Free caps at 200 peak Realtime connections) · "Your twin" stays scoped to friend groups.

## Roles (D-017, DECIDED)
- **Greg:** back end + builds (Claude Max). **Noah:** the main front end + design + everything else. **Tiago:** advisor when asked. **Decisions need Noah + Greg.**

## Where things are
**Plain English: `docs/PLAIN-ENGLISH.html`** · **Roadmap: `docs/ROADMAP.md`** · **Spec: `docs/MVP-SPEC.md`** · **Back-end read: `research/backend-read-mvp-spec.md`** · Critters: `design/critters.md` · Tasks/owners: `docs/MVP-GAMEPLAN.md` · Mockups: `design/mockups/` · Clickable mockup: `prototype/index.html` · Decisions: `docs/DECISIONS.md` · How we work: `docs/COLLABORATION.md` · Research: `research/` · Session summaries: `docs/sessions/`
