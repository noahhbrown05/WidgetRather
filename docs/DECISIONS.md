# Decision Log

The single source of truth for what the Widget Rather team has decided.

**Statuses:** `PROPOSED` (open for discussion) · `DECIDED` (team agreed) · `REJECTED` · `SUPERSEDED`.
**Since D-017 (2026-09-11), a decision is `DECIDED` once Noah and Greg have both signed.** Tiago is an advisor; his box is optional. To sign off, change your ☐ to ☑ and commit. _(Before D-017, all three had to sign.)_

| ID | Date | Decision | Status | Proposed by | Sign-off |
|---|---|---|---|---|---|
| D-001 | 2026-09-10 | Research phase first: no app code until stack (D-005) + MVP scope (D-008) are DECIDED | DECIDED (project rule) | Noah | ☑ Noah ☐ Tiago ☑ Greg |
| D-002 | 2026-09-10 | Claude never relies on internal knowledge; everything is researched and cited | DECIDED (project rule) | Noah | ☑ Noah ☐ Tiago ☑ Greg |
| D-003 | 2026-09-10 | GitHub repo is the shared memory (STATUS / DECISIONS / session summaries) | DECIDED (project rule) | Noah | ☑ Noah ☐ Tiago ☑ Greg |
| D-004 | 2026-09-10 | Not anonymous: users are identified to their friend groups (anonymity was never part of the concept) | DECIDED | Noah (clarified) | ☑ Noah ☐ Tiago ☑ Greg |
| D-005 | 2026-09-10 | Stack: Expo (React Native) + expo-widgets + EAS cloud builds + Supabase | DECIDED | Claude | ☑ Noah ☐ Tiago ☑ Greg |
| D-006 | 2026-09-10 | iOS-first launch; Android later | DECIDED | Claude | ☑ Noah ☐ Tiago ☑ Greg |
| D-007 | 2026-09-10 | Age handling: 13+ for the MVP; revisit under-13 (6th graders) with a lawyer | DECIDED | Claude | ☑ Noah ☐ Tiago ☑ Greg |
| D-008 | 2026-09-10 (revised 09-11) | MVP scope → **now defined by `docs/MVP-SPEC.md`**: random morning drop, all 3 widget sizes, friend groups + **public communities** (creator + mods), multiple memberships, insights (Rare pick / Your twin / Split meter), emoji avatars | **DECIDED** (Greg's conditions D-018 + D-019 both approved by Noah 2026-09-14) | Noah + Claude | ☑ Noah ☐ Tiago ☑ Greg |
| D-009 | 2026-09-10 | Logging format: STATUS.md + DECISIONS.md + short session summaries (no transcripts) | DECIDED | Claude, at Noah's request | ☑ Noah ☐ Tiago ☑ Greg |
| D-010 | 2026-09-10 | Public repo (stays public) + hygiene: no secrets, no raw copyrighted transcripts | DECIDED | Claude | ☑ Noah ☐ Tiago ☑ Greg |
| D-011 | 2026-09-10 | Collaboration workflow: GitHub flow (branch → PR → review → merge); see COLLABORATION.md | DECIDED | Claude | ☑ Noah ☐ Tiago ☑ Greg |
| D-012 | 2026-09-10 | Roles + MVP game plan: Greg = backend + builds (Max); Noah + Tiago split front end + misc (Pro); see MVP-GAMEPLAN.md | SUPERSEDED by D-017 | Noah (direction) / Claude (plan) | ☑ Noah ☐ Tiago ☑ Greg |
| D-013 | 2026-09-10 | Testing plan: test in simulators/web/Android first; delay the $99 Apple account until the MVP works in a simulator | DECIDED | Claude (from research) | ☑ Noah ☐ Tiago ☑ Greg |
| D-014 | 2026-09-10 | Development on hold until ROADMAP Stages 1–3 (product spec, design, accounts/legal) are done; no timeline, follow `docs/ROADMAP.md` step by step | DECIDED | Noah | ☑ Noah ☐ Tiago ☑ Greg |
| D-015 | 2026-09-11 | **Duo mode** (pairs for couples/best friends/siblings, anyone 13+) is the first feature after the MVP launch | DECIDED | Noah | ☑ Noah ☐ Tiago ☑ Greg |
| D-016 | 2026-09-11 | Avatar direction: **Pastel Critters**: the 12-critter roster in `design/critters.md` (Noah: "I love the critter roster"); head-silhouette rules, bandana pick-tint, 8 colours, moods; no photos | DECIDED | Noah | ☑ Noah ☐ Tiago ☑ Greg |
| D-017 | 2026-09-11 | **Roles revised:** Greg = back end; **Noah = main front end + design + everything else**; Tiago = advisor only when Noah + Greg ask. **Decisions need Noah + Greg**. Replaces D-012's split | DECIDED | Noah | ☑ Noah ☐ Tiago ☑ Greg |
| D-018 | 2026-09-14 | **Public communities show totals only** (spec §9 **Option A**): the split, the insights and a member count; **no member list, no individual picks, no reactions between strangers** | DECIDED | Greg | ☑ Noah ☐ Tiago ☑ Greg |
| D-019 | 2026-09-14 | **Friend groups get a size cap of 50**, replacing "no cap" in spec §6 | DECIDED | Greg | ☑ Noah ☐ Tiago ☑ Greg |
| D-020 | 2026-09-14 | **Widget votes are local-only and sync late**: the widget cannot reach the server, so the backend accepts late/out-of-order votes with a client timestamp and rejects duplicates; the core loop is reworded so a widget tap doesn't promise live numbers | DECIDED (independently verified against the Expo SDK 57 docs, 2026-09-14) | Greg | ☑ Noah ☐ Tiago ☑ Greg |
| D-021 | 2026-09-14 | **Build in two passes**: pass 1 is local-only (widget + question file + local save, no accounts or server), pass 2 wires the server in behind it. Pass 1 is a **build step, never a release**. Grants D-014 a **narrow exception**: plumbing may start now, front-end screens still wait for the design freeze | DECIDED | Greg | ☑ Noah ☐ Tiago ☑ Greg |
| D-022 | 2026-09-14 | **Bundle identifier `com.widgetrather.app`** (widget extension `.widgets`, App Group `group.com.widgetrather.app`), set while scaffolding pass 1. Permanent once the app ships; depends on the domain Noah still has to register | PROPOSED (needs Noah) | Greg | ☐ Noah ☐ Tiago ☑ Greg |

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
- **Biggest technical unknown — ANSWERED 2026-09-14 (research finding, not a change to this decision):** can an `expo-widgets` button submit an answer to Supabase without opening the app? **No.** Widget code "cannot perform asynchronous work, import other modules, or access your app's runtime or in-memory state", and a button's `onPress` return value only "becomes the widget's new props... with no running app process required" ([Expo SDK 57 widgets docs](https://docs.expo.dev/versions/v57.0.0/sdk/widgets/)). **A widget tap is a local write** that reaches Supabase when the app next runs. The stack still stands — see **D-020** for the deferred-vote design and `research/backend-read-mvp-spec.md` for the native-target escape hatch.
- **Details:** `research/tech-stack.md`

## D-006: iOS-first
- 87% of US teens own an iPhone ([Piper Sandler Fall 2025](https://www.pipersandler.com/news/piper-sandler-completes-50th-semi-annual-teen-survey)); `expo-widgets` is iOS-only; Android lock-screen widgets are only just arriving ([Android Dev Blog](https://android-developers.googleblog.com/2025/03/widgets-on-lock-screen-faq.html)).

## D-007: Age handling
- **The issue:** Noah's target is middle school to high school. Middle school (grades 6–8) is typically ages **11–14**, so 6th graders (and some 7th graders) are **under 13** ([Wikipedia: Middle school](https://en.wikipedia.org/wiki/Middle_school), [Your Teen Mag](https://yourteenmag.com/teenager-school/school-grade-level-and-age)).
- Under 13 triggers **COPPA**: verifiable parental consent before collecting personal info; amended rule fully in force since Apr 22, 2026 ([White & Case](https://www.whitecase.com/insight-alert/unpacking-ftcs-coppa-amendments-what-you-need-know)). The FTC says a neutral age gate can screen users, but a "I am over 12" checkbox doesn't count ([FTC COPPA FAQ](https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions)).
- **Proposal:** the MVP is 13+ with a neutral age gate (roughly 7th/8th grade and up), using Apple's Declared Age Range API where it applies. Revisit under-13 support with a lawyer before a public launch.

## D-008 revision (2026-09-11)
- Noah's spec session changed the scope, and **`docs/MVP-SPEC.md` is now the source of truth**. Added: all 3 widget sizes · public communities with creator + moderators (no size cap) · multiple memberships · three insights instead of a plain "Everyone %" · emoji/colour avatars, no photos · reactions on each friend's pick.
- Greg's earlier sign-off was for the old scope, so it was cleared. **All three need to re-sign.** The biggest open call: how public communities handle strangers of different ages (spec §9, options A/B/C).
- The original v1 list below is kept for history.

## D-008: MVP scope (original, 2026-09-10)
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

## D-017: Roles revised; Noah + Greg decide
- **Noah (2026-09-11):** "Greg is back end and I am the main front end, Tiago is maybe just weighing in if necessary if me and Greg deem it to be."
- **Effect:** every task that was Tiago's (design system, screens, widget look, brand, question bank, screenshots) moves to **Noah**. Decisions need **Noah + Greg**.
- **Once Greg signs D-017:** every decision already ticked by both Noah and Greg (D-001–D-007, D-009–D-013) becomes `DECIDED`, **including D-005 (stack)**. D-008 (revised) still needs Greg's re-sign; after that, the only thing left before development is D-014's Stages 1–3.
- **Capacity note:** Noah is on Pro and now owns all front end + design. Greg (Max) picks up overflow, per `MVP-GAMEPLAN.md`.

## D-014: Hold development; follow the roadmap
- **Noah (2026-09-10):** "hold off on development right now." Wants a step-by-step from here to production and past launch, with **no timeline**.
- **What it means:** even after D-005/D-008 are signed, no app code until ROADMAP Stages 1–3 are done: the one-page MVP spec, finished designs (design freeze), and accounts/legal setup. Clickable mockups and design work are fine.
- **Narrow exception (D-021, approved by Noah 2026-09-14):** **back-end and native plumbing may start now. All front-end screens still wait for the design freeze (ROADMAP Stage 2).**
- **Plan:** `docs/ROADMAP.md` (Stages 0–12). `MVP-GAMEPLAN.md` keeps the task IDs and owners; its week targets were removed.

## D-013: Testing without the Apple account (for now)
- **Question (Noah):** is there any way to test the early MVP without the paid Apple Developer account, ideally something iPhone-like on Windows?
- **Findings:**
  - EAS can make an **iOS simulator build with no Apple account** ([Expo docs](https://docs.expo.dev/build-reference/simulators/)).
  - That build runs in a browser on **Appetize** ([Appetize docs](https://docs.appetize.io/platform/app-management/uploading-apps/ios)), or in Apple's real Simulator on a **rented cloud Mac** (MacinCloud ~$1/hr, [MacinCloud](https://www.macincloud.com/pages/payg.html)), which supports widgets.
  - Day-to-day screen testing works in the web browser, the Android emulator, and (if the SDK 57 check passes) Expo Go.
- **Proposal:** test this way through the MVP; buy the $99 account before the TestFlight beta (Phase 4).
- **Details:** `research/testing-without-apple-account.md`

## D-008: Greg's conditional sign-off (2026-09-14) — conditions met ✅
- Greg re-signed the revised scope **conditional on D-018 (§9 Option A) and D-019 (a friend-group size cap)**. **Noah approved both on 2026-09-14, so the condition is satisfied and D-008 is `DECIDED`.**
- **Why those two conditions and not the widget sizes:** three widget sizes are near-free on the back end (three layouts over one payload). The costly part of the revision is **unbounded group size combined with "your twin"**, which is pairwise per user. Scoped to friend groups of ~50 it's a small SQL aggregate; across an uncapped 2,000-person school community it's a day-one scaling problem. Full reasoning and sources: `research/backend-read-mvp-spec.md`.

## D-018: Public communities show totals only (§9 Option A)
- **Proposed by Greg (2026-09-14), from the back-end read.** Arrives at the same answer the spec's §9 recommends, by a different route.
- **Why A:** cheapest to build, cheapest to moderate, and the only option where a stranger never sees another user — so "public community full of mixed-age strangers" mostly stops being a risk surface. It also keeps D-019's twin calculation bounded.
- **Why not B (age-banded):** it needs reliable age data we've already decided we can't get. The FTC is explicit that a self-declared checkbox isn't a valid screen ([FTC COPPA FAQ](https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions)); banding on unverified ages reads well and enforces nothing (D-007).
- **Why not C (fully social):** needs real moderation staffing before launch. Apple requires filtering, reporting with "timely responses", blocking, and published contact info for any UGC app ([App Store Guidelines 1.2](https://developer.apple.com/app-store/review/guidelines/)) — that's an ongoing staffing cost, not a build task, and the spec currently assigns it to Noah by [proposed default].

## D-019: Cap friend-group size
- **Proposed by Greg (2026-09-14).** Spec §6 says "no cap" on friend groups (Noah). That's a decision with a cost: it hits the "your twin" calculation, the "who picked what" member list, and the reaction fan-out, all of which scale with group size.
- **Proposed cap: 50.** [ESTIMATE] Large enough that no real friend group hits it, small enough that every per-group query stays trivial.

## D-020: Widget votes are local-only and sync late
- **Proposed by Greg (2026-09-14), forced by the D-005 finding above.** `expo-widgets` gives a widget button no way to reach the server, so a tap is a local write until the app runs.
- **The design:** the widget tap stores a **pending vote** (question id + choice + timestamp) locally; the app flushes pending votes on next launch or background refresh; the server validates the client timestamp falls inside that question's open window and **rejects duplicates** (first write wins — which the spec already wants, "your first tap locks in"); tallies recompute as votes land.
- **Consequence for the spec:** §3's core loop ("tap the widget → the results unlock") needs rewording. The widget can flip to "answered" instantly, but the numbers it shows are as of the **last push**, not as of your tap. A vote cast offline is the normal case, not an edge case.
- **Consequence for the plan:** the G2 spike changes from "can we?" to "how late are votes?" — the number we need is the median delay between widget tap and app open.
- **See also D-021**, which turns this constraint into a build order.
- **Escape hatch, if the team wants live widget writes:** a native Swift widget target via [`@bacons/apple-targets`](https://github.com/EvanBacon/expo-apple-targets) + App Intents, built on EAS from Windows ([Expo: iOS App Extensions](https://docs.expo.dev/build-reference/app-extensions/)). `perform()` supports async. **[UNVERIFIED]** developers report background network from widget extensions failing over cellular when the app isn't running ([Apple Developer Forums 737162](https://developer.apple.com/forums/thread/737162)). Confirming needs a device test, which needs the $99 account (D-013).
- **Details:** `research/backend-read-mvp-spec.md`

## D-021: Build in two passes; a narrow exception to the D-014 hold
- **Proposed by Greg (2026-09-14, second session).** Greg's question: *"what if we parked the social aspect for later and only made it single-player right now? just to push some sort of workable product out before introducing that and taking too much on at once"* — clarified immediately after as **a first build, not a launch**: *"i wouldnt launch it that way -- just as a first build."*

### The proposal, in plain terms
Build the app in two passes instead of all at once.

| | **Pass 1 — just you** | **Pass 2 — everyone else** |
|---|---|---|
| Where it lives | Entirely on the phone | Phone + server |
| What's in it | Question list shipped inside the app as a file · widget shows today's question · you tap · answer saved locally · your answer history | Everything from pass 1, plus sign-in, Supabase, friend groups, real results |
| Results on screen | Dummy numbers | Real numbers from the group |
| Needs | Nothing (simulator builds need no Apple account, D-013) | The back end proper |

### Why pass 1 is not throwaway work
Because of **D-020**, a widget tap is *always* a local write that syncs when the app next runs — that is how iOS widgets work, not a shortcut we chose. Pass 1 is therefore the genuine first half of the real architecture (steps 3–4 of the flow in `PLAIN-ENGLISH.html`), not a mock-up of it. Pass 2 adds the flush-to-server step and swaps dummy numbers for real ones. **Nothing built in pass 1 gets rewritten.** This is also just Raroque's per-feature order — UI with dummy data → data → connect → polish (`Q13QOgwoF0E @ 01:02`) — applied to the whole app instead of one screen.

### Pass 1 is a build step, never a release
Explicitly **not** an App Store launch, for three reasons:
- **No reason to open it twice.** The reveal is the product (MVP-SPEC §3, §5); all three insights need other people's answers. Raroque's go/no-go is to launch only once beta users keep coming back for days (`MnF-zJhyUtE @ 07:15`) — pass 1 fails that by construction.
- **App Review risk.** Guideline 4.2: "If your App doesn't provide some sort of lasting entertainment value or adequate utility, it may not be accepted" ([Apple](https://developer.apple.com/app-store/review/guidelines/)). A widget that shows a question and remembers your tap is squarely that shape.
- **You only get one first launch,** and Apple's extra visibility for new apps goes with it (ROADMAP 9.2).

### What it asks of D-014
A **narrow exception, not a lifted hold.** Proposed wording:

> *Back-end and native plumbing may start now. All front-end screens still wait for the design freeze (ROADMAP Stage 2).*

**Why this fits D-014's own reasoning rather than working against it:** the hold exists so we don't build screens before the designs are settled. Pass 1 contains essentially no screens — a widget, a question file and a local save. Noah's screen work is untouched and still waits for Stage 2. If Noah reads the hold more strictly than that, this decision simply gets rejected and pass 1 waits; the build order still stands for whenever the hold does lift.

### What it buys us
- Turns **ROADMAP 4.3** from a throwaway spike into a real build that answers the same two open questions: *does a widget change need a native rebuild?* and *how late do votes actually arrive?*
- Proves EAS-from-Windows works (G1) before anything depends on it.
- Gives Noah a running app to design against instead of a static prototype.
- **Cost: nothing up front.** Simulator builds need no Apple account (D-013). Measuring real vote delay needs real phones, so that part still waits for the $99 account, exactly as already planned.

### [PARTLY VERIFIED 2026-09-14] A possible bonus, settled by building it
Widgets are timeline-based — you pre-declare what shows when (`m5cRcii3pec @ 04:11`). If today's question *and* its drop time can both be computed on-device (e.g. derived deterministically from the date + time zone, so everyone in a zone lands on the same moment with nobody coordinating them), the **morning drop may not need the server at all**, leaving the server responsible only for the notification banner. That would shrink the back end meaningfully. Not confirmed — pass 1 is the cheapest way to find out.

**Result (Greg, 2026-09-14, building pass 1):** the maths half is confirmed and the scheduling half is not, so this stays open but is now much narrower.
- **Confirmed on Windows, no Mac or simulator needed:** today's question and its drop minute can both be derived from the device's *local calendar date* alone, so every phone in a time zone agrees with no server, no clock sync and no shared secret. `app/src/schedule.ts` is pure and `npm run check:schedule` proves it over 3,650 simulated days.
- **Still UNVERIFIED:** that iOS actually fires a scheduled timeline entry at the drop minute. `updateTimeline` accepts future-dated entries ([SDK 57 docs](https://docs.expo.dev/versions/v57.0.0/sdk/widgets/)), but whether the system honours the exact minute needs a simulator build (ROADMAP 4.3). WidgetKit budgets refreshes, so it may fire late.
- **One real bug came out of it, worth knowing:** the first version drifted the drop time by a single minute per day (07:31, 07:30, 07:29...) because a plain FNV-1a hash avalanches weakly when inputs differ only in the last character - and consecutive dates do. A user would have learned the pattern inside a week, quietly breaking MVP-SPEC section 4's promise of a random moment. Fixed with a hash finalizer; two regression checks now guard it.
- **If the scheduling half holds,** the server's only job at drop time is the notification banner, which is a meaningfully smaller back end.

### Not included in this decision
Greg separately raised **trimming MVP scope** back toward the original D-008 v1 — dropping public communities, the three insights, and two of the three widget sizes. That is **not proposed here** and would need its own decision. Noted so it isn't lost.

## D-022: Bundle identifier and App Group
- **Set by Greg (2026-09-14)** while scaffolding pass 1, because the widget cannot be configured without one: `expo-widgets` needs an App Group to share data between the app and the widget extension.
- **The values:** app `com.widgetrather.app` · widget extension `com.widgetrather.app.widgets` · App Group `group.com.widgetrather.app`.
- **Why it needs a signature rather than being a detail:** the bundle identifier is permanent once the app is on the App Store — it is how Apple identifies the app forever. It is also normally derived from a domain we own, and **Noah has not registered the domain yet** (ROADMAP 3.2, still open). Changing it today is one line; changing it after launch is not possible.
- **What Noah is being asked:** confirm these values, or name different ones once the domain is settled. Pass 1 runs either way — nothing outside `app/app.json` depends on it.
