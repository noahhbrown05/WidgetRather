---
name: youtube-transcript
description: Pull YouTube video transcripts and list a channel's videos so you can research from real sources. Use whenever a YouTube video or channel is mentioned, when researching Chris Raroque (@raroque) or any creator, or when you need a creator's actual words instead of relying on memory. You CAN read YouTube through this skill.
---

# YouTube transcripts

The script lives at `${CLAUDE_SKILL_DIR}/scripts/yt_transcript.py`. It uses `youtube-transcript-api` first and falls back to `yt-dlp` subtitles if that fails. No API key needed.

## Python to use

Use the project venv (see CLAUDE.md for setup):
- Windows: `.venv\Scripts\python.exe`
- Mac/Linux: `.venv/bin/python`

If the venv doesn't exist, create it and run `pip install -r requirements.txt` first.

## List a channel's videos

```bash
<python> ${CLAUDE_SKILL_DIR}/scripts/yt_transcript.py list https://www.youtube.com/@raroque --limit 50
```

This prints `id | title | views | secs`. Pick the videos that matter for the question.

## Fetch transcripts (one or many)

```bash
<python> ${CLAUDE_SKILL_DIR}/scripts/yt_transcript.py get <id-or-url> [<id-or-url> ...] --out research/transcripts/<channel-slug>
```

- Each video is saved as `research/transcripts/<channel>/<id>-<slug>.md`, with metadata and `[mm:ss]` timestamps every ~60s.
- `research/transcripts/` is **gitignored** (public repo + copyrighted content). Commit summaries, never raw transcripts.
- Add every video you research to `research/video-sources.txt` so teammates can re-download it.
- Before fetching, check whether the file already exists. Don't re-download.
- For big batches, run in the background.

## How to use the results

1. Read the transcript files. Don't summarize from the title alone.
2. Cite as `VIDEO_ID @ mm:ss` plus the video URL.
3. Captions are auto-generated, so names get mangled (e.g. "Superbase" = Supabase, "cloud code" = Claude Code). Correct these in your summary and note it.
4. Note the **publish date**. A 2023 opinion may be outdated; say so and prefer newer videos.
5. Add durable takeaways to the relevant `research/*.md` file.

## If it fails

- `ModuleNotFoundError`: you're not using the venv Python.
- IP blocked / `RequestBlocked`: YouTube blocks many cloud IPs. The script auto-falls back to yt-dlp. If both fail, tell the user; don't guess the content.
