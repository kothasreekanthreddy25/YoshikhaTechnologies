"use server";

import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { courseOptions } from "@/lib/courses";

const courseSlugs = courseOptions.map((c) => c.value) as [string, ...string[]];

const SignupSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(100),
  email: z.email("Please enter a valid email address.").trim().toLowerCase().max(200),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{7,20}$/, "Please enter a valid phone number."),
  courseSlug: z.enum(courseSlugs, "Please choose a course."),
  experience: z.enum(
    ["NEW_TO_CODING", "SOME_EXPERIENCE", "WORKING_DEVELOPER"],
    "Please choose your experience level.",
  ),
  goals: z.string().trim().max(1000).optional(),
});

export type SignupField = keyof z.infer<typeof SignupSchema>;

export type SignupState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<SignupField, string>>;
  values?: Partial<Record<SignupField, string>>;
};

export async function signupStudent(_prev: SignupState, formData: FormData): Promise<SignupState> {
  // Honeypot: real users never fill this hidden field.
  if (formData.get("website")) {
    return { status: "success", message: "Thanks! We will be in touch soon." };
  }

  const raw = {
    fullName: String(formData.get("fullName") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    courseSlug: String(formData.get("courseSlug") ?? ""),
    experience: String(formData.get("experience") ?? ""),
    goals: String(formData.get("goals") ?? "") || undefined,
  };

  const parsed = SignupSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: SignupState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as SignupField;
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors, values: raw };
  }

  try {
    await prisma.student.create({ data: parsed.data });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return {
        status: "error",
        message: "This email is already registered. We will contact you soon.",
        fieldErrors: { email: "This email is already registered." },
        values: raw,
      };
    }
    console.error("Student signup failed", error);
    return {
      status: "error",
      message: "Something went wrong saving your signup. Please try again in a moment.",
      values: raw,
    };
  }

  return {
    status: "success",
    message: `Thanks, ${parsed.data.fullName.split(" ")[0]}! You're signed up. We will contact you at ${parsed.data.email} with the next batch dates.`,
  };
}
