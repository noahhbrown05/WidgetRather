# 2026-09-10 — Noah — MVP game plan and roles
**Teammate:** Noah · **Model:** Claude Opus 5

## Asked for
- Hide Noah's email on the public repo (done: commits use the GitHub no-reply address; the first commit was replaced).
- Main code development will run from Greg's desktop (Claude Max); Noah and Tiago are on Pro. Organize the MVP tasks, divide them by capacity, and make a game plan.

## Did
- Wrote `docs/MVP-GAMEPLAN.md`: roles, critical path, 5 phases, and every task with an owner and its Claude intensity.
- Added D-012 (roles + plan, PROPOSED); updated `STATUS.md`, `COLLABORATION.md`, `CLAUDE.md`.

## Learned (with sources)
- Max is sold as 5x or 20x Pro's usage, with a rolling 5-hour window plus a weekly cap; exact quotas aren't published. [Morph](https://www.morphllm.com/claude-code-usage-limits), [CC for Everyone](https://ccforeveryone.com/guides/claude-code-limits-and-pricing)
- The App Store requires: Sign in with Apple (or an equivalent) if we offer social logins (4.8); a privacy policy in the app and the listing (5.1.1); in-app account deletion (5.1.1(v)); a demo account for review (2.1). [Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- Supabase supports native Sign in with Apple in Expo via `signInWithIdToken`. [Supabase docs](https://supabase.com/docs/guides/auth/social-login/auth-apple)
- The #1 blocker: without a Mac, test builds on iPhones need the paid Apple Developer account.

- **Revision (same session):** Noah proposed Greg = main back-end dev, with Noah + Tiago splitting all front end + misc. The plan was rewritten around that:
  - Greg: backend, data layer, widget ↔ backend, EAS builds, tech spike.
  - Noah: onboarding/auth/age gate, groups, settings/safety screens + accounts/policies/waitlist/beta/listing.
  - Tiago: design system, question/results/reactions screens, widget look + designs/brand/questions/screenshots.
  - A "contract": Greg ships generated Supabase types + a function list; screens only call those functions.
- Verified for the revision: Expo dev builds load JS/TS changes from each person's own PC with no rebuild ([Expo docs](https://docs.expo.dev/develop/development-builds/introduction/)); the free EAS plan allows 15 iOS builds/month in a low-priority queue and supports teams ([Expo pricing](https://expo.dev/pricing)); Supabase generates TypeScript types ([Supabase docs](https://supabase.com/docs/guides/api/rest/generating-types)).
- UNVERIFIED, to check in the spike: whether changes to `expo-widgets` widget code need a native rebuild.

- **Testing research (same session):** Noah asked whether we can test without the $99 Apple account, ideally something iPhone-like on Windows. Findings are in `research/testing-without-apple-account.md`:
  - EAS **iOS simulator builds need no Apple account** and run in a browser via **Appetize** (free tier is tiny: ~30 min/mo, 3-min sessions) or in Apple's Simulator on a **rented cloud Mac** (MacinCloud ~$1/hr, prepaid in 30-hr blocks). The Simulator supports widgets.
  - For day-to-day screen work: web browser, the Android emulator, and Expo Go (confusing status: a May 2026 App Store gap, but the listing now shows 57.0.9; check on a phone).
  - Not viable: free Apple ID signing (needs a Mac; 7-day expiry, no push) and real-device clouds (need a signed `.ipa`).
  - Result: the Apple account is no longer the first blocker. The critical path and G1/G2 were updated.

## Decisions
- D-012 roles + game plan → PROPOSED (revised split)
- D-013 testing plan (simulators first, $99 account before the beta) → PROPOSED

## Open questions / next steps
- All: sign off on D-004–D-012; decide who holds the Apple Developer account (18+).
- Noah: invite Tiago & Greg to the repo.
- Optional: turn the plan's tasks into GitHub Issues (needs `gh` CLI or manual creation).
