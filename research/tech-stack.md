# Tech Stack Research

_First pass: 2026-09-10 (Noah's session). Nothing here is decided. See `docs/DECISIONS.md` D-005._

## What the product needs technically
1. A **home-screen widget** where you can answer (tap A or B) without opening the app.
2. A **lock-screen widget** showing the question.
3. **Timed question drops** that update the widget (daily and/or at random times).
4. Accounts, friend groups/communities, result stats ("62% of your group chose A"), emoji reactions, threads.
5. Push notifications.
6. Moderation tools: filter, report, block (required by Apple, see `safety-and-legal.md`).
7. Analytics from day 1.

## Platform facts that shape the choice

### iOS widgets
- Since iOS 17, widgets can have `Button`/`Toggle` controls backed by App Intents. The action runs in the background without opening the app, then the widget refreshes. [Kodeco](https://www.kodeco.com/43771410-interactive-widgets-with-swiftui), [SharpSkill](https://sharpskill.dev/en/blog/ios/widgetkit-ios17-interactive-widgets-app-intents)
- **Lock-screen limitation:** on a locked device, widget buttons are inactive until the user unlocks. [Medium](https://medium.com/@bhumibhuva18/ios-app-widgets-appclips-interactive-experiences-in-ios-18-0f0ea8ac53d9). So the lock screen can show the question; answering needs an unlock (or a tap into the app).
- **Refresh budget:** roughly 72 timeline reloads/day (Apple forums), and the system decides the exact timing. [Apple Dev Forums](https://developer.apple.com/forums/thread/770470), [Swift Senpai](https://swiftsenpai.com/development/refreshing-widget/)
- **WidgetKit push notifications:** a server can push through APNs to tell WidgetKit to reload. This budget is separate from background pushes. This is how a synchronized "the question just dropped" update would work. [Apple docs](https://developer.apple.com/documentation/WidgetKit/Updating-widgets-with-widgetkit-push-notifications)
- **Widgets run on timelines, not live code.** You pre-compute what the widget shows over the next hours. They also have **tight memory limits**: Raroque's widget crashed on ~2MB images. (Raroque `m5cRcii3pec @ 04:11`, `9sHd-VWssxw @ 02:04`)

### Android widgets
- Jetpack Glance (Compose-style) supports interactive widgets through `actionRunCallback`. [Better Programming](https://medium.com/better-programming/android-app-widgets-with-glance-9e881f40c636)
- Lock-screen widgets on Android phones are only just arriving (AOSP, the release after Android 16 QPR1). [Android Developers Blog](https://android-developers.googleblog.com/2025/03/widgets-on-lock-screen-faq.html)

### Audience
- 87% of US teens own an iPhone. [Piper Sandler Fall 2025](https://www.pipersandler.com/news/piper-sandler-completes-50th-semi-annual-teen-survey). **iOS-first is well supported by the data**; Android can come later.

## Option A: Expo (React Native) + expo-widgets

- **expo-widgets** (announced Mar 4, 2026; in Expo SDK 57): iOS home-screen widgets and Live Activities written as React components. It supports interactive buttons, lock-screen accessory widgets, timelines, APNs push updates, and App Groups. **iOS only.** Not in Expo Go; needs a development build. [Expo docs](https://docs.expo.dev/versions/latest/sdk/widgets/), [Expo blog](https://expo.dev/blog/home-screen-widgets-and-live-activities-in-expo), [Expo on X](https://x.com/expo/status/2029242117869191188)
- **You can build and ship iOS from Windows:** EAS Build runs iOS builds in Expo's cloud, and EAS Submit uploads to TestFlight from Windows/Linux/macOS. [Playcode](https://playcode.io/blog/eas-build-guide), [Expo docs](https://docs.expo.dev/submit/ios/). EAS has a free plan. [Expo docs](https://docs.expo.dev/build/setup/)
- One codebase for iOS + Android (Android widgets would still need native Glance code).
- Raroque recommends the AI builder "Anything" to beginners; it generates React Native/Expo apps. (Raroque `4xg5GrFEVeE @ 03:10, 11:35`)
- **Risks:** expo-widgets is new, so expect rough edges. The widget is our core product, so we'd be betting the core on a young library. Android widgets = separate native work.

## Option B: Native Swift / SwiftUI + WidgetKit (Raroque's own approach)

- Raroque builds his iOS apps in Swift and chose it over Flutter/React Native because he could ship faster in it and custom animations/interactions were easier. His plan is to push logic to the backend so other platforms are easier later. (Raroque `ow7qWPxkKI4 @ 00:00–03:06`)
- He built three production widgets in SwiftUI and says simple widget UI is easy in SwiftUI. (`avJ_gimBPHs @ 09:30–10:33`)
- Best access to new Apple widget features the day they ship. [Leanware](https://leanware.co/insights/react-native-vs-swift)
- **Requires a Mac with Xcode** for development. Android would be a whole second app. Raroque himself calls maintaining two codebases (React web + Swift iOS) a real cost. (`avJ_gimBPHs @ 09:30`)

## Backend

| | Supabase | Firebase |
|---|---|---|
| DB | PostgreSQL (SQL) | NoSQL (Firestore) |
| Realtime chat | Works well for most needs | "Gold standard" for chat-style real-time |
| Pricing | Predictable tiers (Pro $25/mo) | Pay-per-read; cost risk at scale |
| Mobile SDKs | Weaker; no built-in push service | More mature |
| Raroque uses | Yes (current apps) | Yes (older apps) |

Sources: [DEV Community](https://dev.to/pockit_tools/supabase-vs-firebase-in-2026-the-honest-comparison-after-using-both-in-production-3e5), [DesignRevision](https://designrevision.com/blog/supabase-vs-firebase), Raroque `ETK_cZLezs4 @ 09:24`, `ow7qWPxkKI4 @ 01:02`.

Early lean: **Supabase.** "What % of my group picked A" is a natural SQL aggregate, and it's what Raroque uses now. Verify realtime needs before deciding.

**Security non-negotiables (from Raroque `tK4NQtzfZbM`):**
- Configure row-level security correctly. The #1 cause of vibe-coded app breaches is misconfigured RLS. Never store fields users mustn't edit (subscription status, rate limits, moderation flags) in a table users can write to. (`@ 03:05`)
- Rate limits on the **backend**, per user and per IP. (`@ 07:17`)
- Never call AI/email/storage/payment APIs from the app. Use backend/edge functions. Env vars in the app are **not** secret. (`@ 09:23–11:29`)
- Set budget caps and alerts on every paid service. (`@ 11:29`)

## Supporting tools Raroque uses (to evaluate, not decided)
- **PostHog** for analytics, installed from day 1; its LLM cost tracking if we use AI. (`cXIWx1eYA9w @ 10:21–12:28`)
- **Sentry** for crashes, **Axiom** for logs. (`9vPyxCucxqI @ 04:09`)
- Feedback board: **Canny** (or UserJot). Email sequences: **Loops**. Waitlist/landing: **Framer**. (`MnF-zJhyUtE`)
- Code review bot on PRs: **Greptile**. (`9vPyxCucxqI @ 06:15`)
- iOS testing by agent: **XcodeBuildMCP** (Native path; needs a Mac). (`9vPyxCucxqI @ 01:03`)

## Costs to expect
- Apple Developer Program: $99/year. [Apple](https://developer.apple.com/programs/)
- Expo EAS: free plan available. Supabase: free tier, then $25/mo Pro. PostHog: most early apps fit the free tier (per Raroque).

## Update 2026-09-10: team answers → Option A recommended
Noah: **no Mac on the team; all coding with AI tools.**
- Option B is ruled out: Xcode only runs on macOS ([BrowserStack](https://www.browserstack.com/guide/xcode-for-windows)), and even Expo's *local* iOS builds need macOS + Xcode ([Expo docs](https://docs.expo.dev/build-reference/local-builds/)).
- **Option A (Expo + expo-widgets + EAS cloud builds + Supabase)** is recommended (D-005).
- **Consequence:** no iOS Simulator (it's macOS-only). Widgets aren't supported in Expo Go, so testing means **EAS cloud development builds installed on real iPhones**, which requires the **paid Apple Developer account ($99/yr)**. Without it, the only route is compiling locally, which needs a Mac. ([Expo discussion #27489](https://github.com/expo/expo/discussions/27489), [Expo dev builds](https://docs.expo.dev/develop/development-builds/introduction/))
- The Apple Developer account holder must be of legal age (18+ in most places). ([Apple](https://developer.apple.com/programs/enroll/))
- **First coding task:** a spike to confirm an `expo-widgets` button can submit an answer to Supabase without opening the app.
