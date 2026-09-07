# Signal — Data Science Placement Coach (MVP scaffold)

An 8-week placement-prep operating system for MSc Data Science students:
diagnose → plan → learn → practice → interview → analyze → revise.

This repo is a **working front-end scaffold**, not the full spec. It's built
to be the foundation you extend, not a finished product — see "What's stubbed
vs real" below.

## Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- Mock data only — no backend, auth, or database yet

## Structure
```
src/
  app/
    page.tsx                landing page
    onboarding/page.tsx     profile form + diagnostic quiz (real, graded)
    dashboard/page.tsx      readiness, today's plan, weak areas (static mock — next push)
    learn/page.tsx          curriculum hub — reads live mastery from the store
    learn/[slug]/page.tsx   topic page shell (static export requires this be a server component)
    practice/page.tsx       practice question cards (static mock — next push)
    interviews/page.tsx     mock interview launcher (static mock — next push)
    progress/page.tsx       readiness-over-time table (static mock — next push)
  components/
    SideNav.tsx
    ProgressBar.tsx
    McqQuiz.tsx             reusable graded multiple-choice quiz engine
    TopicDetail.client.tsx  renders a topic's 9-section lesson + mastery test
    TopicMasterySection.tsx wraps McqQuiz, grades it, writes mastery to the store
  lib/
    store.ts                localStorage data layer: profile, attempts, mistakes, mastery, readiness math
    topics.ts                all 10 topics' full lesson content + which quiz area (if any) grades them
    question-bank.ts        multiple-choice questions, tagged by area, used by quizzes + diagnostic
    mastery.ts               mastery labels/colors + score → mastery-level mapping
    use-live-store.ts       hook that re-renders components when the store changes
    mock-data.ts             remaining static content for pages not yet wired to the store
```

## What's real vs stubbed
**Real (this push):** the entire Learn section — 10 topics across Core Data
Science and the Healthcare AI specialization, each with the full template
(revision → concepts → math → example → implementation → mistakes →
interview questions → scenario → mastery test). Mastery levels are computed
from actual quiz performance (stored in the browser via localStorage, see
`lib/store.ts`) and update live across the Learn hub and topic pages — they
are not hardcoded or button-set.

Six topics (Python, SQL, DSA, Statistics, Machine Learning, Deep Learning)
have a real, gradable multiple-choice mastery test wired to a question bank
(`lib/question-bank.ts`). MLOps and the three Healthcare AI specialization
topics have full lesson content but no quiz bank yet — the page says so
explicitly rather than faking a quiz.

**Not yet wired (next push):** Practice center, SQL Lab, AI mock interviews,
project defense, resume/JD analysis, auth. The dashboard and progress pages
still show the original static mock data from `lib/mock-data.ts` — they'll
be reconnected to the same localStorage store in the next round.

**Onboarding entry points:** the landing page's "Start diagnostic" button
and a banner on `/learn` (shown until you complete it) both link to
`/onboarding`.

## Run locally
```bash
npm install
npm run dev
```
Visit http://localhost:3000

## Next steps toward the full spec
1. Add auth (Clerk or Supabase Auth) and a Postgres database (Supabase/Neon).
2. Replace `lib/mock-data.ts` reads with real queries once you have tables
   for `topics`, `questions`, `attempts`, `interviews`.
3. Add an `/api` route that calls the Anthropic API for: mock-interview
   turns, mastery-test grading, resume/JD analysis. Keep API keys server-side
   only, never in client code.
4. Add a sandboxed code-execution service (e.g. Judge0, or a container-per-run
   service) for the Python/SQL practice — never `eval` untrusted code directly.
5. Wire the diagnostic assessment to actually compute the readiness scores
   currently hardcoded in `mock-data.ts`.

## Deployment

### Option A — GitHub Pages (static, free, same repo)
This app is configured for static export (`output: "export"` in
`next.config.ts`) and ships a GitHub Actions workflow at
`.github/workflows/deploy.yml`. Push to `main` and it deploys automatically
to `https://<username>.github.io/<repo-name>/` — see the step-wise guide for
enabling this in repo settings.

**Important:** edit `repoName` in `next.config.ts` to match your actual
GitHub repo name before the first deploy, or asset paths (CSS/JS) will
404. This limitation exists because GitHub Pages serves project sites from
a `/repo-name/` subpath, not the domain root.

**What breaks under static export:** anything needing a live server —
API routes, server actions, ISR/dynamic data fetching. The AI mock
interviewer, resume analyzer, and code execution described in "Next steps"
below cannot run on GitHub Pages; they need a real backend (Vercel,
Render, Railway, etc.) once you build them.

### Option B — Vercel (supports full Next.js features)
Any Next.js host works; Vercel is the path of least resistance and is the
only option once you add API routes, auth, or a database.
