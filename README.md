# Yoshikha Technologies

Training website for the **Full Stack Development with AI** program: landing page, course catalog and student signup.

**Stack:** Next.js 16 (App Router), React 19, Tailwind CSS 4, PostgreSQL with Prisma, Zod.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Landing page with the 4-stage learning roadmap and a signup form |
| `/courses` | Course catalog grouped by roadmap stage |
| `/courses/[slug]` | Course detail: topics, project, signup link |
| `/signup` | Student signup (`?course=<slug>` preselects a course) |

Courses: HTML5, CSS3, JavaScript, Tailwind CSS, React.js, Next.js, PostgreSQL and Prisma, AI for Developers, OpenAI API, plus a capstone project. Edit them in `src/lib/courses.ts`.

## Run it locally

You need Node.js 20+ and a PostgreSQL database (local Postgres, or a free hosted one from Neon or Railway).

```bash
npm install
cp .env.example .env        # then set DATABASE_URL in .env
npm run db:push             # creates the Student table
npm run dev                 # http://localhost:3000
```

On Windows PowerShell use `copy .env.example .env` instead of `cp`.

## Viewing signups

Signups are saved in the `Student` table. Browse them with:

```bash
npm run db:studio
```

## Deploying

Works on Vercel or Railway. Set `DATABASE_URL` in the host's environment variables, and run `npm run db:push` once against the production database.
