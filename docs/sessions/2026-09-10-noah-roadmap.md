# 2026-09-10 — Noah — Prototype review + roadmap
**Teammate:** Noah · **Model:** Claude Opus 5

## Asked for
- Review Greg's clickable prototype (`prototype/index.html`).
- Then: hold off on development and write a genuine step-by-step, **no timeline**, from where we are to production (design, backend, App Store, a small friends beta, possibly UGC) and past launch.

## Did
- Reviewed and clicked through the prototype. It's strong and faithful to the mockups. Bugs found (verified in the browser):
  - Result bars are empty on the in-app voted screen and the large widget (`.fl` spans are inline, so width is ignored).
  - The notes-rail "hi" chips collide with the `.hi` home-indicator class and get squashed.
  - The Apple logo (U+F8FF) shows as a box on Windows.
  - There's no doctype, so the page renders in quirks mode.
  - Numbers don't match: "9 people" vs "12 friends agree". One note overstates that anonymity "sank" YOLO.
  - Not fixed; offered as a PR for Greg.
- Wrote **`docs/ROADMAP.md`** (Stages 0–12, owners, "done when", sources). Added D-014 (development hold). Removed the week targets from `MVP-GAMEPLAN.md`. Updated STATUS and CLAUDE.md.

## Learned (with sources)
- **From Sept 2026, new apps must answer an age-rating "social media capability" question; "yes" means at least 13+.** [Apple news](https://developer.apple.com/news/?id=tlur8uvi), [9to5Mac](https://9to5mac.com/2026/07/09/apple-adds-social-media-questions-to-app-store-connect-age-rating-questionnaire/)
- Age ratings are now 4+/9+/13+/16+/18+; you can override to a higher rating to match your terms. [9to5Mac](https://9to5mac.com/2025/07/24/apple-notifies-developers-of-new-app-store-age-rating-system/), [Apple help](https://developer.apple.com/help/app-store-connect/manage-app-information/set-an-app-age-rating/)
- TestFlight: 100 internal / 10,000 external testers; public links; external needs Beta App Review. [Apple](https://developer.apple.com/testflight/)
- Screenshots: the 6.9" size, 1–10 images. [Apple](https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/)
- Organization enrollment needs a legal entity + D-U-N-S; individuals show their legal name as the seller. [Apple](https://developer.apple.com/help/account/membership/D-U-N-S/)
- EAS Update ships JS/UI/assets over the air; native changes need a new store build. [Expo](https://docs.expo.dev/eas-update/introduction/)
- The rating prompt shows at most 3x/year per user. [SwiftLee](https://www.avanderlee.com/swift/skstorereviewcontroller-app-ratings/)
- HTTPS-only apps are export-compliance exempt. [AppCompliance](https://appcompliance.io/blog/app-store-encryption-export-compliance/)
- Paid creator (UGC) videos need clear FTC disclosure, and the brand shares liability. [FTC](https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking)

## Decisions
- D-014 development hold + follow the roadmap → PROPOSED (Noah ☑)

## Open questions / next steps
- Kickoff: widget sizes, "Everyone" %, drop window, hide picks until you vote, report owner.
- Noah: 1.1 MVP spec, 1.3 name check. Tiago: 1.2 question bank, 1.4 brand. Greg: prototype fixes.
- Watch: **App Review needs to see a question anytime**, so the demo account must bypass the morning drop window (ROADMAP 8.4).
