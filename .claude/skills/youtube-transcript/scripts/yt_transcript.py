#!/usr/bin/env python3
"""Fetch YouTube transcripts (and list channel videos) as Markdown research notes.

Usage:
  python yt_transcript.py list <channel_or_playlist_url> [--limit N]
  python yt_transcript.py get <video_url_or_id> [<video_url_or_id> ...] [--out DIR]

Primary: youtube-transcript-api (no browser, no API key).
Fallback: yt-dlp auto/manual subtitles (json3) if the API is blocked or fails.

Requires: pip install youtube-transcript-api yt-dlp
"""
import argparse
import json
import os
import re
import site
import subprocess
import sys
import tempfile

# Some Windows Python installs don't put the user site-packages on sys.path.
_user_site = site.getusersitepackages()
if os.path.isdir(_user_site) and _user_site not in sys.path:
    sys.path.append(_user_site)

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass


def video_id(s: str) -> str:
    m = re.search(r"(?:v=|youtu\.be/|shorts/|embed/|live/)([A-Za-z0-9_-]{11})", s)
    if m:
        return m.group(1)
    if re.fullmatch(r"[A-Za-z0-9_-]{11}", s):
        return s
    raise SystemExit(f"Could not parse a video id from: {s}")


def slugify(s: str) -> str:
    s = re.sub(r"[^\w\s-]", "", s).strip().lower()
    return re.sub(r"[\s_-]+", "-", s)[:60] or "video"


def ytdlp_cmd():
    try:
        import yt_dlp  # noqa: F401
        return [sys.executable, "-m", "yt_dlp"]
    except ImportError:
        return ["yt-dlp"]


# Child processes need the same sys.path fix to find yt_dlp.
os.environ["PYTHONPATH"] = os.pathsep.join(p for p in [os.environ.get("PYTHONPATH"), _user_site] if p)


def metadata(vid: str) -> dict:
    try:
        out = subprocess.run(
            ytdlp_cmd() + ["--skip-download", "--dump-json", "--no-warnings",
                           f"https://www.youtube.com/watch?v={vid}"],
            capture_output=True, text=True, encoding="utf-8", timeout=120)
        d = json.loads(out.stdout)
        return {k: d.get(k) for k in ("title", "channel", "upload_date", "duration", "view_count", "description")}
    except Exception:
        return {"title": vid}


def via_api(vid: str):
    from youtube_transcript_api import YouTubeTranscriptApi
    fetched = YouTubeTranscriptApi().fetch(vid, languages=["en", "en-US", "en-GB"])
    return [(s.start, s.text) for s in fetched]


def via_ytdlp(vid: str):
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(
            ytdlp_cmd() + ["--skip-download", "--write-subs", "--write-auto-subs",
                           "--sub-langs", "en.*,en", "--sub-format", "json3", "--no-warnings",
                           "-o", os.path.join(tmp, "%(id)s.%(ext)s"),
                           f"https://www.youtube.com/watch?v={vid}"],
            capture_output=True, text=True, timeout=180)
        files = [f for f in os.listdir(tmp) if f.endswith(".json3")]
        if not files:
            raise RuntimeError("yt-dlp found no English subtitles")
        with open(os.path.join(tmp, sorted(files)[0]), encoding="utf-8") as fh:
            data = json.load(fh)
    segs = []
    for ev in data.get("events", []):
        text = "".join(p.get("utf8", "") for p in ev.get("segs", []) or []).strip()
        if text:
            segs.append((ev.get("tStartMs", 0) / 1000, text))
    return segs


def to_paragraphs(segs, every=60):
    """Group caption segments into ~`every`-second paragraphs with [mm:ss] stamps."""
    paras, cur, start = [], [], None
    for t, text in segs:
        if start is None:
            start = t
        cur.append(text.replace("\n", " "))
        if t - start >= every:
            paras.append((start, " ".join(cur)))
            cur, start = [], None
    if cur:
        paras.append((start or 0, " ".join(cur)))
    return "\n\n".join(f"**[{int(s)//60:02d}:{int(s)%60:02d}]** {re.sub(r'\s+', ' ', p)}" for s, p in paras)


def cmd_get(args):
    os.makedirs(args.out, exist_ok=True)
    for raw in args.videos:
        vid = video_id(raw)
        meta = metadata(vid)
        try:
            segs, source = via_api(vid), "youtube-transcript-api"
        except Exception as e:
            print(f"[{vid}] API failed ({type(e).__name__}); trying yt-dlp...", file=sys.stderr)
            try:
                segs, source = via_ytdlp(vid), "yt-dlp subtitles"
            except Exception as e2:
                print(f"[{vid}] FAILED: {e2}", file=sys.stderr)
                continue
        title = meta.get("title") or vid
        d = meta.get("upload_date") or ""
        date = f"{d[:4]}-{d[4:6]}-{d[6:]}" if len(d) == 8 else "unknown"
        path = os.path.join(args.out, f"{vid}-{slugify(title)}.md")
        with open(path, "w", encoding="utf-8") as fh:
            fh.write(f"# {title}\n\n")
            fh.write(f"- **URL:** https://www.youtube.com/watch?v={vid}\n")
            fh.write(f"- **Channel:** {meta.get('channel') or 'unknown'}\n")
            fh.write(f"- **Published:** {date}\n")
            if meta.get("view_count"):
                fh.write(f"- **Views (at fetch):** {meta['view_count']:,}\n")
            fh.write(f"- **Transcript source:** {source} (auto-captions may contain errors)\n\n")
            fh.write("## Transcript\n\n")
            fh.write(to_paragraphs(segs) + "\n")
        print(path)


def cmd_list(args):
    fmt = "%(id)s | %(title)s | views=%(view_count)s | secs=%(duration)s"
    cmd = ytdlp_cmd() + ["--flat-playlist", "--no-warnings", "--print", fmt]
    if args.limit:
        cmd += ["--playlist-end", str(args.limit)]
    url = args.url.rstrip("/")
    if "/@" in url and not re.search(r"/(videos|shorts|streams|playlists)$", url):
        url += "/videos"
    subprocess.run(cmd + [url])


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest="cmd", required=True)
    g = sub.add_parser("get", help="fetch transcript(s) to markdown")
    g.add_argument("videos", nargs="+")
    g.add_argument("--out", default=os.path.join("research", "transcripts"))
    g.set_defaults(func=cmd_get)
    l = sub.add_parser("list", help="list videos on a channel/playlist")
    l.add_argument("url")
    l.add_argument("--limit", type=int, default=0)
    l.set_defaults(func=cmd_list)
    args = p.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
