# Decision Log

The single source of truth for what the Widget Rather team has decided.

**Statuses:** `PROPOSED` (open for discussion) · `DECIDED` (team agreed) · `REJECTED` · `SUPERSEDED`.
A decision affecting the whole team isn't `DECIDED` until Noah, Tiago, and Greg have each signed off. To sign off, change your ☐ to ☑ and commit.

| ID | Date | Decision | Status | Proposed by | Sign-off |
|---|---|---|---|---|---|
| D-001 | 2026-09-10 | Research phase first: no app code until stack (D-005) + MVP scope (D-008) are DECIDED | DECIDED (project rule) | Noah | ☑ Noah ☐ Tiago ☐ Greg |
| D-002 | 2026-09-10 | Claude never relies on internal knowledge; everything is researched and cited | DECIDED (project rule) | Noah | ☑ Noah ☐ Tiago ☐ Greg |
| D-003 | 2026-09-10 | GitHub repo is the shared memory (STATUS / DECISIONS / session summaries) | DECIDED (project rule) | Noah | ☑ Noah ☐ Tiago ☐ Greg |
| D-004 | 2026-09-10 | Not anonymous: users are identified to their friend groups (anonymity was never part of the concept) | PROPOSED | Noah (clarified) | ☑ Noah ☐ Tiago ☐ Greg |
| D-005 | 2026-09-10 | Stack: Expo (React Native) + expo-widgets + EAS cloud builds + Supabase | PROPOSED | Claude | ☑ Noah ☐ Tiago ☐ Greg |
| D-006 | 2026-09-10 | iOS-first launch; Android later | PROPOSED | Claude | ☑ Noah ☐ Tiago ☐ Greg |
| D-007 | 2026-09-10 | Age handling: 13+ for the MVP; revisit under-13 (6th graders) with a lawyer | PROPOSED | Claude | ☑ Noah ☐ Tiago ☐ Greg |
| D-008 | 2026-09-10 | MVP scope, incl. a **random morning drop, same moment per time zone** (see below) | PROPOSED | Claude + Noah (added random drop) | ☑ Noah ☐ Tiago ☐ Greg |
| D-009 | 2026-09-10 | Logging format: STATUS.md + DECISIONS.md + short session summaries (no transcripts) | PROPOSED (already in use) | Claude, at Noah's request | ☑ Noah ☐ Tiago ☐ Greg |
| D-010 | 2026-09-10 | Public repo (stays public) + hygiene: no secrets, no raw copyrighted transcripts | IN EFFECT | Claude | ☑ Noah ☐ Tiago ☐ Greg |
| D-011 | 2026-09-10 | Collaboration workflow: GitHub flow (branch → PR → review → merge); see COLLABORATION.md | PROPOSED | Claude | ☑ Noah ☐ Tiago ☐ Greg |
| D-012 | 2026-09-10 | Roles + MVP game plan: Greg = backend + builds (Max); Noah + Tiago split front end + misc (Pro); see MVP-GAMEPLAN.md | PROPOSED | Noah (direction) / Claude (plan) | ☑ Noah ☐ Tiago ☐ Greg |
| D-013 | 2026-09-10 | Testing plan: test in simulators/web/Android first; delay the $99 Apple account until the MVP works in a simulator | PROPOSED | Claude (from research) | ☑ Noah ☐ Tiago ☐ Greg |

---

## D-001: Research before building
- **Why:** Noah: "I don't want to do any coding or production yet until we get a tech stack on all of our research done and our positioning done."
- **Clarified 2026-09-10:** this is a learning project. The goal is to prove we can build and grow an app, so the target is a small MVP, not a durable company. The teen-app "graveyard" (Gas, Houseparty) is context, not a blocker.

## D-002: External research only
- Rule 1 in `CLAUDE.md`. Tooling: `.claude/skills/youtube-transcript/`.

## D-003 / D-009: Repo as shared memory, and the logging format
- `docs/STATUS.md`: one page, rewritten each session (read first).
- `docs/DECISIONS.md`: this file.
- `docs/sessions/`: one short summary per session (under ~60 lines), **not** word-for-word transcripts. Noah flagged that verbatim logs would get too big.
- Why separate files per session: two people editing the same file at the same time causes git merge conflicts; separate files avoid that.

## D-004: Not anonymous
- **Noah (2026-09-10):** there was never any anonymity positioning. YOLO was referenced for the audience and vibe, not the anonymous mechanic.
- **Related content rule (kept in the question-bank guidelines):** questions are hypotheticals, never polls rating real people. Apple removes apps built around "hot-or-not" voting on real people and requires filter/report/block for user content ([App Store Guidelines 1.2](https://developer.apple.com/app-store/review/guidelines/)).

## D-005: Tech stack (recommended: Option A)
- **Constraints (Noah, 2026-09-10):** no Mac on the team; all coding done with AI tools.
- **Option B (native Swift) is ruled out:** Xcode only runs on macOS ([BrowserStack](https://www.browserstack.com/guide/xcode-for-windows)), and local iOS builds need macOS + Xcode ([Expo docs](https://docs.expo.dev/build-reference/local-builds/)).
- **Option A:**
  - **App:** Expo (React Native, TypeScript).
  - **Widget:** `expo-widgets` (Expo SDK 57): iOS home-screen and lock-screen widgets as React components, with interactive buttons, timelines, and push updates ([Expo docs](https://docs.expo.dev/versions/latest/sdk/widgets/)).
  - **Builds:** EAS Build + Submit run in the cloud, working from Windows ([Playcode](https://playcode.io/blog/eas-build-guide), [Expo docs](https://docs.expo.dev/submit/ios/)).
  - **Backend:** Supabase (Postgres, auth, realtime, edge functions).
  - **Day 1:** PostHog (analytics) + Sentry (crashes). (Raroque `cXIWx1eYA9w @ 10:21`, `9vPyxCucxqI @ 04:09`)
- **Practical consequences of no Mac:**
  - No iOS Simulator. You test on real iPhones via EAS cloud development builds, which need a **paid Apple Developer account ($99/yr)** ([Expo discussion](https://github.com/expo/expo/discussions/27489), [Apple](https://developer.apple.com/programs/)).
  - The Apple Developer account holder must be **of legal age (18+ in most places)**. Under-18s can use an account created by a parent/guardian ([Apple enrollment](https://developer.apple.com/programs/enroll/)).
- **Biggest technical unknown (verify in the first coding spike):** can an `expo-widgets` button submit an answer to Supabase without opening the app? The widget is the product, so this gets tested first.
- **Details:** `research/tech-stack.md`

## D-006: iOS-first
- 87% of US teens own an iPhone ([Piper Sandler Fall 2025](https://www.pipersandler.com/news/piper-sandler-completes-50th-semi-annual-teen-survey)); `expo-widgets` is iOS-only; Android lock-screen widgets are only just arriving ([Android Dev Blog](https://android-developers.googleblog.com/2025/03/widgets-on-lock-screen-faq.html)).

## D-007: Age handling
- **The issue:** Noah's target is middle school to high school. Middle school (grades 6–8) is typically ages **11–14**, so 6th graders (and some 7th graders) are **under 13** ([Wikipedia: Middle school](https://en.wikipedia.org/wiki/Middle_school), [Your Teen Mag](https://yourteenmag.com/teenager-school/school-grade-level-and-age)).
- Under 13 triggers **COPPA**: verifiable parental consent before collecting personal info; amended rule fully in force since Apr 22, 2026 ([White & Case](https://www.whitecase.com/insight-alert/unpacking-ftcs-coppa-amendments-what-you-need-know)). The FTC says a neutral age gate can screen users, but a "I am over 12" checkbox doesn't count ([FTC COPPA FAQ](https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions)).
- **Proposal:** the MVP is 13+ with a neutral age gate (roughly 7th/8th grade and up), using Apple's Declared Age Range API where it applies. Revisit under-13 support with a lawyer before a public launch.

## D-008: MVP scope (proposed)
Goal: prove the three of us can build and ship it. Keep scope as small as possible for as long as possible (Raroque `Cufn-fjnVCE @ 03:08`), with value visible in seconds (Bier, [Lenny's](https://www.lennysnewsletter.com/p/how-to-consistently-go-viral-nikita-bier)).

**In v1:**
1. Sign in (Sign in with Apple; Raroque's signup went from 60% to ~100% after adding social login, `cXIWx1eYA9w @ 10:21`) + age gate.
2. Create or join **one friend group** via invite code/link.
3. **One question per day**, written by us (stored in the database), **dropped at a random time each morning before school, at the same moment for everyone in a time zone** (added by Noah, 2026-09-10).
   - Why morning: 28 states + DC have bell-to-bell school phone bans ([Harvard Kennedy School](https://www.hks.harvard.edu/faculty-research/policy-topics/education-training-labor/many-states-are-banning-cellphones-schools), [Newsweek](https://www.newsweek.com/map-shows-us-states-with-school-phone-bans-in-2026-11335155)), so a before-school drop lets people answer, then talk about it at school the same day.
   - Why per time zone: everyone nearby gets the same shared moment, and the backend needs just one random time per zone per day.
   - **Open:** the exact window (e.g. roughly 6–8am local). Decide from school start times.
   - **How it works (for Greg):** a server job picks each zone's time and sends a push, which also tells the widget to reload. WidgetKit supports server-push reloads ([Apple docs](https://developer.apple.com/documentation/WidgetKit/Updating-widgets-with-widgetkit-push-notifications)), and expo-widgets supports push updates ([Expo docs](https://docs.expo.dev/versions/latest/sdk/widgets/)).
4. **iOS home-screen widget** shows the question with two buttons.
5. After answering, you see **your group's % split**.
6. **Emoji reactions** on the day's question (in the app).
7. Report and block (required by Apple for UGC).

**Not in v1:** threads/chat, public communities, answering from the lock screen (iOS keeps lock-screen buttons inactive until unlock), Android, AI-generated questions.

## D-010: Public repo hygiene
- The repo is public. No secrets ever; raw YouTube transcripts are gitignored (copyright); summaries with citations are fine.

## D-011: Collaboration workflow
- See `docs/COLLABORATION.md`. Based on [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow).

## D-012: Roles and MVP game plan
- **Noah's direction:** Greg (Claude Max) is the main back-end developer; Noah and Tiago (Pro) split all front-end and miscellaneous MVP tasks. (This revised a first draft that gave Greg all the code.)
- **Rationale:**
  - Max is sold as 5x or 20x Pro's usage ([Morph](https://www.morphllm.com/claude-code-usage-limits), [CC for Everyone](https://ccforeveryone.com/guides/claude-code-limits-and-pricing)), so the heaviest work goes to Greg: backend, security, widget ↔ backend, builds, and the tech spike.
  - Front end is feasible on Pro: with an Expo dev build installed, JS/TS changes load from each person's own PC without rebuilding ([Expo docs](https://docs.expo.dev/develop/development-builds/introduction/)).
  - Greg owns native builds because the Expo free plan allows 15 iOS builds/month ([Expo pricing](https://expo.dev/pricing)).
- **Contract:** Greg provides generated Supabase types + a data-layer function list; screens only call those functions.
- **Plan:** `docs/MVP-GAMEPLAN.md`.

## D-013: Testing without the Apple account (for now)
- **Question (Noah):** is there any way to test the early MVP without the paid Apple Developer account, ideally something iPhone-like on Windows?
- **Findings:**
  - EAS can make an **iOS simulator build with no Apple account** ([Expo docs](https://docs.expo.dev/build-reference/simulators/)).
  - That build runs in a browser on **Appetize** ([Appetize docs](https://docs.appetize.io/platform/app-management/uploading-apps/ios)), or in Apple's real Simulator on a **rented cloud Mac** (MacinCloud ~$1/hr, [MacinCloud](https://www.macincloud.com/pages/payg.html)), which supports widgets.
  - Day-to-day screen testing works in the web browser, the Android emulator, and (if the SDK 57 check passes) Expo Go.
- **Proposal:** test this way through the MVP; buy the $99 account before the TestFlight beta (Phase 4).
- **Details:** `research/testing-without-apple-account.md`
