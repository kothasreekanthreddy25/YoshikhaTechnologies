import type { Metadata } from "next";
import Link from "next/link";
import { capstone, coursesInStage, PROGRAM, stages } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Course catalog",
  description: "Nine hands-on courses in four stages, from HTML to the OpenAI API.",
};

export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-20 pt-10">
      <div className="mb-10 flex flex-col gap-3">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Course catalog</h1>
        <p className="max-w-2xl text-lg text-muted">
          Take one course or the whole program. Courses are grouped by roadmap stage, so you can see
          what comes first.
        </p>
      </div>

      <div className="mb-14 flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-ink p-7 text-white sm:p-8">
        <div className="flex max-w-2xl flex-col gap-2">
          <span className="text-sm font-bold uppercase tracking-wider text-mint">Full program</span>
          <h2 className="text-2xl font-extrabold sm:text-3xl">{PROGRAM.name}</h2>
          <p className="text-[#b7ccbf]">{PROGRAM.summary}</p>
        </div>
        <Link
          href={`/signup?course=${PROGRAM.slug}`}
          className="rounded-full bg-mint px-6 py-3.5 font-bold text-ink hover:bg-[#86efac]"
        >
          Enroll in the program
        </Link>
      </div>

      <div className="flex flex-col gap-14">
        {stages.map((stage) => (
          <section key={stage.number} aria-labelledby={`stage-${stage.number}`}>
            <div className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="text-sm font-bold uppercase tracking-wider text-brand">
                Stage {stage.number}
              </span>
              <h2 id={`stage-${stage.number}`} className="text-2xl font-extrabold">
                {stage.title}
              </h2>
              <span className="text-muted">{stage.goal}</span>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {coursesInStage(stage.number).map((course) => (
                <article
                  key={course.slug}
                  className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-6"
                >
                  <span className="self-start rounded-full bg-chip px-3 py-1 text-xs font-semibold text-muted">
                    {course.level}
                  </span>
                  <h3 className="text-xl font-extrabold">{course.name}</h3>
                  <p className="grow leading-relaxed text-muted">{course.summary}</p>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="font-semibold text-brand hover:text-brand-dark"
                  >
                    View course →
                  </Link>
                </article>
              ))}
            </div>
          </section>
        ))}

        <section aria-labelledby="capstone" className="rounded-2xl border border-line bg-white p-7">
          <span className="text-sm font-bold uppercase tracking-wider text-brand">Final stage</span>
          <h2 id="capstone" className="mt-1 text-2xl font-extrabold">{capstone.title}</h2>
          <p className="mt-2 max-w-3xl leading-relaxed text-muted">{capstone.description}</p>
        </section>
      </div>
    </div>
  );
}
