# Backend read on the revised MVP spec (D-008)

_Written 2026-09-14 by Greg's session, before signing the revised D-008. What `docs/MVP-SPEC.md` costs on the back end, and the one finding that changes the product. Rule 1: everything here is from official docs or cited sources; engineering estimates are labelled as estimates._

---

## 0. The headline: the G2 bet is already answered, and the answer is "no"

D-005 called this "the biggest technical unknown": **can an `expo-widgets` button submit an answer to Supabase without opening the app?** We planned to settle it with a coding spike. The official Expo SDK 57 docs settle it without one.

Code inside a `'widget'`-marked component:

> "cannot perform asynchronous work, import other modules, or access your app's runtime or in-memory state" ([Expo SDK 57 widgets docs](https://docs.expo.dev/versions/v57.0.0/sdk/widgets/))

And what a button tap actually does:

> "The value a button's `onPress` callback returns becomes the widget's new props. The runtime persists it and reloads the widget on device, with no running app process required." ([same](https://docs.expo.dev/versions/v57.0.0/sdk/widgets/))

The one hook that tells the app a tap happened is explicitly not a sync mechanism:

> "Unlike `onPress`, it only fires while the app process is alive, so use it to mirror interactions into app state, **not as the widget's update mechanism**." ([same](https://docs.expo.dev/versions/v57.0.0/sdk/widgets/))

There is **no documented path from a widget tap to a server** in `expo-widgets`. No async, no fetch, no imports.

**So: a tap on the widget is a local write.** It changes the widget's own props on the device and nothing else. The answer reaches Supabase only when the app process next runs.

### This is not fatal, but it is load-bearing

The spec's core loop (§3) is: tap the widget → "the results unlock". That loop, as written, assumes the tap reaches the server and comes back with the group's split. It can't, not on this stack.

What still works fine: the widget shows the question, you tap, the widget instantly flips to "answered" and shows **whatever numbers were last pushed to it**. That's a genuinely good experience — it's how the widget feels instant. But the numbers are as of the last push, not as of your tap, and your vote is sitting on the phone until the app opens.

### The escape hatch, and why it isn't free

You *can* write a real native Swift widget extension with App Intents inside an Expo project, and build it on EAS from Windows — `@bacons/apple-targets` generates native Apple targets, and EAS Build supports app extensions through config plugins ([expo-apple-targets](https://github.com/EvanBacon/expo-apple-targets), [Expo: iOS App Extensions](https://docs.expo.dev/build-reference/app-extensions/)). An `AppIntent`'s `perform()` does support `async`, so a native widget button *can* in principle make a network call.

But **[UNVERIFIED — developer-forum reports, not Apple documentation]** background network from a widget extension is reported to be unreliable: developers report API calls failing over cellular when the app is not running, while succeeding over Wi-Fi ([Apple Developer Forums 737162](https://developer.apple.com/forums/thread/737162)). Confirming this properly needs a device test, which needs the $99 account (D-013).

And it means writing and debugging Swift, on a team with no Mac, as the first thing we build.

### What I'd actually do

**Design the backend for votes that arrive late and out of order, regardless of which path wins.** That assumption is correct on both paths and costs nothing to adopt now:

- The widget tap writes a **pending vote** locally (timestamp + question id + choice).
- The app flushes pending votes on next launch / background refresh.
- The server accepts a vote with a **client-claimed timestamp**, validates it falls inside that question's open window, and **rejects duplicates** (first write wins, which the spec already wants: "your first tap locks in").
- Tallies are recomputed as votes land. Numbers move for a while after the drop. That's fine and normal.

This also quietly answers a spec question nobody asked: **a vote cast on the widget while offline is the normal case, not an edge case.**

**Recommendation: G2 stops being a "can we?" spike and becomes a "how late are votes?" measurement.** The real number we need is the median delay between widget tap and app open, because that's how stale the numbers are.

---

## 1. The three insights (§5)

| Insight | Cost | Notes |
|---|---|---|
| **Rare pick** | Cheap | One global tally per question per option. A counter. |
| **Split meter** | Cheap | Same tally; "most divisive this week" compares 7 numbers. |
| **Your twin** | **Expensive, and unbounded** | See below |

**Your twin** is the only one that's hard, and it's hard because of an interaction the spec doesn't flag.

The rule is "the person **in your groups** whose picks matched yours most over the last 14 questions you both answered." Cost per user scales with *how many people are in their groups*. And §6 sets **no size cap on friend groups and no size cap on communities.**

[ESTIMATE, not a measured number] If "your groups" includes a public school community of 2,000, that's ~2,000 pairwise comparisons per user per day; across 2,000 users that's ~4M comparisons a day for one insight. If twin is scoped to friend groups only and those are realistically 5–30 people, it's a small per-group SQL aggregate and a non-issue.

**This is the strongest argument for §9 Option A, and it's a back-end argument rather than a safety one:** if communities show totals only, "your twin" is naturally scoped to friend groups, and the blow-up never happens. Option C makes the twin calculation a scaling problem on day one.

**Regardless of §9: put a size cap on friend groups.** "No cap" (Noah, §6) is a decision with a cost attached — it hits the twin calculation, the "who picked what" member list, and the reaction fan-out. A cap of something like 50 costs the product nothing real and removes a whole class of problem.

---

## 2. The simultaneous drop is a thundering herd

§4 says the question drops at the **same moment for everyone in a time zone**. That's great product design and it is, precisely, a synchronised traffic spike: every client in the zone wakes at once and asks for the same thing.

Supabase's Free plan includes **200 peak Realtime connections** and Pro includes 500 ([Supabase pricing](https://supabase.com/pricing)). A US-Eastern drop with more than a couple hundred people online at that second exceeds the free ceiling by design, not by accident.

Mitigations, all cheap if designed in now and annoying to retrofit:
- Don't use Realtime subscriptions for the drop. Push the question **to** the device (APNs → widget reload) rather than having every device pull.
- Serve results from **precomputed aggregates**, not live `COUNT(*)` over the votes table.
- Jitter client fetches by a few seconds.

Scheduling the drop itself is a solved problem: `pg_cron` ships enabled on every Supabase project including Free, and with `pg_net` it can invoke an Edge Function on a schedule ([Supabase: Scheduling Edge Functions](https://supabase.com/docs/guides/functions/schedule-functions), [Supabase Cron](https://supabase.com/modules/cron)).

**The widget reload budget is not a problem.** iOS gives widgets a limited daily reload budget — commonly cited as ~40–70 timeline reloads, with a separate limit of 72 manual/push refreshes per day ([Swift Senpai](https://swiftsenpai.com/development/refreshing-widget/), [Apple Developer Forums 711091](https://developer.apple.com/forums/thread/711091)). We need roughly **two pushes a day** (the drop, and maybe a results settle). We are nowhere near the ceiling. WidgetKit push reloads also draw on a budget separate from silent background pushes ([Apple: Updating widgets with WidgetKit push notifications](https://developer.apple.com/documentation/WidgetKit/Updating-widgets-with-widgetkit-push-notifications)).

---

## 3. Three widget sizes (§7)

`expo-widgets` supports all the families we need — `systemSmall`, `systemMedium`, `systemLarge`, plus the `accessory*` lock-screen families ([Expo SDK 57 widgets docs](https://docs.expo.dev/versions/v57.0.0/sdk/widgets/)).

Back-end cost of three sizes: **near zero.** They're three layouts over the same payload. This is front-end work (Noah, D-017), and the spec's own table (§7) is honest that it's 3 sizes × 7 states = ~21 layouts to build and keep in sync.

One back-end note: the payload has to carry enough for the *large* widget (your pick, group %, all insights, twin avatars) even when the user has the small one installed, unless we want per-size payloads. Recommend **one payload, all sizes render a subset.** Simpler, and the push is tiny either way.

---

## 4. Public communities (§9) — the real cost is not code

Apple requires, for any app with user-generated content ([App Store Review Guidelines 1.2](https://developer.apple.com/app-store/review/guidelines/)):

> - A method for filtering objectionable material from being posted to the app
> - A mechanism to report offensive content and timely responses to concerns
> - The ability to block abusive users from the service
> - Published contact information so users can easily reach you

The spec already plans all four (§9). Good. The question is what "timely responses" costs us, and that's a **staffing** cost, not a build cost — it's a person checking a queue, every day, forever, and the spec currently assigns that to Noah by [proposed default].

What each §9 option actually costs the back end:

| Option | Build | Ongoing moderation | Twin calc |
|---|---|---|---|
| **A — totals only** | Small: tallies per community, no member lists, no reaction fan-out to strangers | Names + descriptions only | Stays inside friend groups. Bounded |
| **B — age-banded** | Medium, plus a **hard dependency on reliable age data** we don't have | Same as A, plus the consequences of getting a band wrong | Bounded, but banding logic touches every query |
| **C — fully social** | Large: member lists, per-member picks, reactions between strangers, at unbounded community size | Real queue, real staffing, before launch | Unbounded. The 4M-comparison case |

**I'm signing on for Option A**, and my reasoning is the same as the spec's §9 recommendation arrived at from a different direction: A is the cheapest to build, the cheapest to moderate, the only one that keeps the twin calculation bounded, and the only one where a stranger never sees another user at all. Under A, the risk surface of "public community full of mixed-age strangers" mostly stops existing, because there are no strangers to see.

Option B is worse than it looks: it needs age data we've already decided we can't verify (D-007 — the FTC says a self-declared checkbox doesn't count, [FTC COPPA FAQ](https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions)). Banding on unverified ages is a policy that reads well and enforces nothing.

---

## 5. Supabase headroom: not a constraint for this project

Free plan: 500 MB database, 50,000 monthly active users, 5 GB egress, 500,000 Edge Function invocations, 2M Realtime messages, 200 peak Realtime connections, 2 active projects. Pro is from $25/month with 8 GB, 100,000 MAU, 250 GB egress, 500 Realtime connections ([Supabase pricing](https://supabase.com/pricing)).

[ESTIMATE] One vote row is on the order of tens of bytes. 1,000 users × 365 questions ≈ 365K rows — trivially inside 500 MB. **Storage and MAU will not be what stops us.** The two live constraints are the 200 peak Realtime connections (see §2) and, at scale, egress.

**One practical gotcha:** free projects are **paused after 1 week of inactivity** ([Supabase pricing](https://supabase.com/pricing)). Development is currently on hold (D-014), so whenever we do stand up a project, expect it to be asleep when we come back to it.

---

## 6. What this means for the sign-offs

- **D-005 (stack):** signing D-017 makes this `DECIDED`. Worth knowing first that `expo-widgets` **cannot** send a vote to the server from the widget. That doesn't kill the stack — the deferred-sync design works and the escape hatch exists — but the decision should be made with that on the table rather than as a surprise in week one.
- **D-008 (revised):** the scope increase is real but the expensive part isn't the one the spec flags. Three widget sizes are cheap on the back end. **Unbounded group/community size plus "your twin" is the expensive part**, and §9 Option A plus a friend-group size cap removes most of it.

**My position going into the ROADMAP 0.5 sync:** Option A, a size cap on friend groups, and the core loop reworded so it doesn't promise that tapping the widget produces live numbers.

---

## Sources
- [Expo SDK 57: Widgets](https://docs.expo.dev/versions/v57.0.0/sdk/widgets/) — widget runtime restrictions, `onPress` semantics, `addUserInteractionListener`, widget families, App Group `widgetsDirectory`
- [Expo: iOS App Extensions](https://docs.expo.dev/build-reference/app-extensions/) and [expo-apple-targets](https://github.com/EvanBacon/expo-apple-targets) — native widget targets via config plugin on EAS
- [Apple Developer Forums 737162](https://developer.apple.com/forums/thread/737162) — **[UNVERIFIED]** reports of background network failures from widget extensions
- [Apple: Updating widgets with WidgetKit push notifications](https://developer.apple.com/documentation/WidgetKit/Updating-widgets-with-widgetkit-push-notifications) — push-driven widget reloads
- [Swift Senpai: refreshing widgets](https://swiftsenpai.com/development/refreshing-widget/), [Apple Developer Forums 711091](https://developer.apple.com/forums/thread/711091) — reload budget figures
- [Supabase pricing](https://supabase.com/pricing) — Free and Pro plan limits, inactivity pause
- [Supabase: Scheduling Edge Functions](https://supabase.com/docs/guides/functions/schedule-functions), [Supabase Cron](https://supabase.com/modules/cron) — `pg_cron` + `pg_net` scheduling
- [App Store Review Guidelines 1.2](https://developer.apple.com/app-store/review/guidelines/) — UGC requirements
- [FTC COPPA FAQ](https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions) — age screening
