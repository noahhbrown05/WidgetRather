---
name: log-session
description: Write this session's short summary in docs/sessions/, update docs/STATUS.md and docs/DECISIONS.md, then commit and push so Noah, Tiago, and Greg stay in sync. Use at the end of every working session, after any decision is made or proposed, or when a teammate says "log this" / "save this" / "update the logs".
---

# Log the session

Teammates work on separate machines and can't see each other's Claude chats. The repo is the shared memory, in three layers:

| File | What | How to edit |
|---|---|---|
| `docs/STATUS.md` | One page: where we are right now | **Rewrite** the parts that changed. Keep it to one screen. |
| `docs/DECISIONS.md` | Every decision + sign-offs | Add rows / update statuses |
| `docs/sessions/…md` | Short summary of this session | New file per session (update it if continuing the same session) |

## 1. Session summary: summaries, not transcripts

File: `docs/sessions/YYYY-MM-DD-<teammate>-<short-topic>.md`. **Aim for under ~60 lines.** Only quote the teammate verbatim for a rule or a change of direction, in one or two sentences.

```markdown
# <Date> — <Teammate> — <Topic>
**Teammate:** <name> · **Model:** <model>

## Asked for
- <1 line per request, paraphrased>

## Did
- <what was researched / created / changed, with file links>

## Learned (with sources)
- <finding> — <URL or VIDEO_ID @ mm:ss>

## Decisions
- D-### <title> → <status>

## Open questions / next steps
- <who needs to do or answer what>
```

## 2. STATUS.md

Update the "Current phase", "Decided", "Waiting on", and "Next up" sections so a teammate who reads nothing else is caught up.

## 3. DECISIONS.md

Use the next free `D-###` ID. Status is `PROPOSED` unless all three teammates agreed. Tick the sign-off only for the teammate you're talking to, and only if they said so.

## 4. Sync

Logs are docs-only, so during the research phase they can go straight to `main`:

```bash
git pull --rebase
git add docs/ research/ CLAUDE.md README.md .claude/
git commit -m "docs: session log <date> <teammate> — <topic>"
git push
```

If a pull has conflicts in `STATUS.md` or `DECISIONS.md`, merge both sides by hand. Never discard a teammate's entries, and never force-push.
