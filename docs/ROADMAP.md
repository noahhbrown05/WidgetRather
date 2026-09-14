# Roadmap: from here to production, and past launch

_Roles updated 2026-09-11 (D-017): Greg = back end, Noah = front end + design + everything else, Tiago = advisor when Noah and Greg ask. Written 2026-09-10 at Noah's request: a genuine step-by-step, **no timeline**. Development is **on hold** until Stages 1–3 are done (D-014). Task IDs like `G4`/`N5`/`T2` point to `MVP-GAMEPLAN.md`._

**How to read this:** do the stages in order. Inside a stage, steps can run in parallel unless one says it needs another. Each step says **who** owns it and when it's **done**.

✅ done · 👉 you are here · ☐ to do

---

## Stage 0: Foundations ✅ (almost done)

| # | Step | Who | Done when |
|---|---|---|---|
| 0.1 | ✅ Research, project rules, shared repo, logging system | Noah | — |
| 0.2 | ✅ Decisions D-001–D-013 signed by Noah and Greg | Noah, Greg | — |
| 0.3 | ✅ Concept mockups (`design/mockups/`) + clickable prototype (`prototype/`) | Noah, Greg | — |
| 0.4 | ✅ **All sign-offs in.** Greg signed D-014–D-017 + D-008 (2026-09-14); Noah approved D-018–D-021 (2026-09-14). Decisions need Noah + Greg (D-017) | Noah, Greg | ✅ Done |
| 0.5 | 🟡 **Noah + Greg sync** — settled: public-community safety (**Option A**, D-018), friend-group cap (**50**, D-019), widget vote sync (D-020), two-pass build (D-021). Still open: **(a) the exact morning drop window · (b) who answers reports (recommend Noah) · (c) the spec's remaining [proposed defaults]** | Noah, Greg | Each answer recorded as a decision |

## Stage 1: Define the product (no code) 👉 YOU ARE HERE

| # | Step | Who | Done when |
|---|---|---|---|
| 1.1 | ✅ **One-page MVP spec** drafted: `docs/MVP-SPEC.md` (2026-09-11) | Noah | ✅ Drafted; Noah + Greg sign the revised D-008 |
| 1.2 | **Question bank v1 + content guidelines**: 60+ questions; hypotheticals only; never about real people; appropriate for 13+ (D-004, D-007) | Noah | A CSV in the repo, guidelines written |
| 1.3 | ✅ **Name check:** looks available; see `research/name-check.md` (definitive check at 7.2). Original step: search the App Store for "Widget Rather"/"WidgetRather". App names are limited to 30 characters ([AppScreenshotStudio](https://appscreenshotstudio.com/blog/app-store-metadata-for-indie-devs-title-subtitle-keywords-2026)). The name is only reserved once the app record exists (step 7.2) | Noah | No conflict found, or a backup name chosen |
| 1.4 | **Brand:** wordmark (fix the "WigetRather" typo), app icon, colours, fonts | Noah | Assets in `design/` |

## Stage 2: Design (no code)

| # | Step | Who | Done when |
|---|---|---|---|
| 2.1 | Study how real apps handle each screen (Raroque uses Mobbin, `oNRrjbKiF04 @ 05:15`) | Noah | Reference board saved |
| 2.2 | **Design system:** colours, type, buttons, cards, result bars, emoji bar | Noah | Documented in `design/` |
| 2.3 | **Every screen, finished**, including edge states: logged out, no group, offline, empty, error, and the widget-gallery preview (Raroque `m5cRcii3pec @ 02:06`, `9sHd-VWssxw @ 01:02`) | Noah | All screens from the 1.1 spec |
| 2.4 | **Widget designs** for the chosen size(s), before and after voting, plus a display-only lock-screen version (lock-screen buttons don't work until unlock, see `research/tech-stack.md`). Tiny image assets (`9sHd-VWssxw @ 02:04`) | Noah | Designs signed off |
| 2.5 | **Update the clickable prototype** to the final designs and fix its known bugs | Greg or Noah | Prototype matches the designs |
| 2.6 | **Show the prototype to a few friends (13+)** and watch where they get confused | Noah | Notes written; designs adjusted |
| 2.7 | **Design freeze** for the MVP | All | Recorded as a decision |

## Stage 3: Accounts, legal, and business setup (no code)

| # | Step | Who | Done when |
|---|---|---|---|
| 3.1 | **Individual or company?** Enrolling with Apple as an organization needs a real legal entity (LLC etc.) and a D-U-N-S number; as an individual, **that person's legal name shows as the seller** on the App Store ([Apple](https://developer.apple.com/help/account/membership/D-U-N-S/), [Apple enrollment](https://developer.apple.com/programs/enroll/)). The account holder must be of legal age (18+ in most places) | All | Decision recorded |
| 3.2 | **Domain + support email + a simple website** hosting the privacy policy and support page. Apple requires published contact info for social apps (Guideline 1.2) and a privacy policy URL (5.1.1) ([Guidelines](https://developer.apple.com/app-store/review/guidelines/)) | Noah | Live URLs |
| 3.3 | **Team accounts**, each person invited (never share passwords), with 2-factor on: Expo org, Supabase, PostHog, Sentry (N2) | Noah | Everyone can log in |
| 3.4 | **Policies:** privacy policy, terms (minimum age 13), community guidelines, plus a **moderation process** (who handles reports and how fast; Apple requires "timely responses") (N6) | Noah | Drafts in the repo |
| 3.5 | **Waitlist page** (Raroque does this before building, `MnF-zJhyUtE @ 00:00`) (N7) | Noah | Live, collecting emails |
| 3.6 | **Repo setup:** protect `main` (PR + 1 approval); one GitHub Issue per Stage 4–6 step | Noah | Done |

## Stage 4: Technical foundation (the development hold lifts here)

| # | Step | Who | Done when |
|---|---|---|---|
| 4.1 | **Lift the hold:** Stages 1–3 done, and D-005 + D-008 signed by Noah + Greg | All | Recorded in `DECISIONS.md` |
| 4.2 | ✅ **Done 2026-09-14.** Expo SDK 57 app scaffolded in `app/` (TypeScript, expo-widgets + @expo/ui + expo-sqlite), `eas.json` carries the `simulator` profile, config plugins and the App Group entitlement verified to resolve on Windows. **Not yet built on EAS** — the cloud build and the simulator run are the next step (G1) | Greg | Config resolves; build pending |
| 4.3 | **Widget spike** in a simulator (cloud Mac or Appetize, see `research/testing-without-apple-account.md`). ~~Can a widget button save an answer to Supabase without opening the app?~~ **Answered 2026-09-14 by the docs: no** (D-020). What's left to spike: **do widget changes need a native rebuild?**, and **how late do votes actually arrive** (median delay between widget tap and app open) | Greg | Written result: the rebuild answer, plus a measured vote-delay number to size the staleness of widget numbers |
| 4.3b | 🟡 **In progress (D-021).** Built: question file, deterministic on-device scheduler, local answer store (first-write-wins), the widget, and the widget↔app seam (`getTimeline` pickup). Verified without a Mac: typecheck + 9 scheduler checks over 3,650 days. **Still to do:** EAS simulator build, then 4.3's two questions on a real simulator | Greg | Pass 1 runs in a simulator; 4.3's two questions answered |
| 4.4 | Supabase: schema, **row-level security from day 1**, generated TypeScript types, and the data-layer function list (the "contract") (G3, G5) | Greg | Function list published in the repo |
| 4.5 | Front-end tooling on Noah's PC; screens run in the browser / Android emulator | Noah | Each can run the app |

## Stage 5: Build the MVP (one pull request per feature)
Each feature, Raroque's way: **UI with dummy data → data → connect → polish** (`Q13QOgwoF0E @ 01:02`).

| # | Feature | Front end | Back end |
|---|---|---|---|
| 5.1 | Theme + shared components | Noah (T4) | — |
| 5.2 | Sign in with Apple + neutral age gate (13+) + display name | Noah (N4) | Greg (G4) |
| 5.3 | Create/join group, invite code | Noah (N5) | Greg (G5) |
| 5.4 | Question drop: import the bank; **random morning time per time zone**; question hidden until the drop | — | Greg (G6) |
| 5.5 | **Widget:** before/after states, answer from the widget, results | Noah (T6) | Greg (G7) |
| 5.6 | Today → voted → results (+ "Everyone" % if approved) | Noah (T5) | Greg (G5) |
| 5.7 | Emoji reactions | Noah | Greg |
| 5.8 | Push notification at the drop + widget reload ([Apple WidgetKit push](https://developer.apple.com/documentation/WidgetKit/Updating-widgets-with-widgetkit-push-notifications)) | — | Greg (G9) |
| 5.9 | **Safety:** report, block, delete account, filter on names, contact info (Guidelines 1.2, 5.1.1(v)) | Noah (N8) | Greg (G8) |
| 5.10 | Analytics events + **week-1 retention** dashboard; Sentry crash reports | Noah (N9) | Greg |

**Done when:** the whole loop works end to end in the simulator, from drop → answer on the widget → results → reactions.

## Stage 6: Harden (still simulators, still free)

| # | Step | Who | Done when |
|---|---|---|---|
| 6.1 | **Security pass:** attack our own row-level security ("can I read another group's answers?"), backend rate limits, and **budget caps + alerts on every paid service** (Raroque `tK4NQtzfZbM @ 04:08, 07:17, 11:29`) (G10) | Greg (+Noah) | Findings fixed |
| 6.2 | All edge states from 2.3 work; use it in "real life" in the simulator, not just tap-through (`oNRrjbKiF04 @ 07:20`) | All | No known blocker bugs |
| 6.3 | App config: icon, launch screen, permission prompts, and **export compliance** (an app that only uses standard HTTPS counts as "exempt"; declare it or builds get stuck at upload) ([AppCompliance](https://appcompliance.io/blog/app-store-encryption-export-compliance/)) | Greg | Set in app config |

## Stage 7: Small beta with friends (TestFlight)

| # | Step | Who | Done when |
|---|---|---|---|
| 7.1 | **Buy the Apple Developer account** ($99/yr), per 3.1's choice (D-013) | Holder (18+) | Enrolled |
| 7.2 | **Create the app record** in App Store Connect (this reserves the name). Fill in the **age rating questionnaire**, including the new **social media capability** question, required for new apps from September 2026; "yes" means at least a 13+ rating ([Apple news](https://developer.apple.com/news/?id=tlur8uvi), [9to5Mac](https://9to5mac.com/2026/07/09/apple-adds-social-media-questions-to-app-store-connect-age-rating-questionnaire/)). If our terms say 13+, override to at least 13+ ([Apple help](https://developer.apple.com/help/app-store-connect/manage-app-information/set-an-app-age-rating/)) | Noah | Record created |
| 7.3 | Real-iPhone builds via EAS → **internal TestFlight** for the three of us (up to 100 internal testers) ([TestFlight](https://developer.apple.com/testflight/)) | Greg | On all three phones |
| 7.4 | Fix real-phone issues: widget memory, push delivery, drop timing across time zones | Greg, Noah | Stable for a few days of daily use |
| 7.5 | **External TestFlight for friends (13+)**. The first build needs Beta App Review (Raroque saw ~24h, `9sHd-VWssxw @ 03:06`); invite by email or public link ([TestFlight](https://developer.apple.com/testflight/)) | Noah (+Greg builds) | Friends installed |
| 7.6 | **Beta plan:** a feedback channel (form or board, `MnF-zJhyUtE @ 02:04`). Measure: % who add the widget, answers per drop, **week-1 retention** | Noah | Weekly beta readout |
| 7.7 | **Go/no-go:** Raroque launches when beta users keep coming back for days, not just day one (`MnF-zJhyUtE @ 07:15`) | All | Decision recorded |

## Stage 8: App Store submission

| # | Step | Who | Done when |
|---|---|---|---|
| 8.1 | **Listing text:** name (30 chars), subtitle (30), keywords (100), description ([AppScreenshotStudio](https://appscreenshotstudio.com/blog/app-store-metadata-for-indie-devs-title-subtitle-keywords-2026)) | Noah | Filled in |
| 8.2 | **Screenshots:** the 6.9" iPhone size (1398×2034 portrait), 1–10 images ([Apple specs](https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/)). Raroque spends 3–4 days on these (`MnF-zJhyUtE @ 06:12`) | Noah (T9) | Uploaded |
| 8.3 | Privacy policy URL, support URL, **App Privacy** answers, age rating confirmed | Noah | Filled in |
| 8.4 | **Demo account + review notes** (required, Guideline 2.1). Important for us: **reviewers must be able to see a question at any time**, not just in the morning drop window, so the demo account needs a question waiting and a group with results | Noah (+Greg) | Tested by someone who's never seen the app |
| 8.5 | **Lawyer review** of the age gate, privacy policy, and terms before going public (D-007) | Noah | Sign-off |
| 8.6 | **Submit** → fix any rejection → approved. Choose **manual release** so you pick launch day | Noah, Greg | Approved |

## Stage 9: Launch

| # | Step | Who | Done when |
|---|---|---|---|
| 9.1 | Release. Email the waitlist; ask beta testers for App Store reviews (Raroque: a handful of 5-star reviews boosts ranking, `cXIWx1eYA9w @ 14:34`) | Noah | Live |
| 9.2 | Use Apple's launch boost: new apps get extra visibility early on, so have the listing polished (`MnF-zJhyUtE @ 06:12`) | All | — |
| 9.3 | **Founder-led content:** document building it on TikTok/IG (`cXIWx1eYA9w @ 15:37`) | Anyone | Posting regularly |
| 9.4 | Seed real friend groups; the invite code is the growth loop | All | Groups active |

## Stage 10: After launch (running it)

| Rhythm | What | Who |
|---|---|---|
| **Every day** | The question drops (keep the bank **30+ days ahead**); moderation reports answered promptly; crashes (Sentry); spending alerts | Noah (questions + reports), Greg (systems) |
| **Every week** | Week-1 retention and funnel review (`cXIWx1eYA9w @ 12:28`); top feedback requests; fix the biggest friction point (`oNRrjbKiF04 @ 01:01`); 15-min team check-in | All |
| **Shipping updates** | JS/UI/image fixes go out **over the air with EAS Update**; native changes (new native libraries, permissions, SDK upgrades) need a **new App Store build and review**. Updates must still follow App Store rules ([Expo docs](https://docs.expo.dev/eas-update/introduction/)) | Greg |
| **Ratings** | Ask for a rating after a good moment (e.g. after seeing your group agrees). Apple shows the prompt at most **3 times per year** per user ([SwiftLee](https://www.avanderlee.com/swift/skstorereviewcontroller-app-ratings/)) | Noah, Greg |
| **App Store** | Keep improving screenshots, keywords, and reviews (`cXIWx1eYA9w @ 14:34`) | Noah |

## Stage 11: Grow (Raroque's ladder, easiest → hardest, `cXIWx1eYA9w @ 13:31–17:41`)
1. **App Store organic:** a strong listing plus reviews.
2. **Online communities:** a long game; contribute before promoting. Be careful: our users are teens.
3. **Founder-led content:** building in public.
4. **UGC marketing (creator videos):** pay creators to make videos about the app. **FTC rules:** the paid relationship must be disclosed clearly and up front, and **we share liability** if a creator doesn't disclose ([FTC](https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking), [LaunchPoint](https://www.launchpointhq.com/blog/ftc-influencer-disclosure-guide)). If a creator is a minor, check with a lawyer first (UNVERIFIED: specific rules not researched yet).
5. **Paid ads:** needs money; research platform rules for advertising to teens before trying (UNVERIFIED).

## Stage 12: Expand the product (each needs its own decision first)

| Idea | What it takes |
|---|---|
| **In-app UGC: user-submitted questions** | Apple's UGC rules: filter, report, block, published contact (Guideline 1.2), which we'll already have. Recommend **pre-moderation**: submissions go into a queue and a person approves them before anyone sees them. Needs a named moderator and fast responses |
| **Threads/comments** on the daily question | More UGC, which means more moderation. Keep it to friend groups first |
| **More widget sizes** + lock-screen widget | Each size needs every edge state designed and tested |
| **Multiple groups / public communities** | Public communities with teens mean much heavier moderation |
| **Android** | The screens carry over; the widget needs native Android (Glance) work (`research/tech-stack.md`) |
| **Under-13 (6th graders)** | COPPA verified parental consent + lawyer (D-007) |
| **Making money** | Not discussed yet; decide later |
