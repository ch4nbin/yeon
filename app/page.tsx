import Image from "next/image";
import { InstallCommand } from "./install-command";

export default function Home() {
  return (
    <main className="page-shell">
      <div className="hero-background" aria-hidden="true">
        <Image
          src="/yeonhero-hq.png"
          alt=""
          fill
          sizes="100vw"
          preload
          className="hero-art"
        />
      </div>

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
            an in-process sdk and runtime for reliable, typed handoffs between ai agents.
          </li>
        </ol>

        <InstallCommand />

        <nav className="project-links" aria-label="Project links">
          <a href="https://github.com/ch4nbin/yeon">github</a>
          <a href="https://github.com/ch4nbin/yeon/tree/main/docs">docs</a>
          <a href="https://www.npmjs.com/package/yeon">npm</a>
        </nav>
      </section>
    </main>
  );
}
