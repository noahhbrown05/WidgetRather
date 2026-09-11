# Decision Log

The single source of truth for what the Widget Rather team has decided.

**Statuses:** `PROPOSED` (open for discussion) · `DECIDED` (team agreed) · `REJECTED` · `SUPERSEDED`.
A decision affecting the whole team isn't `DECIDED` until Noah, Tiago, and Greg have each signed off. To sign off, change your ☐ to ☑ and commit.

| ID | Date | Decision | Status | Proposed by | Sign-off |
|---|---|---|---|---|---|
| D-001 | 2026-09-10 | Research phase first: no app code until stack (D-005) + MVP scope (D-008) are DECIDED | DECIDED (project rule) | Noah | ☑ Noah ☐ Tiago ☐ Greg |
| D-002 | 2026-09-10 | Claude never relies on internal knowledge; everything is researched and cited | DECIDED (project rule) | Noah | ☑ Noah ☐ Tiago ☐ Greg |
| D-003 | 2026-09-10 | GitHub repo is the shared memory (STATUS / DECISIONS / session summaries) | DECIDED (project rule) | Noah | ☑ Noah ☐ Tiago ☐ Greg |
| D-004 | 2026-09-10 | Non-anonymous friend circles; questions are hypotheticals, never rating real people | PROPOSED | Claude | ☐ Noah ☐ Tiago ☐ Greg |
| D-005 | 2026-09-10 | Stack: Expo (React Native) + expo-widgets + EAS cloud builds + Supabase | PROPOSED (recommended) | Claude | ☐ Noah ☐ Tiago ☐ Greg |
| D-006 | 2026-09-10 | iOS-first launch; Android later | PROPOSED | Claude | ☐ Noah ☐ Tiago ☐ Greg |
| D-007 | 2026-09-10 | Age handling: 13+ for the MVP; revisit under-13 (6th graders) with a lawyer | PROPOSED | Claude | ☐ Noah ☐ Tiago ☐ Greg |
| D-008 | 2026-09-10 | MVP scope: the smallest loop that proves we can build it (see below) | PROPOSED | Claude, from Noah's direction | ☐ Noah ☐ Tiago ☐ Greg |
| D-009 | 2026-09-10 | Logging format: STATUS.md + DECISIONS.md + short session summaries (no transcripts) | PROPOSED (already in use) | Claude, at Noah's request | ☐ Noah ☐ Tiago ☐ Greg |
| D-010 | 2026-09-10 | Public repo hygiene: no secrets, no raw copyrighted transcripts | IN EFFECT (safety default; team can revisit) | Claude | ☐ Noah ☐ Tiago ☐ Greg |
| D-011 | 2026-09-10 | Collaboration workflow: GitHub flow (branch → PR → review → merge); see COLLABORATION.md | PROPOSED | Claude | ☐ Noah ☐ Tiago ☐ Greg |
| D-012 | 2026-09-10 | Roles + MVP game plan: Greg = lead engineer (Max), Noah = product & launch (Pro), Tiago = design & content (Pro); see MVP-GAMEPLAN.md | PROPOSED | Noah (direction) / Claude (plan) | ☐ Noah ☐ Tiago ☐ Greg |

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

## D-004: Not anonymous; hypotheticals, not people
- **Rationale:** Apple removes apps used primarily for anonymous/random chat or "hot-or-not" voting on real people, and requires filter/report/block for UGC ([App Store Guidelines 1.2](https://developer.apple.com/app-store/review/guidelines/)). Anonymous teen apps (Sarahah, YikYak, YOLO) ran into bullying and removal ([Fast Company](https://www.fastcompany.com/90346978/anonymous-qa-app-yolo-is-a-hit-with-teens-but-bullying-concerns-linger)).
- **Trade-off:** anonymity was part of YOLO's and Gas's growth.

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
3. **One question per day**, written by us (stored in the database).
4. **iOS home-screen widget** shows the question with two buttons.
5. After answering, you see **your group's % split**.
6. **Emoji reactions** on the day's question (in the app).
7. Report and block (required by Apple for UGC).

**Not in v1:** threads/chat, public communities, random drop timing, answering from the lock screen (iOS keeps lock-screen buttons inactive until unlock), Android, AI-generated questions.

## D-010: Public repo hygiene
- The repo is public. No secrets ever; raw YouTube transcripts are gitignored (copyright); summaries with citations are fine.

## D-011: Collaboration workflow
- See `docs/COLLABORATION.md`. Based on [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow).

## D-012: Roles and MVP game plan
- **Noah's direction:** main code development runs from Greg's desktop because Greg has Claude Max; Noah and Tiago have Pro, so divide the tasks by capacity.
- **Rationale:** Max is sold as 5x or 20x Pro's usage under a rolling 5-hour window plus a weekly cap ([Morph](https://www.morphllm.com/claude-code-usage-limits), [CC for Everyone](https://ccforeveryone.com/guides/claude-code-limits-and-pricing)). Long agentic coding goes to Greg; short writing/design/review/admin tasks go to Noah and Tiago.
- **Plan:** `docs/MVP-GAMEPLAN.md`. The #1 blocker is the Apple Developer account (needed to put test builds on iPhones without a Mac).
