import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, getCourse, stages } from "@/lib/courses";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const course = getCourse((await params).slug);
  return course ? { title: course.name, description: course.summary } : {};
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const course = getCourse((await params).slug);
  if (!course) notFound();

  const stage = stages.find((s) => s.number === course.stage)!;
  const index = courses.indexOf(course);
  const next = courses[index + 1];

  return (
    <div className="mx-auto max-w-4xl px-6 pb-20 pt-8">
      <Link href="/courses" className="text-sm font-semibold text-brand hover:text-brand-dark">
        ← All courses
      </Link>

      <div className="mt-6 flex flex-col gap-4">
        <div className="flex flex-wrap gap-2 text-sm font-semibold">
          <span className="rounded-full bg-brand-soft px-3 py-1 text-brand-dark">
            Stage {stage.number}: {stage.title}
          </span>
          <span className="rounded-full bg-chip px-3 py-1 text-muted">{course.level}</span>
          <span className="rounded-full bg-chip px-3 py-1 text-muted">
            Course {index + 1} of {courses.length}
          </span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{course.name}</h1>
        <p className="text-xl leading-relaxed text-muted">{course.summary}</p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-[1fr_320px]">
        <section className="rounded-2xl border border-line bg-white p-7">
          <h2 className="text-xl font-extrabold">What you will learn</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {course.topics.map((topic) => (
              <li key={topic} className="flex gap-3 leading-relaxed">
                <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-1 size-4 shrink-0 text-brand" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {topic}
              </li>
            ))}
          </ul>
        </section>
        <aside className="flex flex-col gap-5 rounded-2xl bg-ink p-7 text-white">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-mint">Course project</h2>
            <p className="mt-2 leading-relaxed text-[#dce7e0]">{course.project}</p>
          </div>
          <Link
            href={`/signup?course=${course.slug}`}
            className="rounded-full bg-mint px-6 py-3.5 text-center font-bold text-ink hover:bg-[#86efac]"
          >
            Sign up for this course
          </Link>
        </aside>
      </div>

      {next && (
        <div className="mt-10 rounded-2xl border border-line bg-white p-6">
          <span className="text-sm text-muted">Next on the roadmap</span>
          <Link
            href={`/courses/${next.slug}`}
            className="mt-1 block text-lg font-extrabold text-ink hover:text-brand"
          >
            {next.name} →
          </Link>
        </div>
      )}
    </div>
  );
}
