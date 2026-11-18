import Link from "next/link";

export default function SiteHeader() {
  return (
    <header>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <Link href="/" className="text-lg font-extrabold text-ink">
          Yoshikha <span className="text-brand">Technologies</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-6 text-[15px] font-medium text-muted">
          <Link href="/#roadmap" className="hover:text-ink">
            Roadmap
          </Link>
          <Link href="/courses" className="hover:text-ink">
            Courses
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-brand px-5 py-3 font-semibold text-white hover:bg-brand-dark"
          >
            Sign up
          </Link>
        </nav>
      </div>
    </header>
  );
}
