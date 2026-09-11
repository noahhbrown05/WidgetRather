# MVP Game Plan

_Proposed 2026-09-10 (Noah's session), decision D-012. Builds on the MVP scope (D-008) and stack (D-005). Timelines are **targets, not estimates we've verified**. Adjust after the tech spike._

## The MVP (from D-008)
Sign in → join a friend group → **answer today's question from the home-screen widget** → see your group's % split → react with emoji. Plus the App Store must-haves: age gate, report/block, account deletion, privacy policy.

## Roles: split by Claude capacity

| | Plan | Claude capacity | Role |
|---|---|---|---|
| **Greg** | Max | 5x or 20x Pro, depending on tier | **Lead engineer.** All app and backend code, long coding sessions, builds. The code runs on his desktop. |
| **Noah** | Pro | 1x | **Product & launch lead.** Accounts, decisions, policies, App Store listing, beta program, PR reviews. |
| **Tiago** | Pro | 1x | **Design & content lead.** Screens, widget design, question bank, waitlist page, QA testing, PR reviews. |

**Why this split:** Max is sold as 5x or 20x Pro's usage, under a rolling 5-hour window plus a weekly cap. How fast you burn it depends on conversation length, complexity, and model choice ([Morph](https://www.morphllm.com/claude-code-usage-limits), [TrueFoundry](https://www.truefoundry.com/blog/claude-code-limits-explained), [CC for Everyone](https://ccforeveryone.com/guides/claude-code-limits-and-pricing)). Long agentic coding sessions are the most expensive kind of work, so they go to Greg. Writing, designing, reviewing, and account setup are short, focused sessions that fit Pro.

**Tips for Pro users (Noah, Tiago):**
- One task per session; start a fresh session for the next task instead of one long chat.
- Give Claude the exact file to look at ("review `app/results.tsx` in PR #4"), not "look at the whole repo".
- Do non-Claude work (Figma, App Store Connect, writing questions) by hand or in short bursts.
- If you hit your limit, switch to the non-Claude tasks on your list and come back after the window resets.

## Critical path (what blocks what)

```
Noah: Apple Developer account ($99, holder 18+)
   └─► Greg: first dev build on a real iPhone (EAS cloud; no Mac, so no Simulator)
          └─► Greg: TECH SPIKE: widget button saves an answer to Supabase
                 ├─ PASS → build the MVP as planned
                 └─ FAIL → fallback: widget shows the question, tapping opens the app to answer
Tiago: question bank + designs ─► Greg: wires them in (build can start with dummy data)
```

**The Apple Developer account is the #1 blocker.** Without a Mac, we can't install test builds on iPhones until it exists ([Expo discussion](https://github.com/expo/expo/discussions/27489)).

---

## Phase 0: Lift the gate (now)
| # | Task | Owner | Claude? |
|---|---|---|---|
| 0.1 | Invite Tiago & Greg as repo collaborators | Noah | No |
| 0.2 | Everyone reads STATUS/DECISIONS/this plan and signs off (or pushes back on) D-004–D-012 | All | Light |
| 0.3 | Decide who holds the Apple Developer account (must be of legal age, 18+ in most places; minors can use a parent/guardian's account) ([Apple](https://developer.apple.com/programs/enroll/)) | All | No |

**Gate lifts** when D-005 (stack) and D-008 (MVP scope) have all three sign-offs.

## Phase 1: Foundations (target: week 1)
| # | Task | Owner | Claude? | Needs |
|---|---|---|---|---|
| N1 | Enroll in the Apple Developer Program ($99/yr); add Greg & Tiago in App Store Connect | Noah (or the 18+ holder) | No | 0.3 |
| N2 | Create team accounts and **invite** the others (never share passwords): Expo org, Supabase org, PostHog, Sentry | Noah | No | — |
| N3 | Turn on branch protection for `main` (PR + 1 approval), see `COLLABORATION.md` | Noah | No | — |
| G1 | Scaffold the Expo app (TypeScript) + EAS config; get a dev build onto Greg's, Noah's, and Tiago's iPhones (EAS ad hoc builds use registered devices, [Expo docs](https://docs.expo.dev/tutorial/eas/ios-development-build-for-devices/)) | Greg | **Heavy** | N1, N2 |
| G2 | **Tech spike:** `expo-widgets` widget with 2 buttons → answer saved to Supabase → widget updates. Write up pass/fail in a session log | Greg | **Heavy** | G1 |
| T1 | **Question bank v1:** 60+ would-you-rather questions (about 2 months of daily drops) in a spreadsheet/CSV. Rules: age-appropriate for 13+, hypotheticals only, never about real people (D-004), no brands/celebrities being mocked | Tiago | Light (brainstorm) | — |
| T2 | **Screen sketches:** onboarding + age gate, create/join group, today's question, results, reactions, settings (report/block/delete account). Look at how real apps do it first; Raroque studies references on Mobbin (`oNRrjbKiF04 @ 05:15`) | Tiago | Light | — |
| T3 | **Widget design:** small + medium home-screen sizes and a lock-screen version; states: unanswered, answered + results, logged out, no group, no internet. Keep images tiny (Raroque's widget crashed on ~2MB images, `9sHd-VWssxw @ 02:04`) | Tiago | Light | — |

## Phase 2: Core build (target: weeks 2–3)
Greg builds each feature Raroque's way: **UI with dummy data → data model → connect → polish** (`Q13QOgwoF0E @ 01:02`), in plan mode, one PR per feature.

| # | Task | Owner | Claude? | Needs |
|---|---|---|---|---|
| G3 | Supabase schema: profiles, groups, memberships, questions, answers, reactions, reports, blocks. **Row-level security from day 1**; never store fields users mustn't edit (moderation flags, limits) where users can write (Raroque `tK4NQtzfZbM @ 03:05`) | Greg | Heavy | G2 |
| G4 | Sign in with Apple via Supabase `signInWithIdToken` ([Supabase docs](https://supabase.com/docs/guides/auth/social-login/auth-apple)) + neutral age gate (13+) + display name | Greg | Heavy | G3 |
| G5 | Groups: create, invite code/link, join, leave | Greg | Heavy | G4 |
| G6 | Question of the day: import Tiago's CSV; serve today's question | Greg | Medium | T1, G3 |
| G7 | Widget, full version: today's question, A/B buttons, answered state with group %, all of Tiago's edge-case states, gallery previews | Greg | Heavy | G2, T3 |
| G8 | Results screen: group % split + who picked what (non-anonymous) | Greg | Medium | G5, G6 |
| G9 | Emoji reactions on the day's question | Greg | Medium | G8 |
| N4 | Write the **privacy policy, terms, and community guidelines** (what's reportable, who responds, how fast; Apple requires "timely responses"). Needed in the app *and* the listing ([Guideline 5.1.1](https://developer.apple.com/app-store/review/guidelines/)) | Noah | Light | — |
| N5 | Define analytics: an event list (signup, joined group, answered, reacted, widget added) + the **week-1 retention** dashboard in PostHog (Raroque's north star, `cXIWx1eYA9w @ 12:28`) | Noah (+Greg wires it) | Light | N2 |
| T4 | Brand basics: app icon, colors, fonts, maybe a widget character (Raroque's Duolingo-style widget, `m5cRcii3pec @ 06:17`) | Tiago | Light | — |
| T5 | **Waitlist page** (Raroque uses Framer + one screenshot + email capture, `MnF-zJhyUtE @ 00:00`); share with friends to test the pitch | Tiago | Light | T4 |
| N6/T6 | Review Greg's PRs: Noah checks it does what the plan says, Tiago checks it matches the designs. Ask your Claude to review one PR per session | Noah, Tiago | Light | — |

## Phase 3: Safety, polish, and App Store must-haves (target: week 4)
| # | Task | Owner | Claude? |
|---|---|---|---|
| G10 | Report + block; profanity filter on display and group names ([Guideline 1.2](https://developer.apple.com/app-store/review/guidelines/)) | Greg | Medium |
| G11 | **In-app account deletion** (required when an app has accounts, [Guideline 5.1.1(v)](https://developer.apple.com/app-store/review/guidelines/)) | Greg | Medium |
| G12 | Daily push notification when the question drops + widget refresh | Greg | Heavy |
| G13 | PostHog events (from N5) + Sentry crash reporting | Greg | Medium |
| G14 | **Security pass:** ask Claude to attack our own RLS with specific scenarios ("can a user read another group's answers?", "can a user edit someone else's reaction?"), plus backend rate limits (Raroque `tK4NQtzfZbM @ 04:08, 07:17`) | Greg (+Noah reviews) | Heavy |
| T7 | QA: use every build in real life, not just tap-through (Raroque `oNRrjbKiF04 @ 07:20`); file each bug as a GitHub Issue | Tiago (+Noah) | No |

## Phase 4: Beta (target: week 5)
| # | Task | Owner |
|---|---|---|
| G15 | TestFlight builds via EAS Build + Submit | Greg |
| N7 | Recruit beta testers (friends, 13+). External TestFlight testing needs Apple's beta review; Raroque saw about 24h (`9sHd-VWssxw @ 03:06`) | Noah |
| N8 | Feedback channel: a feedback board (Canny/UserJot) or a simple form (Raroque `MnF-zJhyUtE @ 02:04`) | Noah |
| All | Watch week-1 retention; fix the top friction points | All |

## Phase 5: App Store submission (target: week 6)
| # | Task | Owner |
|---|---|---|
| T8 | App Store screenshots (Raroque spends 3–4 days on these, `MnF-zJhyUtE @ 06:12`) | Tiago (+Noah) |
| N9 | Listing: name, subtitle, description, keywords, age-rating questionnaire, privacy details, privacy policy URL, **demo account for App Review** ([Guideline 2.1](https://developer.apple.com/app-store/review/guidelines/)) | Noah |
| N10 | Lawyer review of the age gate + privacy policy before public launch (D-007) | Noah |
| G16 | Production build + submit | Greg |

---

## Weekly rhythm
- **Greg:** codes in long sessions; opens one PR per feature; ends each session with "log this session".
- **Noah & Tiago:** 2–4 short Claude sessions a week for their tasks + PR reviews; the rest is hands-on work (designs, questions, accounts, testing).
- **All:** a 15-minute check-in each week, going down `STATUS.md` → "Waiting on".
- **Tasks live as GitHub Issues** (one per row above, labeled by phase, assigned to the owner).
