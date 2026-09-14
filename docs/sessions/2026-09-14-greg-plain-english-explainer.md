# 2026-09-14 — Greg — Plain-English explainer for the team

**Teammate:** Greg · **Model:** Claude Opus 5

## Asked for
- Greg, on behalf of himself and Noah: neither has designed or shipped an app before, and the jargon is in the way. His example: "what does 'backend' even mean."
- A **one-page, simply-put, pastel-styled** page **in the repo**, so Noah can pull it and open it on his end.
- Two jobs in one page: translate the vocabulary, and give an honest read on where the project actually stands.

## Did
- Built **[`docs/PLAIN-ENGLISH.html`](../PLAIN-ENGLISH.html)** — open it in a browser, it's self-contained. Sections:
  1. **An app is two halves** — front end vs back end, why a back end exists here at all (because the app is social; a calculator app wouldn't need one).
  2. **One morning, start to finish** — an SVG diagram of the seven steps a question takes, drawn across a phone/server dividing line. Step 4 is drawn as the one arrow that *doesn't* cross: the D-020 finding.
  3. **The word list** — 14 terms (client, server, database, API, Expo, expo-widgets, EAS Build, Supabase, RLS, push notification, simulator, TestFlight, branch, PR, MVP, spike, "decision"), each with a sourced definition plus a line on what it is *for us*.
  4. **Where we actually are** — the 13-stage roadmap as a rail with "you are here" on Stage 1 and the code-starts gate marked at Stage 4, plus done / on-now / in-the-way columns, and a callout for Noah on the three unsigned decisions.
  5. **How one feature gets made** — Raroque's four-step order, mapped onto Noah and Greg specifically.
- Palette lifted from `prototype/index.html` so it reads as the same project. Used **lilac = phone half, mint = server half** on purpose: pink and blue already mean "option A / option B" here, so reusing them would have been misleading.
- Linked it from `README.md` (as step 0 of "Start here") and the `CLAUDE.md` repo map.

## Learned (with sources)
- Front end / back end, and the car analogy used on the page — [AWS, *Front End vs Back End*](https://aws.amazon.com/compare/the-difference-between-frontend-and-backend/). Also the line that actually matters for us: on the front end "every user has their own copy", while "the backend may have to handle thousands of requests simultaneously."
- Client and server, request/response — [MDN, *Client-Server overview*](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview)
- API as "a simple contract (the interface)" — [MDN Glossary, *API*](https://developer.mozilla.org/en-US/docs/Glossary/API). This is the cleanest way to explain the back-end/front-end contract already written into `MVP-GAMEPLAN.md`.
- Supabase = Postgres + auth + realtime + storage + edge functions — [Supabase, *Architecture*](https://supabase.com/docs/guides/getting-started/architecture)
- RLS = "granular authorization rules that run inside the database" — [Supabase, *Row Level Security*](https://supabase.com/docs/guides/database/postgres/row-level-security)
- EAS Build = "a hosted service for building app binaries", iOS builds on "macOS runners hosted in Expo's macOS cloud" — [Expo, *EAS Build*](https://docs.expo.dev/build/introduction/). This is the sourced answer to "why don't we need a Mac".
- TestFlight: up to 100 internal testers, up to 10,000 external — [Apple, *TestFlight*](https://developer.apple.com/testflight/)
- MVP: "the maximum amount of validated learning about customers with the least effort", and Ries's own warning that "MVP, despite the name, is not about creating minimal products" — [Lean Startup Co.](https://leanstartup.co/resources/articles/what-is-an-mvp/)
- Re-confirmed the D-020 quote first-hand: widget code "cannot perform asynchronous work…" — [Expo SDK 57, *Widgets*](https://docs.expo.dev/versions/v57.0.0/sdk/widgets/)

## Decisions
- **None made or changed.** The page explains the decision log; it does not alter it. If the two ever disagree, `DECISIONS.md` wins — that's written into the page footer.

## Open questions / next steps
- **Noah:** read the page, then sign or push back on **D-018**, **D-019**, **D-020**. D-018 and D-019 are still the conditions on Greg's D-008 signature.
- **Both:** the page will go stale the moment those three land — whoever logs that session should update Section 04.
- Everything else on the board is unchanged from the earlier 2026-09-14 session (see `2026-09-14-greg-signoffs-backend-read.md`).
