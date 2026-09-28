import Link from "next/link";
import { HeroBackground } from "./_components/hero-background";
import { InstallCommand } from "./_components/install-command";

export default function Home() {
  return (
    <main className="page-shell">
      <HeroBackground />

      <section className="dictionary" aria-labelledby="wordmark">
        <h1 className="wordmark" id="wordmark">
          <span>Yeon</span>
          <span className="pronunciation">/jʌn/</span>
        </h1>

        <ol className="definitions">
          <li>
            <span className="term">연 (緣)</span> <span className="part-of-speech">n.</span>{" "}
            a bond between people, attributed to fate rather than choice.
          </li>
          <li>
            a typed protocol and local runtime for reliable handoffs between ai agents.
          </li>
        </ol>

        <InstallCommand />

        <nav className="project-links" aria-label="Project links">
          <a href="https://github.com/ch4nbin/yeon">github</a>
          <Link href="/docs">docs</Link>
          <Link href="/docs#roadmap">roadmap</Link>
        </nav>
      </section>
    </main>
  );
}
