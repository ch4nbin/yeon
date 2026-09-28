import Image from "next/image";
import Link from "next/link";
import styles from "./docs.module.css";

type NavigationGroup = {
  label: string;
  links: Array<{
    label: string;
    href: string;
    active?: boolean;
    external?: boolean;
  }>;
};

const navigation: NavigationGroup[] = [
  {
    label: "Overview",
    links: [
      { label: "Introduction", href: "#introduction", active: true },
      { label: "Why Yeon", href: "#why-yeon" },
      { label: "Current scope", href: "#current-scope" },
    ],
  },
  {
    label: "Core format",
    links: [
      { label: "Document model", href: "#document-model" },
      { label: "Canonical JSON", href: "#canonical-json" },
      { label: "Compact syntax", href: "#compact-syntax" },
    ],
  },
  {
    label: "Resources",
    links: [
      { label: "Architecture", href: "#architecture" },
      { label: "Roadmap", href: "#roadmap" },
      { label: "GitHub", href: "https://github.com/ch4nbin/yeon", external: true },
    ],
  },
];

export default function DocsPage() {
  return (
    <main className={styles.docsRoot}>
      <div className={styles.docsFrame}>
        <aside className={styles.sidebar}>
          <Link className={styles.brand} href="/" aria-label="Yeon home">
            <Image
              src="/yeon/yeon-assets/yeon_logo.svg"
              alt=""
              width={22}
              height={22}
              aria-hidden="true"
            />
            <span>Yeon</span>
          </Link>

          <nav className={styles.navigation} aria-label="Documentation sections">
            {navigation.map((group) => (
              <div className={styles.navGroup} key={group.label}>
                <p>{group.label}</p>
                {group.links.map((link) => (
                  <a
                    className={link.active ? styles.activeNavLink : styles.navLink}
                    href={link.href}
                    key={link.label}
                    {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    {link.label}
                    {link.external && <span aria-hidden="true"> ↗</span>}
                  </a>
                ))}
              </div>
            ))}
          </nav>
        </aside>

        <article className={styles.content}>
          <header className={styles.utilityBar}>
            <span>core v1 · discovery</span>
            <a href="https://github.com/ch4nbin/yeon" target="_blank" rel="noreferrer">
              github.com/ch4nbin/yeon <span aria-hidden="true">↗</span>
            </a>
          </header>

          <section id="introduction" className={styles.introduction}>
            <p className={styles.eyebrow}>Documentation</p>
            <h1>A shared language for agents.</h1>
            <p className={styles.lead}>
              Yeon is an early, typed interchange format for communication between AI
              agents. One document model will connect compact Yeon text, canonical JSON,
              and Python objects.
            </p>
          </section>

          <figure className={styles.formatPreview} aria-labelledby="format-preview-caption">
            <div className={styles.previewChrome}>
              <span />
              <span />
              <span />
              <p>handoff.yeon</p>
              <small>concept</small>
            </div>
            <pre>
              <code>{`handoff research_company @1
  planner -> researcher

  in
    company: "OpenAI"

  out ResearchReport
  within 30s`}</code>
            </pre>
            <figcaption id="format-preview-caption">
              Illustrative syntax. The grammar is still being designed.
            </figcaption>
          </figure>

          <section id="why-yeon" className={styles.section}>
            <div className={styles.sectionHeading}>
              <h2>Why Yeon</h2>
              <span />
            </div>
            <p>
              JSON is portable, but it does not describe agent intent, expected output,
              deadlines, schema identity, or canonical representation. Yeon aims to make
              those ideas explicit while remaining easy to convert to JSON.
            </p>
            <ul className={styles.featureList}>
              <li>
                <strong>Typed</strong>
                <span>Validate inputs and outputs against named schemas.</span>
              </li>
              <li>
                <strong>Compact</strong>
                <span>Reduce repeated structure and measure token use against JSON.</span>
              </li>
              <li>
                <strong>Deterministic</strong>
                <span>Give equivalent documents one canonical representation.</span>
              </li>
              <li>
                <strong>Portable</strong>
                <span>Keep the model independent of providers and transports.</span>
              </li>
            </ul>
          </section>

          <aside className={styles.note}>
            <span className={styles.noteMark} aria-hidden="true">緣</span>
            <p>
              Yeon is in discovery. Examples on this page explain the direction and are
              not yet a stable protocol contract.
            </p>
          </aside>

          <section id="current-scope" className={styles.section}>
            <div className={styles.sectionHeading}>
              <h2>Current scope</h2>
              <span />
            </div>
            <ol className={styles.steps}>
              <li id="document-model">
                <span>01</span>
                <div>
                  <h3>Document model</h3>
                  <p>Define the values and document kinds shared by every representation.</p>
                </div>
              </li>
              <li id="canonical-json">
                <span>02</span>
                <div>
                  <h3>Canonical JSON</h3>
                  <p>Create a deterministic, hashable representation for interoperability.</p>
                </div>
              </li>
              <li id="compact-syntax">
                <span>03</span>
                <div>
                  <h3>Compact syntax</h3>
                  <p>Design a concise grammar that agents can generate reliably.</p>
                </div>
              </li>
              <li>
                <span>04</span>
                <div>
                  <h3>Python SDK</h3>
                  <p>Parse, validate, encode, and use Yeon documents in existing flows.</p>
                </div>
              </li>
            </ol>
          </section>

          <section id="architecture" className={styles.section}>
            <div className={styles.sectionHeading}>
              <h2>Architecture</h2>
              <span />
            </div>
            <div className={styles.pipeline} aria-label="Yeon representation flow">
              <code>Yeon text</code>
              <span aria-hidden="true">↔</span>
              <code>document</code>
              <span aria-hidden="true">↔</span>
              <code>JSON</code>
            </div>
            <p>
              The Python SDK and in-process runtime will use the same document model.
              Durable and distributed execution remain later additions.
            </p>
          </section>

          <section id="roadmap" className={styles.section}>
            <div className={styles.sectionHeading}>
              <h2>What comes next</h2>
              <span />
            </div>
            <p>
              We are defining representative messages and measurable success criteria
              before locking the grammar. SDK guides and runnable examples will replace
              these concept notes as the implementation becomes real.
            </p>
            <div className={styles.pageLinks}>
              <a href="https://github.com/ch4nbin/yeon/tree/main/docs" target="_blank" rel="noreferrer">
                Read the working docs <span aria-hidden="true">↗</span>
              </a>
              <Link href="/">Return to Yeon</Link>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
