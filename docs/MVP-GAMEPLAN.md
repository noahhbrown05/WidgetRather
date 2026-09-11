# MVP Game Plan

> **Roles revised 2026-09-11 (D-017):** Greg = back end. **Noah = the main front end + design + everything else. Every task below listed for Tiago (T1–T9) now belongs to Noah.** Tiago = advisor, only when Noah + Greg ask. Decisions need Noah + Greg.

_Proposed 2026-09-10 (Noah's session), decision D-012 (revised the same day: Greg = backend, Noah + Tiago = front end + everything else). Builds on the MVP scope (D-008) and stack (D-005). **No timeline** (Noah, 2026-09-10). For the full ordered path from here to launch and beyond, see `docs/ROADMAP.md`; this file keeps the task IDs and owners._

## The MVP (from D-008)
The question **drops at a random time each morning before school (same moment per time zone)** → sign in → join a friend group → **answer from the home-screen widget** → see your group's % split → react with emoji. Plus the App Store must-haves: age gate, report/block, account deletion, privacy policy.

## Roles

| | Claude plan | Owns |
|---|---|---|
| **Greg** | Max | **Backend + builds.** Supabase database, security rules (RLS), server functions, push notifications, the data layer the app calls, the widget → backend connection, all native/EAS builds, and the tech spike. |
| **Noah** | Pro | **Front end:** onboarding, sign-in, age gate, groups, settings/safety screens, analytics calls. **Misc:** accounts, policies, waitlist page, beta program, App Store listing. |
| **Tiago** | Pro | **Front end:** design system, today's question, results, reactions, widget look & states. **Misc:** all designs, brand, question bank, App Store screenshot designs. |

**Why this works on Pro:** once a dev build is on your iPhone, it connects to a dev server on your own Windows PC, and **JS/TypeScript changes show up without a rebuild.** A new native build is needed only when a native library or the app config changes ([Expo docs](https://docs.expo.dev/develop/development-builds/introduction/)). Screen work is small, visual, and iterative, which fits short sessions.

**The honest risk:** Max is sold as 5x or 20x Pro's usage, and exact quotas aren't published ([Morph](https://www.morphllm.com/claude-code-usage-limits), [CC for Everyone](https://ccforeveryone.com/guides/claude-code-limits-and-pricing)). Front-end coding on Pro *will* hit limits. The mitigations are below. If one of you is consistently blocked, Greg picks up the overflow.

### How to stretch Pro for front-end work
- **One screen per session.** Start fresh for the next one; long chats burn more.
- Build the Raroque way: **UI with dummy data first** (`Q13QOgwoF0E @ 01:02`). Hook up real data by calling Greg's functions (see "The contract" below).
- **2–3 changes per prompt** and **paste a screenshot of the design** (`Q13QOgwoF0E @ 03:08–04:10`).
- If it fails twice, revert and re-prompt more specifically instead of arguing with it (`cXIWx1eYA9w @ 07:14`).
- Model choice affects the burn rate ([CC for Everyone](https://ccforeveryone.com/guides/claude-code-limits-and-pricing)). Try a lighter model for simple UI tweaks and save the strongest model for tricky bugs.
- Hit your limit? Switch to a non-Claude task (designs, questions, App Store Connect, testing).

## The contract between back end and front end
This keeps the three of you out of each other's way:
1. **Greg generates TypeScript types from the database** (`npx supabase gen types typescript …`), so front-end code knows exactly what data looks like ([Supabase docs](https://supabase.com/docs/guides/api/rest/generating-types)).
2. **Greg writes a small data layer**: plain functions like `getTodaysQuestion()`, `submitAnswer()`, `getGroupResults()`, `joinGroup(code)`, `reportUser()`. **Front-end screens only call these functions** and never write database queries themselves.
3. Greg posts the function list (name, inputs, what it returns) in a doc or PR description before Noah and Tiago hook up real data. Until then, the screens use dummy data with the same shape.
4. **Folder ownership** (exact names set when the project is scaffolded): Greg owns the backend/Supabase folder and the data-layer folder. Noah and Tiago own screens, components, and theme, and split the screens by the task list below. Two people rarely edit the same file.
5. **Native builds go through Greg.** The Expo free plan includes **15 iOS builds/month** in a low-priority queue ([Expo pricing](https://expo.dev/pricing)). If you add a library that needs native code, tell Greg and he batches it into the next build.

## Critical path

_Updated 2026-09-10: the Apple account no longer blocks the start. See `research/testing-without-apple-account.md` (D-013)._

```
Greg: scaffold Expo app + EAS iOS SIMULATOR build (no Apple account needed)
   ├─► Greg: TECH SPIKE in a simulator (cloud Mac, ~$1/hr, or Appetize in a browser)
   │      ├─ PASS → build as planned
   │      └─ FAIL → fallback: widget shows the question; tap opens the app to answer
   └─► Noah + Tiago: build screens, testing in web browser / Android emulator / Expo Go
Tiago: designs + question bank ─► everyone builds from them
Apple Developer account ($99/yr, holder 18+) ─► needed later: real-iPhone builds, TestFlight beta, App Store
```

---

## Phase 0: Lift the gate (now)
| # | Task | Owner |
|---|---|---|
| 0.1 | Invite Tiago & Greg as repo collaborators | Noah |
| 0.2 | Everyone reads STATUS → DECISIONS → this plan and signs off on D-004–D-012 (or pushes back) | All |
| 0.3 | Decide who holds the Apple Developer account (legal age, 18+ in most places) ([Apple](https://developer.apple.com/programs/enroll/)) | All |

## Phase 1: Foundations
| # | Task | Owner | Claude load |
|---|---|---|---|
| N1 | Enroll in Apple Developer ($99/yr); add Greg & Tiago in App Store Connect. **Can wait until the MVP works in a simulator** (D-013), but it's needed before Phase 4 beta | Noah / holder | None |
| N1b | 1-minute check: install **Expo Go** from the App Store on your iPhone and confirm it supports **SDK 57** (if yes, it's free screen testing on real iPhones) | Noah, Tiago | None |
| N2 | Create team accounts and **invite** the others (never share passwords): Expo org (free plan supports teams, [Expo pricing](https://expo.dev/pricing)), Supabase, PostHog, Sentry | Noah | None |
| N3 | Set up Node + Expo tooling on your PC; install the dev build on your iPhone once Greg has one | Noah, Tiago | Light |
| G1 | Scaffold the Expo app (TypeScript) + EAS config; an **iOS simulator build** (`"simulator": true`, no Apple account needed, [Expo docs](https://docs.expo.dev/build-reference/simulators/)). Real-iPhone dev builds come later, once the Apple account exists (they need registered devices, [Expo docs](https://docs.expo.dev/tutorial/eas/ios-development-build-for-devices/)) | Greg | Heavy |
| G2 | **Tech spike, in a simulator** (cloud Mac via MacinCloud ~$1/hr, or Appetize): `expo-widgets` widget with 2 buttons → answer saved to Supabase → widget updates. Also find out: **do widget changes need a native rebuild?** (UNVERIFIED; it decides how Tiago iterates on the widget) | Greg | Heavy |
| G3 | Supabase schema + **RLS from day 1**: profiles, groups, memberships, questions, answers, reactions, reports, blocks. Never store fields users mustn't edit where users can write (Raroque `tK4NQtzfZbM @ 03:05`) | Greg | Heavy |
| T1 | **Design system + all screen designs:** colors, type, buttons, cards; onboarding, age gate, create/join group, today's question, results, reactions, settings. Study real apps first (Raroque uses Mobbin, `oNRrjbKiF04 @ 05:15`) | Tiago | Light |
| T2 | **Widget design:** small + medium + lock-screen; states: unanswered, answered + results, logged out, no group, offline. Tiny image assets (~2MB crashed Raroque's widget, `9sHd-VWssxw @ 02:04`) | Tiago | Light |
| T3 | **Question bank v1:** 60+ questions (about 2 months). Rules: 13+ appropriate, hypotheticals only, never about real people (D-004). CSV for Greg to import. Noah can write half | Tiago (+Noah) | Light |

## Phase 2: Core build
One PR per screen/feature. Screens start with dummy data, then switch to Greg's functions once they exist.

| # | Task | Owner | Claude load |
|---|---|---|---|
| G4 | Auth backend: Sign in with Apple via Supabase `signInWithIdToken` ([Supabase docs](https://supabase.com/docs/guides/auth/social-login/auth-apple)); profile + age stored server-side | Greg | Heavy |
| G5 | Data layer + generated types (the contract above): questions, answers, results %, groups, invites, reactions | Greg | Heavy |
| G6 | Question of the day: import Tiago's CSV; serve today's question; **random morning drop scheduler** (one random time per time zone per day, inside the agreed window; the question stays hidden until then) | Greg | Heavy |
| G7 | Widget ↔ backend: answer from the widget, refresh results, logged-out handling | Greg | Heavy |
| T4 | Theme + shared components (buttons, cards, emoji bar) in code. **Do this first**, since Noah's screens use it | Tiago | Medium |
| T5 | Screens: **today's question → results → reactions** (the core loop) | Tiago | Medium |
| T6 | Widget UI: build the look & states from T2 on top of Greg's spike | Tiago | Medium |
| N4 | Screens: **onboarding → Sign in with Apple button → neutral age gate (13+) → display name** | Noah | Medium |
| N5 | Screens: **create group, invite code/link, join group, leave group** | Noah | Medium |
| N6 | Privacy policy + terms + community guidelines (who handles reports, how fast; Apple requires "timely responses"); needed in the app *and* the listing ([Guideline 5.1.1](https://developer.apple.com/app-store/review/guidelines/)) | Noah | Light |
| N7 | **Waitlist page** (Raroque: Framer + one screenshot + email capture, `MnF-zJhyUtE @ 00:00`), using Tiago's brand | Noah | Light |
| T7 | Brand: app icon, name treatment, maybe a widget character (Raroque's Duolingo-style widget, `m5cRcii3pec @ 06:17`) | Tiago | Light |

## Phase 3: Safety, polish, App Store must-haves
| # | Task | Owner | Claude load |
|---|---|---|---|
| N8 | Settings screen: **report user, block user, delete account** (required, [Guideline 1.2](https://developer.apple.com/app-store/review/guidelines/), [5.1.1(v)](https://developer.apple.com/app-store/review/guidelines/)), links to policy/terms | Noah | Medium |
| G8 | Backend for report/block/delete; profanity filter on display and group names | Greg | Medium |
| G9 | Push notification at each time zone's random drop moment + WidgetKit push to reload the widget ([Apple docs](https://developer.apple.com/documentation/WidgetKit/Updating-widgets-with-widgetkit-push-notifications)) | Greg | Heavy |
| N9 | Analytics: define events (signup, joined group, answered, reacted, widget added) + the **week-1 retention** dashboard (Raroque's north star, `cXIWx1eYA9w @ 12:28`); add the event calls in the screens | Noah (+Greg sets up PostHog/Sentry) | Light |
| G10 | **Security pass:** attack our own RLS with specific scenarios ("can I read another group's answers?", "can I change someone's reaction?") + backend rate limits (Raroque `tK4NQtzfZbM @ 04:08, 07:17`) | Greg | Heavy |
| T8 | Polish pass: animations, empty states, loading states, dark mode | Tiago | Medium |
| All | QA: use every build in real life (Raroque `oNRrjbKiF04 @ 07:20`); file bugs as GitHub Issues | All | None |

## Phase 4: Beta
| # | Task | Owner |
|---|---|---|
| G11 | TestFlight builds via EAS Build + Submit | Greg |
| N10 | Recruit beta testers (friends, 13+). External TestFlight testing needs Apple's beta review; Raroque saw about 24h (`9sHd-VWssxw @ 03:06`) | Noah |
| N11 | Feedback channel: a feedback board (Canny/UserJot) or a simple form (Raroque `MnF-zJhyUtE @ 02:04`) | Noah |
| All | Watch week-1 retention; fix the top friction points | All |

## Phase 5: App Store submission
| # | Task | Owner |
|---|---|---|
| T9 | App Store screenshot designs (Raroque spends 3–4 days, `MnF-zJhyUtE @ 06:12`) | Tiago |
| N12 | Listing: name, subtitle, description, keywords, age rating, privacy details, policy URL, **demo account for App Review** ([Guideline 2.1](https://developer.apple.com/app-store/review/guidelines/)) | Noah |
| N13 | Lawyer review of the age gate + privacy policy before public launch (D-007) | Noah |
| G12 | Production build + submit | Greg |

---

## Reviews
- **Front-end PRs (Noah's / Tiago's):** Greg reviews. He has the most Claude capacity and knows the data layer. The other front-end person checks it against the designs.
- **Backend PRs (Greg's):** Noah or Tiago do a light read with Claude ("explain what this PR changes and anything risky"), one PR per session.

## Weekly rhythm
- **Greg:** long backend sessions; one PR per feature; announces new data-layer functions and upcoming native builds.
- **Noah & Tiago:** short focused sessions (one screen or task each), plus non-Claude work.
- **All:** a 15-minute weekly check-in using `STATUS.md` → "Waiting on"; tasks tracked as GitHub Issues.
- **Everyone ends each session with "log this session."**
