import type { Metadata } from "next";
import SignupForm from "@/components/SignupForm";
import { courseOptions } from "@/lib/courses";

export const metadata: Metadata = { title: "Student signup" };

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>;
}) {
  const { course } = await searchParams;
  const defaultCourse = courseOptions.some((c) => c.value === course) ? course : undefined;

  return (
    <section className="mx-auto max-w-2xl px-6 pb-20 pt-10">
      <div className="mb-8 flex flex-col gap-3 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Student signup</h1>
        <p className="text-lg text-muted">
          Create your student account. We will contact you with batch dates and next steps.
        </p>
      </div>
      <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
        <SignupForm defaultCourse={defaultCourse} />
      </div>
    </section>
  );
}
