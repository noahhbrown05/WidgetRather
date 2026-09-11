# MVP Spec: Widget Rather (draft v1)

_ROADMAP step 1.1. Drafted 2026-09-11 from Noah's answers in his session. **Status: DRAFT, needs Tiago and Greg.** Items marked **[proposed default]** are Claude's recommendations Noah didn't explicitly choose; items marked **[OPEN]** need a team decision. This draft **changes D-008's scope** (see "Impact" at the end)._

---

## 1. What the MVP is
A daily "Would you rather?" that **drops at a random morning moment**, lives on your **home-screen widget**, and turns your answer into something to talk about with your **friend groups** and **communities**.

**Goal:** a learning project. Prove the three of us can build, ship, and grow it (D-001).

## 2. Who it's for
- **Anyone 13+** (D-007); the core audience is middle school → high school → university.
- **Neutral age gate** at signup (asks everyone their birthday, hints at no right answer) + Apple's Declared Age Range API where it applies (D-007).
- **Adults and teens can share invite-only groups** (Noah: yes, invite-only). For public communities, see §9.

## 3. The core loop
1. The question drops at a random morning moment (same moment for everyone in a time zone).
2. The widget flips from yesterday's results to today's question.
3. You tap an answer on the widget (or in the app).
4. The results unlock: your groups' split, plus the insights (§5).
5. You react to friends' picks and talk about it at school.

## 4. The daily question: rules
| Rule | Decision |
|---|---|
| Source | Written by us; question bank v1 = 60+ (ROADMAP 1.2). Hypotheticals only, never about real people (D-004) |
| Drop time | Random, **once per time zone per day**, inside a morning window before school. **[OPEN]** exact window; team decides |
| Hidden until drop | Nobody (including the widget) can see today's question before its drop moment |
| How long it's open | **Until the next drop** (~24h) (Noah) |
| Late answers | Allowed any time before it closes **[proposed default]**; no "late" badge **[proposed default]** |
| Changing your answer | Not allowed; your first tap locks in **[proposed default]**; keeps results honest |
| One answer everywhere | You answer **once**; that answer counts in every group and community you're in **[proposed default]** |
| Results visibility | **Hidden until you vote** (Noah); voting unlocks everything |
| Joining mid-day | You see today's open question right away **[proposed default]** |
| App Review | A review/demo account always has a question available and a group with results, since reviewers won't be there at the morning drop (ROADMAP 8.4) |

## 5. Results and insights (the creative "Everyone" angle)
Noah asked for something more interesting than a plain global %. The MVP ships three **insights**, each turning a number into a talking point:

| Insight | What you see | How it works **[proposed default thresholds]** |
|---|---|---|
| **Rare pick** | "Only 18% picked this. You're rare." / "You're with 71% of people." | Compares your pick to everyone who answered. ≤25% → "rare"; ≥75% → "with the crowd"; otherwise "Split: 54/46" |
| **Your twin** | "You and Maya agree the most: 8 of the last 10." | The person in your groups whose picks matched yours most over the last 14 questions you both answered; needs at least 5 shared answers. Ties → the most recent match |
| **Split meter** | "Today split the world 51/49, the most divisive question this week." | How close everyone's answers are to 50/50. "Most divisive this week" = the closest to 50/50 of the last 7 questions |

- Plus the basics: **your group's % split** and **who picked what** in friend groups (non-anonymous, D-004), shown only after you vote.
- In communities, the insights are community-flavoured: "Your community is way more Read minds than everyone else."

## 6. Groups and communities
You can be in **several** groups and communities. The widget shows the one you choose (see §7).

| | **Friend group** | **Community** |
|---|---|---|
| What it is | Your people | School-wide, university, fan groups, interest groups |
| How you join | Invite code / link only | **Public: browse or search** and join (Noah: in the MVP) |
| Size | **No cap** (Noah) | **No cap** |
| Who's visible | Names + who picked what (after you vote) | **[OPEN]** see §9: recommend totals and insights only, no member list |
| Reactions | Emoji on each friend's pick | **[OPEN]** see §9 |
| Removing people | **Creator + moderators** can remove members; anyone can leave (Noah) | Same |
| Moderators | The creator can appoint moderators (Noah) | Same |
| Name / description | Filtered for profanity; reportable | Same |

## 7. The widget (all three sizes, Noah)
**Every size needs every state:** before the drop (yesterday's results), unanswered, answered, logged out, no group yet, offline, and a gallery preview (Raroque `m5cRcii3pec @ 02:06`, `9sHd-VWssxw @ 01:02`). Images must be tiny (`9sHd-VWssxw @ 02:04`).

| Size | Before drop | Unanswered | Answered |
|---|---|---|---|
| **Small** | Yesterday's split + "New question this morning" | Question + 2 buttons | Your pick + group % |
| **Medium** | Yesterday's split + your twin | Question + 2 buttons (mockup 01) | Your pick + group % + one insight line (mockup 01) |
| **Large** | Yesterday's split + twin + rare-pick recap | Question + 2 buttons | Your pick, group %, all insights, twin avatars (mockup 02) |
| **Lock screen** | Display only: "New question soon" / the question / "Answered ✓". Buttons don't work while locked, so a tap opens the app (`research/tech-stack.md`) |||

- **Pick which group the widget shows** via "Edit widget", like Raroque's Ellie list picker (`m5cRcii3pec @ 01:03`, `avJ_gimBPHs @ 04:16`). Default = your first friend group.
- **Unproven:** answering straight from the widget without opening the app is the G2 spike. If it fails, tapping an answer opens the app with it preselected.

## 8. Reactions and profiles
- **Reactions:** a fixed set of about 6 emoji on **each friend's pick** (Noah). No free text anywhere in the MVP, so there's nothing typed to moderate.
- **Profiles:** display name + **emoji/colour avatar**; **no photos** in the MVP (Noah).
- **No DMs, no chat, no comments** in the MVP.

## 9. Safety and moderation
**What users can create in the MVP:** display names, group/community names and descriptions, emoji reactions, and picks. That's all.

| Area | MVP rule |
|---|---|
| Report | Report a person, a group/community, or a name/description (Apple Guideline 1.2) |
| Block | Block a person: they disappear from your groups' lists and reactions |
| Leave / remove | Anyone can leave; creators + moderators can remove |
| Filter | Profanity filter on all names and descriptions (1.2) |
| Who answers reports | **[proposed default]** Noah (owns policies, N6). Apple requires "timely responses" |
| Contact | A published support email (1.2) |
| Delete account | In the app (5.1.1(v)) |

**[OPEN] Public communities with strangers of all ages: the biggest safety call in this spec.** Noah chose public communities in the MVP and mixed ages in invite-only groups. Strangers meeting in public communities is the scenario that platforms like Discord and Instagram now lock down for teens by default: no stranger contact, age-gated spaces ([Childhelp](https://childhelp.org/the-latest-apps-parents-should-know-about-a-2026-guide-to-kids-online-safety/), [NTIA](https://www.ntia.gov/report/2024/kids-online-health-and-safety/online-health-and-safety-for-children-and-youth/taskforce-guidance/recommended-practices-for-industry)). Options for the team:
- **A (recommended): communities show totals only.** In a public community you see the split, the insights, and the member count, but **no member list, no individual picks, no reactions**. Strangers never see each other, so mixed ages carry little risk. Names and reactions stay inside invite-only friend groups.
- **B: age-banded communities.** Under-18s only see and join teen communities; adults only adult ones. Needs reliable age info.
- **C: fully social communities.** Member lists, picks, and reactions visible to strangers. Needs real moderation staffing before launch.

## 10. Legal flags (research, not legal advice; lawyer review before public launch, ROADMAP 8.5)
- **Apple:** apps with social media capabilities get at least a 13+ rating; the question is required from Sept 2026 ([Apple](https://developer.apple.com/news/?id=tlur8uvi)). Public communities make "yes" certain.
- **COPPA:** the 13+ floor avoids the under-13 regime (D-007).
- **Florida HB 3:** bans under-14 accounts and requires parental consent for 14–15, **only for platforms meeting all four criteria**, including algorithmic content selection and "addictive" features such as push notifications ([Hunton](https://www.hunton.com/privacy-and-cybersecurity-law-blog/florida-enacts-legislation-restriction-social-media-accounts-for-minors), [Florida Senate](https://www.flsenate.gov/Session/Bill/2024/3)). We plan push notifications; we have **no algorithmic feed**. Keep it that way, and ask the lawyer.
- **Texas SCOPE Act:** targets platforms for social interaction with public/semi-public profiles; small-business exemption; parts blocked in court ([Texas AG](https://www.texasattorneygeneral.gov/consumer-protection/file-consumer-complaint/consumer-privacy-rights/securing-children-online-through-parental-empowerment), [Kelley Drye](https://www.kelleydrye.com/viewpoints/blogs/ad-law-access/the-scope-act-in-focus-what-you-should-know-about-texass-partially-blocked-youth-privacy-statute)). Public communities with profiles move us closer. Ask the lawyer.

## 11. Notifications
- **The daily drop**, and that's all in the MVP **[proposed default]**.

## 12. Onboarding flow
Sign in with Apple → birthday (neutral gate) → display name + emoji avatar → **join with a code / create a group / browse communities** → "Add the widget" guide → today's question.

## 13. Screen list (for Tiago's designs and the front-end split)
| Screen | Front end |
|---|---|
| Sign in · Birthday · Name + avatar | Noah |
| Join / create group · Invite (code + share) | Noah |
| Browse + search communities · Create community | Noah |
| Today: unanswered · Today: answered (split + insights) | Tiago |
| Group detail (who picked what, reactions) · Community detail (per §9 choice) | Tiago |
| Widget: all 3 sizes × all states + lock screen | Tiago |
| You: settings, blocked people, policies, delete account | Noah |
| Report sheet · Moderator tools (remove, appoint mods, edit name) | Noah |
| "Add the widget" guide | Tiago |

## 14. Not in the MVP
- **Duo mode** (pairs for couples, best friends, siblings; anyone 13+) → **the first thing after launch**. Plan: a 2-person group with an "in sync" score + a streak of matching picks, answer-then-talk. Couples apps prove the ritual: Paired ~100K daily couples, Candle ~50% DAU/MAU with widgets ([Paired](https://www.paired.com/), [Candle](https://apps.apple.com/us/app/candle-couples-relationship/id6743355635)).
- Chat, comments, threads · photos · user-submitted questions · Android · AI-generated questions.

## 15. Impact on D-008 (honest note)
This draft adds **all three widget sizes, public communities with moderators, multiple memberships, and three insights** to the MVP that D-008 originally scoped (one group, medium-leaning, no communities). It's Noah's call to make, but it's a real increase in build and moderation work, so **D-008 goes back to PROPOSED and needs all three sign-offs again.**

## 16. Open questions for the team
1. Morning drop window (exact hours).
2. Public communities: option A, B, or C (§9).
3. Confirm or change the [proposed defaults] (answer lock-in, one answer everywhere, insight thresholds, drop-only notifications, Noah answers reports).
