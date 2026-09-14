# 2026-09-14 — Greg — Single-player first? → build in two passes (D-021)

**Teammate:** Greg · **Model:** Claude Opus 5 · _(same chat as `2026-09-14-greg-plain-english-explainer.md`, split into two files because the topics are separate — read that one first)_

## Asked for
- Greg: *"what if we parked the social aspect for later and only made it single-player right now? just to push some sort of workable product out before introducing that and taking too much on at once."*
- Clarified straight after, and this is the important part: *"i wouldnt launch it that way -- just as a first build."*
- Then: write it up for Noah, and put it on the Plain-English page.

## Did
- Talked it through both ways — as a **launch** (argued against) and as a **build order** (argued for). Greg meant the second.
- Proposed **D-021** in `DECISIONS.md`: build in two passes, and ask D-014 for a narrow exception.
- Added **§05 "Build it in two passes"** to `docs/PLAIN-ENGLISH.html`, with a side-by-side picture of pass 1 (phone half filled, server half empty and dashed) vs pass 2 (both halves filled). Renumbered the old §05 to §06 and updated §04's decision count.
- Added a `[PROPOSED]` step **4.3b** to `ROADMAP.md` and a row to `STATUS.md`'s "Waiting on".

## The proposal in one paragraph
**Pass 1 — local only:** question list shipped inside the app as a file, widget shows today's question, you tap, the answer saves on the phone, plus an answer history. No sign-in, no database, no push. Group results on screen show dummy numbers. **Pass 2:** wire the server in behind it. Pass 1 is **a build step, never a release**.

## Learned (with sources)
- **Pass 1 isn't throwaway, and that's the whole argument.** D-020 means a widget tap is *always* a local write that syncs later — it's how iOS widgets work, not a choice. So pass 1 is the genuine first half of the real architecture, and pass 2 only adds the flush step and swaps dummy numbers for real ones. It's Raroque's per-feature order (`Q13QOgwoF0E @ 01:02`) applied to the whole app.
- **Why not to launch pass 1:** Guideline 4.2 — "If your App doesn't provide some sort of lasting entertainment value or adequate utility, it may not be accepted" ([Apple](https://developer.apple.com/app-store/review/guidelines/)); third-party review consultancies call minimum functionality the most common rejection reason ([Tapbound](https://www.tapbound.com/blog/apple-guideline-4-2-minimum-functionality)). Plus Raroque's go/no-go: launch only once beta users keep coming back for days (`MnF-zJhyUtE @ 07:15`).
- **What going single-player *would* have saved,** recorded because it's real: Guideline 1.2's filter/report/block/published-contact requirement disappears entirely with no UGC ([Apple](https://developer.apple.com/app-store/review/guidelines/)), and with no accounts there's no personal data, so COPPA and the age gate mostly stop mattering.
- **What it wouldn't save:** a privacy policy URL is required for *every* app, not just social ones ([Apple](https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy/)), along with the $99 account, support URL, screenshots and review notes. Single-player skips the back end and the safety work, not Apple.
- **[UNVERIFIED] worth chasing:** widgets are timeline-based (`m5cRcii3pec @ 04:11`). If today's question *and* its drop time can both be computed on-device — deterministically from date + time zone, so everyone in a zone lands on the same moment — the morning drop may not need the server at all, leaving it responsible only for the notification banner. Pass 1 is the cheapest way to find out.

## Decisions
- **D-021 — Build in two passes; narrow exception to the D-014 hold → PROPOSED** (Greg signed, needs Noah).

## Open questions / next steps
- **Noah:** sign or reject D-021. If he reads D-014 strictly, pass 1 just waits — the build order stands either way.
- **Noah:** D-018, D-019, D-020 are all still unsigned, unchanged from earlier today.
- **Not proposed, don't lose it:** Greg also raised trimming MVP scope back toward the original D-008 v1 — dropping public communities, the three insights, two of the three widget sizes. Deliberately kept out of D-021 so Noah gets one clean question; it needs its own decision if the team wants it.
- **Note for whoever logs next:** §04 and §05 of `PLAIN-ENGLISH.html` go stale as soon as any of D-018/019/020/021 land.
