export type Level = "Beginner" | "Intermediate";

export type Course = {
  slug: string;
  name: string;
  short: string;
  stage: number;
  level: Level;
  summary: string;
  topics: string[];
  project: string;
};

export type Stage = {
  number: number;
  title: string;
  goal: string;
};

export const PROGRAM = {
  slug: "full-stack-development",
  name: "Full Stack Development with AI",
  summary:
    "All nine courses in order, from HTML to the OpenAI API, finishing with a deployed AI-powered capstone project.",
};

export const stages: Stage[] = [
  { number: 1, title: "Web foundations", goal: "Build and style real web pages" },
  { number: 2, title: "Modern frontend", goal: "Build interactive user interfaces" },
  { number: 3, title: "Full stack", goal: "Add servers, APIs and a database" },
  { number: 4, title: "AI engineering", goal: "Put AI features into your apps" },
];

export const courses: Course[] = [
  {
    slug: "html5",
    name: "HTML5 Fundamentals",
    short: "HTML5",
    stage: 1,
    level: "Beginner",
    summary: "Structure web pages the right way with semantic, accessible HTML.",
    topics: [
      "Document structure and semantic elements",
      "Links, images, media and tables",
      "Forms, inputs and validation",
      "Accessibility basics and ARIA",
      "SEO-friendly markup and meta tags",
    ],
    project: "A multi-page personal portfolio site.",
  },
  {
    slug: "css3",
    name: "CSS3 and Responsive Design",
    short: "CSS3",
    stage: 1,
    level: "Beginner",
    summary: "Style pages that look great on every screen size.",
    topics: [
      "Selectors, the cascade and specificity",
      "The box model and typography",
      "Flexbox and CSS Grid layouts",
      "Media queries and mobile-first design",
      "Transitions and animations",
    ],
    project: "A fully responsive landing page.",
  },
  {
    slug: "javascript",
    name: "Modern JavaScript",
    short: "JavaScript",
    stage: 1,
    level: "Beginner",
    summary: "Learn the language of the web, from basics to async code.",
    topics: [
      "Variables, functions, arrays and objects",
      "ES6+ syntax: arrow functions, destructuring, modules",
      "DOM manipulation and events",
      "Promises, async/await and fetch",
      "Error handling and debugging",
    ],
    project: "An interactive quiz app that loads questions from an API.",
  },
  {
    slug: "tailwind-css",
    name: "Tailwind CSS",
    short: "Tailwind CSS",
    stage: 2,
    level: "Beginner",
    summary: "Build polished interfaces fast with utility-first CSS.",
    topics: [
      "Utility-first workflow",
      "Responsive and state variants",
      "Theme customization and design tokens",
      "Reusable component patterns",
      "Dark mode",
    ],
    project: "A dashboard UI built entirely with Tailwind.",
  },
  {
    slug: "reactjs",
    name: "React.js",
    short: "React.js",
    stage: 2,
    level: "Intermediate",
    summary: "Build component-based user interfaces with React.",
    topics: [
      "JSX, components and props",
      "State and the useState / useEffect hooks",
      "Forms and controlled inputs",
      "Context and custom hooks",
      "Fetching and displaying API data",
    ],
    project: "A task manager app with filters and local persistence.",
  },
  {
    slug: "nextjs",
    name: "Next.js",
    short: "Next.js",
    stage: 3,
    level: "Intermediate",
    summary: "Build full stack React apps with the Next.js App Router.",
    topics: [
      "App Router, layouts and routing",
      "Server and client components",
      "Server actions and route handlers",
      "Authentication basics",
      "Deploying to production",
    ],
    project: "A full stack blog with authentication.",
  },
  {
    slug: "postgresql",
    name: "PostgreSQL and Prisma",
    short: "PostgreSQL",
    stage: 3,
    level: "Intermediate",
    summary: "Design and query relational databases, then use them from Next.js.",
    topics: [
      "SQL queries, joins and aggregates",
      "Schema design and relations",
      "Indexes and performance basics",
      "Prisma ORM: schema, migrations, queries",
      "Hosted Postgres (Neon, Railway)",
    ],
    project: "A database-backed course enrollment system.",
  },
  {
    slug: "ai-for-developers",
    name: "AI for Developers",
    short: "AI",
    stage: 4,
    level: "Intermediate",
    summary: "Understand how modern AI works and where it fits in an app.",
    topics: [
      "How large language models work",
      "Prompt engineering techniques",
      "Embeddings and vector search",
      "Retrieval-augmented generation (RAG) concepts",
      "Responsible AI, cost and safety",
    ],
    project: "A prompt playground that compares different prompting styles.",
  },
  {
    slug: "openai-api",
    name: "OpenAI API",
    short: "OpenAI",
    stage: 4,
    level: "Intermediate",
    summary: "Ship AI features with the OpenAI API in a Next.js app.",
    topics: [
      "Chat completions and streaming",
      "Function calling and structured output",
      "Building a RAG pipeline with Postgres",
      "AI chat assistants",
      "Rate limits, costs and error handling",
    ],
    project: "An AI assistant that answers questions from your own data.",
  },
];

export const capstone = {
  title: "Capstone project",
  goal: "Ship a deployed AI app",
  description:
    "Build and deploy an AI-powered analytics app with Next.js, PostgreSQL and OpenAI, the same stack behind production apps like CricketTips.ai.",
  stack: ["Next.js", "Tailwind CSS", "PostgreSQL", "OpenAI API"],
};

export function getCourse(slug: string) {
  return courses.find((c) => c.slug === slug);
}

export function coursesInStage(stage: number) {
  return courses.filter((c) => c.stage === stage);
}

export const courseOptions = [
  { value: PROGRAM.slug, label: `${PROGRAM.name} (full program)` },
  ...courses.map((c) => ({ value: c.slug, label: c.name })),
];
