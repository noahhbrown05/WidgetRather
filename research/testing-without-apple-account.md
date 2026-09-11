# Testing Without a Paid Apple Developer Account (Windows only)

_Research pass: 2026-09-10 (Noah's session). Question: can we test the MVP, ideally on something iPhone-like on Windows, before paying $99/yr?_

## Short answer
**Yes, for most of the MVP.** The paid account is only truly required for: installing our *own* build (with the widget) on a real iPhone, TestFlight betas, and the App Store. Everything before that has free or cheap routes.

## The options, ranked for us

### 1. EAS iOS **simulator** build → run it in a browser on Appetize (the "iPhone on Windows" option)
- **EAS can build an iOS Simulator version of our app without an Apple Developer account.** Set `"ios": { "simulator": true }` in an `eas.json` build profile. It can even be a development build that connects to a dev server. ([Expo docs](https://docs.expo.dev/build-reference/simulators/), [egghead](https://egghead.io/lessons/react-native-create-a-development-build-for-ios-simulator-with-eas))
- **Appetize runs real iOS Simulator builds in a web browser.** You upload a `.zip`/`.tar.gz` of the simulator `.app`; it doesn't accept `.ipa` files. ([Appetize docs](https://docs.appetize.io/platform/app-management/uploading-apps/ios)) Expo's own Snack playground uses Appetize for its iOS previews. ([expo/snack](https://github.com/expo/snack), [DeepWiki](https://deepwiki.com/expo/snack/6.2-appetize-integration))
- **Cost (third-party reported; Appetize's own pricing page didn't load for us):** free tier of about 30 min/month, 3-minute sessions, public apps only, 1 user. Starter is about $59/mo. ([SpotSaaS](https://www.spotsaas.com/product/appetize-io/pricing)) The free tier is only enough for a quick look.
- **UNVERIFIED:** whether you can reach the Appetize simulator's home screen to add and tap our widget, and whether a dev build there can reach a dev server on our PC (`npx expo start --tunnel` exists for remote devices, [Expo docs](https://docs.expo.dev/more/expo-cli/)). A short free-tier test answers both.

### 2. Rent a cloud Mac and use Apple's real iOS Simulator (the best fidelity, including widgets)
- **MacinCloud pay-as-you-go: about $1/hr or $4/day,** prepaid in 30-hour blocks (so ~$30 to start); each use has a 24-consecutive-hour minimum period; credits expire after 60 days without login. ([MacinCloud](https://www.macincloud.com/pages/payg.html), [support](https://support.macincloud.com/support/solutions/articles/8000044698-what-is-macincloud-s-pay-as-you-go-server-plan-))
- You remote-desktop in from Windows, install the EAS simulator build (no Apple account needed), and click around a full iPhone simulator.
- **The iOS Simulator supports home-screen widgets, including testing interactive widget buttons.** ([Mobot](https://www.mobot.io/blog/how-to-test-home-screen-widgets-on-ios), [Kodeco](https://www.kodeco.com/43771410-interactive-widgets-with-swiftui))
- **This means Greg's tech spike (widget button → Supabase) can probably run *before* we buy the Apple account.** (UNVERIFIED end to end: confirm the expo-widgets build behaves in the simulator.)

### 3. Expo Go on real iPhones (free, but no widget)
- Expo Go is a free App Store app that runs our screens on a real iPhone, connected to a dev server on our PC. **But it only supports libraries built into it, so no custom native code** (our widget uses `expo-widgets`, which needs a development build). ([Expo docs](https://docs.expo.dev/get-started/expo-go/), [Expo widgets docs](https://docs.expo.dev/versions/latest/sdk/widgets/))
- **Status is confusing, so check it on a phone:** in May 2026, Expo said Expo Go for SDK 55+ was stuck in App Store review, and the workaround (`eas go`) needs the paid account. ([Expo changelog](https://expo.dev/changelog/expo-go-and-app-store-may-2026)) But the App Store listing now shows **Expo Go 57.0.9, free** ([App Store](https://apps.apple.com/us/app/expo-go/id982107779)), and expo.dev/go shows SDK 57 with an iOS install button ([expo.dev/go](https://expo.dev/go)). **The 1-minute check:** install Expo Go from the App Store and confirm it says SDK 57. Since Sep 3, 2026, Expo Go requires logging in (a free Expo account). ([Expo changelog](https://expo.dev/changelog))

### 4. Web browser (free, fastest, least iPhone-like)
- `npx expo start --web` runs the app in a browser via React Native for Web. ([Expo docs](https://docs.expo.dev/workflow/web/)) Good for fast screen iteration; not real iOS, and no widget.

### 5. Android emulator on Windows (free, real native app, no widget)
- Android Studio's emulator works on Windows for Expo apps. ([Expo docs](https://docs.expo.dev/workflow/android-studio-emulator/)) It's the same React Native screens, but `expo-widgets` is iOS-only, so no widget.

## Not viable for us
- **Free Apple ID "personal team" signing:** needs Xcode (a Mac) to sign; apps expire after 7 days; max 3 devices / 3 apps; no push notifications; App Groups (which widgets use to share data) have caused problems. ([myByways](https://mybyways.com/blog/new-limitations-imposed-on-free-apple-developer-account/), [Apple Forums](https://developer.apple.com/forums/thread/718388), [Apple Forums](https://developer.apple.com/forums/thread/656271))
- **Real-device clouds (e.g. BrowserStack):** they re-sign an uploaded `.ipa` ([BrowserStack docs](https://www.browserstack.com/docs/app-automate/appium/resign-ios-apps)), but we can't produce a device `.ipa` without Apple signing credentials, and Appetize doesn't take `.ipa` files either. Likely a dead end until we have the account.

## Recommended testing plan (D-013, proposed)
| Stage | What we test | How | Apple account? | Cost |
|---|---|---|---|---|
| Building screens (daily) | Screens, flows, data | Web browser + Android emulator on each PC; Expo Go on iPhones **if** the SDK 57 check passes | No | Free |
| Tech spike + widget | Widget look, buttons, answer saving | EAS simulator build → cloud Mac (MacinCloud) or Appetize | No | ~$30 prepay (MacinCloud) or Appetize trial |
| iPhone-accurate click-through for the team | The whole app in an iPhone frame | EAS simulator build → Appetize | No | Free tier (tiny) / ~$59/mo |
| Real iPhones, beta, App Store | Real widget on real phones, TestFlight, submission | EAS device builds | **Yes ($99/yr, holder 18+)** | $99/yr |

**Bottom line:** we can push the $99 purchase back until the MVP works in a simulator, which makes the spend safer. It's still required before real-phone testing with friends (beta) and the App Store.
