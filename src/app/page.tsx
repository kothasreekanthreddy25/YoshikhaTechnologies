import Link from "next/link";
import { capstone, coursesInStage, stages } from "@/lib/courses";
import SignupForm from "@/components/SignupForm";

export default function Home() {
  return (
    <>
      <section className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 pb-16 pt-16 text-center sm:pt-20">
        <span className="rounded-full bg-brand-soft px-4 py-1.5 text-sm font-semibold text-brand-dark">
          Full Stack Development Program
        </span>
        <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl">
          One clear path from your first line of code to AI apps
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          Follow a guided roadmap of nine courses in four stages. Every stage ends with a project
          you can show employers.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="#signup"
            className="rounded-full bg-brand px-7 py-4 font-semibold text-white hover:bg-brand-dark"
          >
            Start the roadmap
          </Link>
          <Link
            href="#roadmap"
            className="rounded-full border border-[#c9d9cf] bg-white px-7 py-4 font-semibold text-ink hover:border-brand"
          >
            See the stages
          </Link>
        </div>
      </section>

      <section id="roadmap" className="mx-auto max-w-4xl scroll-mt-6 px-6 pb-20">
        <h2 className="sr-only">Learning roadmap</h2>
        <ol>
          {stages.map((stage) => (
            <RoadmapStep
              key={stage.number}
              marker={String(stage.number)}
              title={stage.title}
              goal={stage.goal}
            >
              {coursesInStage(stage.number).map((course) => (
                <Link
                  key={course.slug}
                  href={`/courses/${course.slug}`}
                  className="rounded-[10px] bg-chip px-3.5 py-2.5 text-[15px] font-semibold text-ink hover:bg-brand-soft"
                >
                  {course.name}
                </Link>
              ))}
            </RoadmapStep>
          ))}
          <RoadmapStep marker="★" title={capstone.title} goal={capstone.goal} last>
            <p className="w-full text-[15px] leading-relaxed text-muted">{capstone.description}</p>
            {capstone.stack.map((item) => (
              <span
                key={item}
                className="rounded-[10px] bg-chip px-3.5 py-2.5 text-[15px] font-semibold text-ink"
              >
                {item}
              </span>
            ))}
          </RoadmapStep>
        </ol>
        <div className="mt-4 text-center">
          <Link href="/courses" className="font-semibold text-brand hover:text-brand-dark">
            Browse the full course catalog →
          </Link>
        </div>
      </section>

      <section id="signup" className="scroll-mt-6 bg-ink">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-12 px-6 py-20">
          <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-4">
            <h2 className="text-4xl font-extrabold text-white">Ready for stage 1?</h2>
            <p className="text-lg leading-relaxed text-[#b7ccbf]">
              Create your student account. We will contact you with the next batch dates.
            </p>
          </div>
          <div className="min-w-0 flex-[1_1_320px]">
            <SignupForm tone="dark" />
          </div>
        </div>
      </section>
    </>
  );
}

function RoadmapStep({
  marker,
  title,
  goal,
  last = false,
  children,
}: {
  marker: string;
  title: string;
  goal: string;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4 sm:gap-7">
      <div className="flex flex-col items-center">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand text-lg font-extrabold text-white sm:size-13">
          {marker}
        </div>
        {!last && <div className="min-h-8 w-[3px] grow bg-track" />}
      </div>
      <div className="mb-7 flex min-w-0 flex-1 flex-col gap-3.5 rounded-2xl border border-line bg-white px-5 py-5 sm:px-7 sm:py-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-2xl font-extrabold">{title}</h3>
          <span className="text-sm text-muted">{goal}</span>
        </div>
        <div className="flex flex-wrap gap-2.5">{children}</div>
      </div>
    </li>
  );
}
