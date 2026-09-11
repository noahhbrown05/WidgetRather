# Safety & Legal Research (teen audience)

_First pass: 2026-09-10 (Noah's session). **This is research, not legal advice.** Before launch we should have a lawyer review age gating, privacy policy, and moderation._

## Apple App Store rules that directly affect us
From the [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/):
- **1.2 User-Generated Content:** apps with UGC or social networking **must** have (1) filtering of objectionable material, (2) a way to report content, with timely responses, (3) the ability to block users, and (4) published contact info.
- Apps used primarily for **"random or anonymous chat"**, **chatroulette-style** experiences, **"hot-or-not"** voting on real people, threats, or **bullying** "do not belong on the App Store and may be removed without notice."
- **1.2.1:** creator/UGC apps must let users flag content above the app's age rating and use **age restriction based on verified or declared age**.
- **1.3 / 5.1.4 (Kids Category):** no third-party analytics or ads in Kids Category apps. We likely should **not** be in the Kids Category (we're teens, not young kids), but confirm.

**Implication:** keep the app non-anonymous, friend-based, and about hypotheticals rather than rating people. Report, block, and filtering are MVP requirements, not later add-ons.

## COPPA (US, under-13)
- The FTC's amended COPPA Rule was published Apr 22, 2025, took effect Jun 23, 2025, with **full compliance required by Apr 22, 2026**. It expands "personal information" to include biometrics, government IDs, and more. [White & Case](https://www.whitecase.com/insight-alert/unpacking-ftcs-coppa-amendments-what-you-need-know), [Finnegan](https://www.finnegan.com/en/insights/articles/coppas-amended-rule-is-now-in-full-effect-what-operators-need-to-know.html)
- Applies to child-directed services **or** services with actual knowledge that they collect data from under-13s.
- **Implication:** the simplest path is a 13+ age floor with an age gate. Allowing under-13s means verifiable parental consent and much more compliance work.

## State App Store Accountability Acts (age verification)
- Enacted as of Aug 13, 2026: **Utah, Texas, Louisiana, Alabama**. [Recording Law](https://www.recordinglaw.com/us-laws/age-verification-laws/app-store-age-verification-laws/), [FPF comparison chart](https://fpf.org/wp-content/uploads/2026/06/FPF-Legislation-TX-UT-LA-App-Store-Accountability-Act-Comparison-Chart.pdf)
- App stores must verify age and get parental consent for minors' downloads and purchases, and **developers get obligations too**. [Wiley](https://www.wiley.law/alert-State-App-Store-Accountability-Acts-Introduce-New-Obligations-for-App-Developers), [Pillsbury](https://www.pillsburylaw.com/en/news-and-insights/app-store-accountability-act-texas.html)
- Texas: effective Jan 1, 2026; there was litigation (Morrison Foerster reports the law took effect after the Fifth Circuit stayed a preliminary injunction). [MoFo](https://www.mofo.com/resources/insights/251111-texas-targets-app-stores-with-new-accountability-law). **Status may keep changing, so re-check.**

## Apple's Declared Age Range API
- Gives developers an age-range signal from the device, whether age-related rules apply to the user, and whether parental permission is needed for significant updates. Apple positions it as the tool for meeting obligations in Brazil, Australia, Singapore, Utah, and Louisiana. [Apple Developer News](https://developer.apple.com/news/?id=f5zj08ey), [Apple docs](https://developer.apple.com/documentation/declaredagerange/implementing-age-assurance-and-permissions), [9to5Mac](https://9to5mac.com/2026/02/24/apple-expands-age-assurance-tools-as-new-app-store-requirements-roll-out-in-several-regions/)
- **Implication:** plan to integrate it for age gating instead of building our own.

## Lessons from past teen apps
- Anonymous apps (Sarahah, YikYak, YOLO) ran into bullying and store removal (Sarahah was removed in 2018). [Fast Company](https://www.fastcompany.com/90346978/anonymous-qa-app-yolo-is-a-hit-with-teens-but-bullying-concerns-linger)

## Update 2026-09-10: target is middle school → high school
- Middle school (grades 6–8) is typically ages 11–14; 6th graders are 11–12 ([Wikipedia](https://en.wikipedia.org/wiki/Middle_school), [Your Teen Mag](https://yourteenmag.com/teenager-school/school-grade-level-and-age)). **So part of the target is under 13, which brings in COPPA.**
- For mixed-audience services, the FTC allows a **neutral age gate**. Users 13+ proceed; under-13 data can only be collected after verifiable parental consent. A checkbox like "I am over 12" is **not** neutral. If you later learn a user is under 13, obligations attach immediately. ([FTC COPPA FAQ](https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions), [Promise Legal](https://blog.promise.legal/coppa-mixed-age-audience-actual-knowledge/))
- Proposed (D-007): MVP is 13+ only; revisit under-13 with a lawyer.

## Open questions
1. Age floor: 13+? 16+ for public communities?
2. Friends-only groups vs. open communities. Open communities with teens means much heavier moderation.
3. Who moderates, and how fast? ("Timely responses" is an Apple requirement.)
4. Get a lawyer to review before public launch (not before the prototype).
