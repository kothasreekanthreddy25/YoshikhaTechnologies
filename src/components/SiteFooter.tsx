import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-muted">
        <span className="font-bold text-ink">Yoshikha Technologies</span>
        <nav className="flex flex-wrap gap-6">
          <Link href="/courses" className="hover:text-ink">Courses</Link>
          <Link href="/signup" className="hover:text-ink">Student signup</Link>
        </nav>
        <span>© {new Date().getFullYear()} Yoshikha Technologies</span>
      </div>
    </footer>
  );
}
