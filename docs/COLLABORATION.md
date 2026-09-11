# How We Work Together

A quick guide for Noah, Tiago, and Greg. It assumes you're new to working as a team in git; Claude can run every command here for you. Just ask it (e.g. "pull the latest and start a branch for the widget spike").

## 1. One-time setup

**Noah (repo owner): invite the others**
GitHub → the WidgetRather repo → **Settings** → **Collaborators** → **Add people** → enter Tiago's and Greg's GitHub usernames. They accept the email invite. ([GitHub docs](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository))

**Everyone: get the repo on your computer**
```bash
git clone https://github.com/noahhbrown05/WidgetRather.git
cd WidgetRather
git config user.name "Your Name"
git config user.email "you@example.com"
```
Heads up: **the repo is public, so the email on your commits is public.** To hide it, go to GitHub → Settings → Emails, turn on "Keep my email addresses private", and use the `@users.noreply.github.com` address shown there as your `user.email`. Only future commits change. ([GitHub docs](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/setting-your-commit-email-address))

Then open the folder in Claude Code. It automatically reads `CLAUDE.md`, so your Claude follows the same rules as everyone else's.

## 2. Every Claude session: start and end the same way

**Start:** "Pull the latest from GitHub and read STATUS.md."
**End:** "Log this session." (runs the `log-session` skill: writes your summary, updates STATUS/DECISIONS, pushes)

This is how the three of us stay in sync without seeing each other's chats.

## 3. The workflow: GitHub flow

We use [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow). The idea: **`main` always works; all real work happens on a branch, and gets merged through a pull request (PR).**

1. **Update:** `git checkout main && git pull`
2. **Branch:** `git checkout -b tiago/widget-spike` (use `<your-name>/<what-it-is>`)
3. **Work + commit** in small pieces: `git add -A && git commit -m "Add widget answer buttons"`
4. **Push:** `git push -u origin tiago/widget-spike`
5. **Open a PR** on GitHub: say what changed and why.
6. **Review:** one of the other two reads it (or asks their Claude to review it) and approves or comments.
7. **Merge** on GitHub, then **delete the branch**.

**Research phase exception:** docs-only changes (session logs, STATUS, research notes) can go straight to `main`. Once we start writing app code, everything goes through a PR.

**When coding starts, protect `main`.** Since the repo is public, branch protection is free ([GitHub docs](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)). Noah: Settings → Branches → add a rule for `main` → "Require a pull request before merging" + 1 approval. Then nobody can accidentally break `main`.

## 4. Don't step on each other

- **Split by area, not by file.** Each person owns a piece at a time. Once the gate lifts, a natural first split:
  - **Widget + iOS builds** (the tech spike, EAS, Apple setup)
  - **Backend** (Supabase tables, security rules, question-of-the-day)
  - **App screens + design + waitlist/marketing**
- **Track tasks in GitHub Issues.** One issue per task, assign yourself before you start, and link the PR to the issue.
- **Keep branches short-lived** (a day or two). Long branches cause painful merges.
- **Pull `main` often** while you're working: `git pull origin main` on your branch.
- **Merge conflict?** Don't panic, and never force-push. Ask Claude: "help me resolve this merge conflict, keeping both people's changes."

## 5. Decisions
- Talk it through anywhere (group chat, call), but **it isn't decided until it's in `docs/DECISIONS.md`** with all three sign-offs.
- To sign off: change your ☐ to ☑ in the table and commit.
- Suggestion: a 15-minute weekly check-in, working down the "Waiting on" list in `STATUS.md`.

## 6. Accounts & secrets (later, when we start building)
- **Invite teammates to each service; never share passwords.** Services we'll likely use: Apple Developer / App Store Connect, Expo (EAS), Supabase, PostHog.
- **Apple Developer:** $99/yr, and the account holder must be of legal age (18+ in most places); minors can use an account set up by a parent/guardian ([Apple](https://developer.apple.com/programs/enroll/)). Decide who holds it.
- **Secrets never go in the repo.** API keys go in a local `.env` file (already gitignored) or in the service's own secret storage. Anything in the app itself is readable by users, so real secrets live on the backend only (Raroque `tK4NQtzfZbM @ 11:29`).

## 7. Cheat sheet
| I want to… | Command (or ask Claude) |
|---|---|
| Get the latest | `git checkout main && git pull` |
| Start new work | `git checkout -b <name>/<task>` |
| See what I changed | `git status` / `git diff` |
| Save my work | `git add -A && git commit -m "message"` |
| Share it | `git push -u origin <branch>` → open a PR on GitHub |
| Catch up my branch with main | `git pull origin main` |
| Undo uncommitted changes to a file | `git restore <file>` |
