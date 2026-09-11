# Chris Raroque's App-Building Playbook

Channel: https://www.youtube.com/@raroque. He's a solo builder of productivity apps (Ellie, Amy, Luna, Mogul) with 1,000+ paying customers (`cXIWx1eYA9w @ 00:00`). Raw transcripts are kept locally in `research/transcripts/raroque/` (gitignored; re-download with the IDs in `research/video-sources.txt`). Citations use `VIDEO_ID @ mm:ss`. Captions are auto-generated; "Superbase" = Supabase, "cloud code" = Claude Code.

## 1. Ideas & scope
- Build from your own pain points, or take an existing app and make one workflow much better. None of his apps are new ideas. (`cXIWx1eYA9w @ 01:02–03:05`, `Cufn-fjnVCE @ 09:26`)
- **Keep scope as small as possible, as long as possible**, then expand. Build the Apple Notes before the Notion. (`Cufn-fjnVCE @ 03:08`, `cXIWx1eYA9w @ 09:19`)
- Mine Reddit and competitor communities for complaints; they're full of ideas. (`Cufn-fjnVCE @ 08:23`)

## 2. Choosing a stack
- Choose based on your goals and existing skills. He picked Swift for iOS-only speed and animation polish, Supabase to learn SQL, and a simple REST API over GraphQL/ORMs. (`ow7qWPxkKI4 @ 00:00–03:06`)
- Use managed services (Supabase/Firebase) to save energy for the product. (`ow7qWPxkKI4 @ 02:04`)
- Put logic on the backend so web/Android are easier later. (`ow7qWPxkKI4 @ 03:06`)
- For true beginners: start with an AI app builder like **Anything** (React Native/Expo under the hood) before Claude Code/Cursor. (`cXIWx1eYA9w @ 04:07`, `4xg5GrFEVeE`)

## 3. How he builds (AI workflow, 2026)
- About 70% Claude Code (Opus, max thinking), 30% Cursor for gnarly bugs. **Always use plan mode** and review the plan before letting it run. (`9vPyxCucxqI @ 00:00`, `cXIWx1eYA9w @ 06:12`)
- Build each feature in 4 steps: **UI with dummy data → data model/backend → connect → polish.** (`Q13QOgwoF0E @ 01:02`)
- Prompts: be hyper-specific, give visual context (screenshots), and ask for 2–3 changes at a time. If it fails 2–3 times, revert and restart. (`Q13QOgwoF0E @ 03:08–05:12`, `cXIWx1eYA9w @ 07:14`)
- Feed the AI the real docs (e.g. Apple docs) to stop it hallucinating APIs. (`Q13QOgwoF0E @ 06:14`)
- Let agents test their own work (XcodeBuildMCP for iOS, Claude in Chrome for web), and hook up services (Sentry, Supabase, Axiom) as CLIs/MCPs for debugging. (`9vPyxCucxqI @ 01:03–05:12`)
- An AI code-review bot (Greptile) reviews every PR. (`9vPyxCucxqI @ 06:15`)
- **Know-how still matters:** for complex apps with real user data, have someone who can code. Example: his brother's AI builder wiped a database. (`Q13QOgwoF0E @ 12:31–13:33`)

## 4. Widgets specifically (he built three for Ellie)
- Widgets are **timeline-based.** You pre-declare what shows when; you can't just run `if` logic live. (`m5cRcii3pec @ 04:11`)
- Handle edge cases: logged-out state, no internet, empty or deleted data, preview placeholders in the widget gallery. (`m5cRcii3pec @ 02:06`, `9sHd-VWssxw @ 01:02`)
- **Memory is tiny.** ~2MB images crashed the widget; compress assets. (`9sHd-VWssxw @ 02:04`)
- Deep links from widget buttons into specific app screens. (`avJ_gimBPHs @ 07:24`)
- A playful, character-driven widget (Duolingo-style, changes with time of day and state) was the fun, sticky one. (`m5cRcii3pec @ 06:17`)
- Widgets were his #1 most-requested feature (140 upvotes). (`m5cRcii3pec @ 00:00`)

## 5. Pre-launch checklist
1. **Waitlist page before building** (Framer + one screenshot + email capture). It gauges interest and becomes your beta list. (`MnF-zJhyUtE @ 00:00`)
2. **Analytics on day 1** (PostHog). Adding Apple/Google sign-in took signup from 60% to ~100%. (`cXIWx1eYA9w @ 10:21`)
3. **Feedback board** (Canny/UserJot). Users upvote requests, and the results surprise him. (`MnF-zJhyUtE @ 02:04`)
4. **Email sequences** (Loops) for onboarding and re-engagement. (`MnF-zJhyUtE @ 03:07`)
5. **App Store listing:** spend 3–4 days on screenshots; Apple gives new apps a launch boost. (`MnF-zJhyUtE @ 05:11–06:12`)
6. Landing page (~1 week). Launch when beta users stick around for days. (`MnF-zJhyUtE @ 07:15`)

## 6. Metrics
- **North star: week-1 retention**, the share of signups still using the app 7 days later. Ellie went from 3% to 30%; Amy is ~13%. (`cXIWx1eYA9w @ 12:28`, `oNRrjbKiF04 @ 00:00`)
- Retention comes from **reducing friction** and fixing small annoyances. (`oNRrjbKiF04 @ 01:01, 14:38`)
- Notifications build habits. (`ETK_cZLezs4 @ 06:15`)
- Test by actually using the app in real life, not just by testing it. (`oNRrjbKiF04 @ 07:20`)

## 7. Distribution (easiest → hardest)
App Store organic → Reddit/forums (long game, no drive-by promotion) → founder-led "build in public" on TikTok/IG → paid UGC creators → paid ads. (`cXIWx1eYA9w @ 13:31–17:41`)

## 8. Security (he got hacked in 2026)
See `tech-stack.md`: RLS, backend rate limits, no secrets in the app, budget caps. (`tK4NQtzfZbM`)

## What this means for Widget Rather (team to discuss)
- Put up a waitlist page early, even before the stack is final, to test the positioning.
- Keep MVP scope brutally small: the widget question, a one-tap answer, the group result reveal.
- Week-1 retention is the metric that tells us whether this is Gas (spike and die) or Locket (durable).
- Design the playful widget character and state changes; it's the most shareable surface.
