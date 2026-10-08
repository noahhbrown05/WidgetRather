# Status: Widget Rather

_Rewrite this page (don't append) whenever things change. Last updated: 2026-10-07 (evening) by Noah's session (all 12 critters drawn)._

## Current phase
**Stage 1 of `docs/ROADMAP.md`, no timeline** — and, for the first time, **code exists**.
D-014's hold still stands for **front-end screens**; D-021's narrow exception lets back-end and native plumbing start, and it has.
- ✅ 1.1 MVP spec: **`docs/MVP-SPEC.md`** — **D-008 fully DECIDED**
- ✅ 1.3 Name check (`research/name-check.md`)
- 🟡 1.4 Brand/avatars: **all 12 critters drawn in code (D-024)**, final roster in `design/critters.md`. Still to do: wordmark + app icon
- ☐ 1.2 Question bank v1 (Noah) — `app/src/questions.ts` ships **placeholders** until this lands

## Tonight's plan (2026-10-07, Noah + Greg)
**Found in the status check:** the GitHub API shows **no pull request has ever been opened** on this repo (still 0 at the end of the session), so the three front-end branches were pushed but **Greg had nothing to review**. Also, nothing from Greg has reached GitHub since 2026-09-14 (pass 1, `87a74fa`); he may have unpushed local work.

| Who | Tonight |
|---|---|
| **Noah** | 1. **Open the 3 PRs** in order (theme -> `main`, Today -> theme branch, critters -> Today branch). 2. ✅ **Critters done:** all 12 drawn on `noah/critters-svg`; 6 animals swapped (Kip, Oreo, Truffle, Chomp, Tux replace Axie, Maple, Mochi, Beanie, Rascal) |
| **Greg** | 1. **Review + merge the PRs in order** (= sign-off on D-023, D-024). 2. **Then the EAS iOS simulator build from `main`**, so `react-native-svg` + `expo-font` land in one native build (no Apple account needed with `"ios": { "simulator": true }`, [Expo docs](https://docs.expo.dev/build-reference/simulators/)). 3. **While it builds: ROADMAP 4.4**, the Supabase schema + data-layer function list (the contract the screens call; it moves the front end off dummy data) |
| **Both (~15 min)** | Morning drop window · who answers reports · D-022 bundle id (depends on the domain) · the spec's remaining `[proposed defaults]` |

## 2026-10-01: front-end coding starts (D-023, needs Greg)
Noah proposed **D-023: design in code, on a branch.** Screens no longer wait for a separate design freeze; the design is worked out in code from the mockups + Greg's prototype. **Everything front-end goes on feature branches and reaches `main` only through a pull request Greg reviews**; his first approval is his sign-off on D-023. Queued for Greg, stacked in order: **`noah/theme-shared-components`** (ROADMAP 5.1), then **`noah/today-screen-mock`** (ROADMAP 5.6, dummy data), then **`noah/critters-svg`** (D-024: SVG critters; test set Capy, Axie, Fen drawn).

## What changed on 2026-09-14
**Noah** approved all four of Greg's proposals (D-018–D-021), which made **D-008 fully DECIDED**.
**Greg** then started **pass 1** — see `app/README.md`.

| Now true | What it means |
|---|---|
| **`app/` exists** | Expo SDK 57 + `expo-widgets` + `@expo/ui` + `expo-sqlite`. Question file, on-device scheduler, local answer store, the widget, and the widget↔app seam |
| **`App.tsx` is a harness, not a screen** | Unstyled on purpose. All screens are Noah's and wait for the design freeze (D-017, D-014) |
| **Verified so far** | Typecheck clean · 9 scheduler checks over 3,650 days · Expo config + App Group entitlement resolve. **All on Windows — nothing has been built or run on iOS yet** |
| **D-021's on-device drop** | **Partly verified.** Question + drop time can be derived on-device from the local date, so a time zone agrees with no server. Whether iOS fires the entry *on time* still needs a simulator |
| **D-022 (new, PROPOSED)** | Bundle identifier `com.widgetrather.app`. **Needs Noah.** Permanent once shipped, and tied to a domain we haven't registered |

**CLAUDE.md RULE 2 was rewritten** — it said "no production code yet", but both gates it named (D-005, D-008) have passed. It now reads: plumbing allowed, screens not.

## If you're lost
**`docs/PLAIN-ENGLISH.html`** — what the jargon means and how one morning's question travels. Open it in a browser. If it ever disagrees with `DECISIONS.md`, the decision log wins.
For the code specifically: **`app/README.md`**.

## Waiting on
| Who | What |
|---|---|
| **Greg** | **Review Noah's three front-end PRs, in order** (Noah opens them 2026-10-07): (1) `noah/theme-shared-components` = sign-off on D-023 · (2) `noah/today-screen-mock` · (3) `noah/critters-svg` = sign-off on D-024 (adds `react-native-svg` to your next native build) · The **EAS simulator build**, then a cloud Mac or Appetize to answer ROADMAP 4.3: does a widget change need a native rebuild, and does the timeline fire on time? |
| **Noah** | **D-022 (bundle identifier)** · 1.2 question bank v1 · **open the 3 PRs** · Stage 2 designs |
| Noah + Greg | **The morning drop window** — still `[OPEN]`, and the code ships a placeholder (07:00–08:30) · who answers reports (recommend Noah) · the spec's remaining `[proposed defaults]` |
| Noah | Register the domain once agreed (needed for the privacy policy, ROADMAP 3.2 — and it decides D-022) |

## The MVP (D-008, DECIDED)
A random morning drop (per time zone) → answer on the widget (all 3 sizes, local save) → friend groups (≤50, names + who picked what) and public communities (totals only) → insights (Rare pick, Your twin, Split meter) → emoji reactions on friends' picks in groups. Pastel Critter avatars, no photos. Duo mode right after launch (D-015).

**Known constraints to design around:** widget votes arrive late (D-020) · the per-time-zone drop is a traffic spike, so push to devices rather than letting every device pull (Supabase Free caps at 200 peak Realtime connections) · "Your twin" stays scoped to friend groups.

**Pass 1 is a build step, never a release** (D-021). It has no reason to be opened twice — the reveal is the product.

## Roles (D-017, DECIDED)
- **Greg:** back end + builds (Claude Max). **Noah:** the main front end + design + everything else. **Tiago:** advisor when asked. **Decisions need Noah + Greg.**

## Where things are
**Plain English: `docs/PLAIN-ENGLISH.html`** · **The code: `app/README.md`** · **Roadmap: `docs/ROADMAP.md`** · **Spec: `docs/MVP-SPEC.md`** · **Back-end read: `research/backend-read-mvp-spec.md`** · Critters: `design/critters.md` · Tasks/owners: `docs/MVP-GAMEPLAN.md` · Mockups: `design/mockups/` · Clickable mockup: `prototype/index.html` · Decisions: `docs/DECISIONS.md` · How we work: `docs/COLLABORATION.md` · Research: `research/` · Session summaries: `docs/sessions/`
