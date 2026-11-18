"use client";

import { useActionState } from "react";
import { signupStudent, type SignupField, type SignupState } from "@/app/signup/actions";
import { courseOptions, PROGRAM } from "@/lib/courses";

const initialState: SignupState = { status: "idle" };

const experienceOptions = [
  { value: "NEW_TO_CODING", label: "New to coding" },
  { value: "SOME_EXPERIENCE", label: "Some coding experience" },
  { value: "WORKING_DEVELOPER", label: "Working developer" },
];

export default function SignupForm({
  tone = "light",
  defaultCourse = PROGRAM.slug,
}: {
  tone?: "light" | "dark";
  defaultCourse?: string;
}) {
  const [state, formAction, pending] = useActionState(signupStudent, initialState);
  const dark = tone === "dark";

  if (state.status === "success") {
    return (
      <div
        role="status"
        className={`rounded-2xl p-6 text-lg font-semibold ${dark ? "bg-white/10 text-white" : "bg-brand-soft text-brand-dark"}`}
      >
        {state.message}
      </div>
    );
  }

  const label = `flex flex-col gap-1.5 text-sm font-medium ${dark ? "text-[#dce7e0]" : "text-ink"}`;
  const input = `w-full min-w-0 rounded-xl px-3.5 py-3.5 text-base font-normal text-ink outline-none focus:ring-2 focus:ring-brand ${
    dark ? "border-0 bg-white" : "border border-[#c9d9cf] bg-white"
  }`;
  const v = (f: SignupField) => state.values?.[f];
  const err = (f: SignupField) =>
    state.fieldErrors?.[f] ? (
      <span id={`${f}-error`} className={`text-sm ${dark ? "text-[#fca5a5]" : "text-red-700"}`}>
        {state.fieldErrors[f]}
      </span>
    ) : null;
  const aria = (f: SignupField) =>
    state.fieldErrors?.[f] ? { "aria-invalid": true, "aria-describedby": `${f}-error` } : {};

  return (
    <form action={formAction} className="flex flex-col gap-3.5" noValidate>
      {/* Honeypot field for bots, hidden from people and screen readers */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className={label}>
        Full name
        <input name="fullName" autoComplete="name" required defaultValue={v("fullName")} className={input} {...aria("fullName")} />
        {err("fullName")}
      </label>
      <div className="flex flex-wrap gap-3.5">
        <label className={`${label} min-w-0 flex-[1_1_200px]`}>
          Email
          <input name="email" type="email" autoComplete="email" required defaultValue={v("email")} className={input} {...aria("email")} />
          {err("email")}
        </label>
        <label className={`${label} min-w-0 flex-[1_1_200px]`}>
          Phone
          <input name="phone" type="tel" autoComplete="tel" required placeholder="+91" defaultValue={v("phone")} className={input} {...aria("phone")} />
          {err("phone")}
        </label>
      </div>
      <div className="flex flex-wrap gap-3.5">
        <label className={`${label} min-w-0 flex-[1_1_200px]`}>
          Course
          <select name="courseSlug" defaultValue={v("courseSlug") ?? defaultCourse} className={input} {...aria("courseSlug")}>
            {courseOptions.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          {err("courseSlug")}
        </label>
        <label className={`${label} min-w-0 flex-[1_1_200px]`}>
          Experience
          <select name="experience" defaultValue={v("experience") ?? "NEW_TO_CODING"} className={input} {...aria("experience")}>
            {experienceOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {err("experience")}
        </label>
      </div>
      {!dark && (
        <label className={label}>
          <span>
            What do you want to build? <span className="font-normal text-muted">(optional)</span>
          </span>
          <textarea name="goals" rows={3} defaultValue={v("goals")} className={input} />
        </label>
      )}

      {state.status === "error" && state.message && (
        <p role="alert" className={`text-sm font-medium ${dark ? "text-[#fca5a5]" : "text-red-700"}`}>
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className={`mt-1 rounded-full px-6 py-4 font-bold disabled:opacity-60 ${
          dark ? "bg-mint text-ink hover:bg-[#86efac]" : "bg-brand text-white hover:bg-brand-dark"
        }`}
      >
        {pending ? "Signing you up…" : "Sign up as a student"}
      </button>
    </form>
  );
}
