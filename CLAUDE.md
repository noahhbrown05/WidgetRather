# Widget Rather — Project Rules for Claude

## RULE 1 — NEVER rely on internal knowledge for facts or decisions

Every fact, number, recommendation, and decision must be backed by **external, current research**: web search, official docs, YouTube transcripts (use the `youtube-transcript` skill), or files in this repo.

- Never state something as fact based only on training data. If you "know" something, go verify it first.
- Cite every claim: a URL, or a YouTube video ID + timestamp (e.g. `cXIWx1eYA9w @ 10:21`).
- If something can't be verified externally, label it clearly as **UNVERIFIED** and say what would verify it.
- This includes library versions, APIs, pricing, laws, platform limits, and "best practices". Things change; check.
- Don't claim you can't do something (e.g. "I can't read YouTube") without checking the tools and skills in this repo first.

## RULE 2 — Research phase: no production code yet

Noah's direction (2026-09-10): **no coding or production work until the tech stack and positioning are decided.** This is a **learning project**: the goal is to prove the three of us can build and grow an app, so the first target is the smallest working MVP, not a long-lived company.

- Allowed right now: research, writing docs, comparing options, mockups on paper, research tooling (like the transcript script).
- Not allowed yet: scaffolding the app, installing app frameworks, writing app code.
- The gate lifts only when `docs/DECISIONS.md` has the tech stack (D-005) and MVP scope/positioning (D-008) marked `DECIDED`, with all three teammates signed off.

## RULE 3 — Three-person team, three machines

The team is **Noah, Tiago, and Greg**. Each works on their own computer and syncs through the shared GitHub repo.

- At the start of a session, figure out who you're talking to (ask, or check `git config user.name`) and put their name in the session log.
- Always `git pull` before starting work and before committing, so you don't clobber a teammate's changes.
- Never force-push. Never rewrite shared history.
- A decision one teammate makes in a chat is **Proposed** until it's recorded in `docs/DECISIONS.md` and the others have had a chance to weigh in. Don't treat one person's opinion as team consensus.

## RULE 4 — Log every conversation and decision in the repo

Teammates can't see each other's Claude chats. The repo is the shared memory. It has three layers, from shortest to longest:

1. **`docs/STATUS.md`**: one page, "where we are right now." **Read it at the start of every session.** Rewrite it (don't append) whenever something changes.
2. **`docs/DECISIONS.md`**: every decision with ID, date, who, status (`PROPOSED` / `DECIDED` / `REJECTED` / `SUPERSEDED`), rationale, sources, and sign-offs.
3. **`docs/sessions/YYYY-MM-DD-<name>-<topic>.md`**: one short summary per session (use the `log-session` skill). **Summaries, not transcripts.** Aim for under ~60 lines. Quote a teammate verbatim only for a rule or a change of direction, in one or two sentences.

- **Research** goes in `research/` as topic files, with sources.
- At the end of a session, `git pull`, then commit and push.

## RULE 5 — The repo is PUBLIC

Anyone on the internet can read `github.com/noahhbrown05/WidgetRather`.

- **Never commit secrets:** API keys, passwords, `.env` files, service-account files, Apple/Expo credentials.
- Never commit other people's full copyrighted content. Raw YouTube transcripts stay local (`research/transcripts/` is gitignored); commit summaries with citations instead.
- Don't put private personal info (phone numbers, addresses, test users' real data) in docs.

## RULE 6 — Reference Chris Raroque's app-building philosophy

Noah wants us to follow the approach of Chris Raroque (https://www.youtube.com/@raroque). Our summary of his playbook is in `research/raroque-playbook.md`. When a question comes up about how to build, launch, measure, or secure the app, check his videos (via the `youtube-transcript` skill) and cite them.

---

## Project summary

**Widget Rather** is a mobile app, mainly a home-screen/lock-screen widget, that shows a "Would you rather?" question at random times during the day (or at the start of the day). The target audience is **middle school through high school**. After answering, users unlock their group chats and communities to see how their circles answered, with stats, reactions (emoji), and threads. The goal is to spark conversation with friends the next day and build community online, BeReal-style. Positioning inspiration: Houseparty and YOLO. All features are still subject to change.

**Team constraints (Noah, 2026-09-10):** nobody has a Mac; all coding will be done with AI tools; this is one of the team's first projects and is primarily a learning project.

**Roles (proposed, D-012):** Greg (Claude Max) owns the backend, data layer, widget ↔ backend, and all native/EAS builds. Noah and Tiago (Pro) split the front-end screens and miscellaneous tasks per `docs/MVP-GAMEPLAN.md`. When working with Noah or Tiago, keep sessions focused and token-light: one screen or task per session, small prompts, and no repo-wide exploration. Front-end code must call Greg's data-layer functions, never query the database directly.

## Repo map

| Path | What's there |
|---|---|
| `CLAUDE.md` | These rules |
| `docs/STATUS.md` | One-page current state. Read first |
| `docs/DECISIONS.md` | Decision log: the single source of truth for what the team has decided |
| `docs/COLLABORATION.md` | How the three of us work together (git, branches, PRs, accounts) |
| `docs/MVP-GAMEPLAN.md` | Roles, phases, and every MVP task with its owner |
| `docs/sessions/` | One short summary per Claude session, per teammate |
| `design/mockups/` | Concept mockups (direction, not final designs) |
| `prototype/` | Clickable form-only mockup of the MVP (`index.html`, open it in a browser). Not the app |
| `research/` | Research write-ups (market, tech stack, safety/legal, Raroque playbook) |
| `research/testing-without-apple-account.md` | How to test on Windows without the paid Apple account |
| `research/video-sources.txt` | IDs of YouTube videos we've researched |
| `research/transcripts/` | Raw YouTube transcripts (**local only, gitignored**) |
| `.claude/skills/youtube-transcript/` | Skill + script to list channel videos and pull transcripts |
| `.claude/skills/log-session/` | Skill for writing the session log |
| `requirements.txt` | Python deps for research tooling (not the app) |

## Research tooling setup (each teammate, once)

```bash
python -m venv .venv
# Windows:  .venv\Scripts\python.exe -m pip install -r requirements.txt
# Mac/Linux: .venv/bin/python -m pip install -r requirements.txt
```
