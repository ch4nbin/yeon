import Link from "next/link";
import { DocsSidebar } from "./docs-sidebar";
import styles from "./docs.module.css";

export default function DocsPage() {
  return (
    <main className={styles.docsRoot}>
      <DocsSidebar />

      <article className={styles.article}>
        <header className={styles.utilityBar}>
          <span>pre-alpha · protocol design</span>
          <a href="https://github.com/ch4nbin/yeon" target="_blank" rel="noreferrer">
            view on github <span aria-hidden="true">↗</span>
          </a>
        </header>

        <section id="introduction" className={styles.introduction}>
          <h1>Yeon documentation</h1>
          <p>
            Yeon is a framework-neutral protocol and Python runtime for typed handoffs
            between AI agents. It gives different frameworks one document model,
            lifecycle, and observability surface.
          </p>
        </section>

        <figure className={styles.formatPreview} aria-labelledby="format-preview-caption">
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
          <h2>Why Yeon</h2>
          <p>
            Agent frameworks already support structured values. Yeon focuses on the
            contract between agents: what work was requested, which schemas apply, how
            execution progresses, and how the outcome is represented across frameworks.
          </p>
          <ul>
            <li><strong>Typed:</strong> validate inputs and outputs against named schemas.</li>
            <li><strong>Observable:</strong> describe lifecycle changes with structured events.</li>
            <li><strong>Deterministic:</strong> give equivalent documents one canonical representation.</li>
            <li><strong>Portable:</strong> keep documents independent of providers and transports.</li>
          </ul>
        </section>

        <aside className={styles.note}>
          Yeon is in discovery. The examples here describe the direction of the project,
          not a stable protocol contract.
        </aside>

        <section id="documents" className={styles.section}>
          <h2>Documents</h2>
          <dl className={styles.referenceList}>
            <div>
              <dt>Handoff</dt>
              <dd>A request to run a named target with typed input and expected output.</dd>
            </div>
            <div>
              <dt>Result</dt>
              <dd>The successful terminal response to a handoff.</dd>
            </div>
            <div>
              <dt>Error</dt>
              <dd>The failed terminal response to a handoff.</dd>
            </div>
            <div>
              <dt>Event</dt>
              <dd>A structured observation about the handoff lifecycle.</dd>
            </div>
          </dl>
        </section>

        <section id="representations" className={styles.section}>
          <h2>Representations</h2>
          <div className={styles.pipeline} aria-label="Yeon representation flow">
            <code>Compact Yeon&nbsp; ↔ &nbsp;document&nbsp; ↔ &nbsp;canonical JSON</code>
          </div>
          <p>
            These are three representations of one logical document. Canonical JSON is
            deterministic and machine-facing. Compact Yeon is optional, LLM-facing, and
            will remain only if benchmarks show an advantage over JSON.
          </p>
        </section>

        <section id="schemas" className={styles.section}>
          <h2>Schemas</h2>
          <p>
            Named, versioned schemas validate inputs before an agent runs and validate
            outputs before a result is returned. Identity, compatibility, and evolution
            rules are still being designed.
          </p>
        </section>

        <section id="runtime" className={styles.section}>
          <h2>Local runtime</h2>
          <p>
            V1 runs registered agents in one Python process. The runtime validates a
            handoff, finds its target, executes it, validates the output, and returns a
            Result or Error.
          </p>
          <ol>
            <li>Receive and validate the Handoff.</li>
            <li>Resolve the target in the local agent registry.</li>
            <li>Execute with deadlines, cancellation, and retries.</li>
            <li>Validate output and emit the terminal document.</li>
          </ol>
        </section>

        <section id="lifecycle" className={styles.section}>
          <h2>Lifecycle</h2>
          <div className={styles.pipeline} aria-label="Handoff lifecycle">
            <code>pending&nbsp; → &nbsp;running&nbsp; → &nbsp;completed | failed | cancelled</code>
          </div>
          <p>
            The runtime emits structured events for each lifecycle change. CLI logs and
            traces consume those events now; a future web interface can consume the same
            stream later.
          </p>
        </section>

        <section id="integrations" className={styles.section}>
          <h2>Integrations</h2>
          <p>
            OpenAI, Anthropic, LangChain, LangGraph, MCP, and custom agents connect
            through adapters. Provider-specific objects stay outside the core document
            model.
          </p>
        </section>

        <section id="roadmap" className={styles.section}>
          <h2>What comes next</h2>
          <p>
            Work begins with documents, schemas, the Python SDK, and the local runtime.
            Canonical JSON, Compact Yeon, CLI tracing, benchmarks, and integrations
            follow. Persistence, remote workers, durable queues, load balancing, and
            multi-tenant infrastructure are deferred.
          </p>
          <div className={styles.pageLinks}>
            <a
              href="https://github.com/ch4nbin/yeon/tree/main/docs"
              target="_blank"
              rel="noreferrer"
            >
              Working notes <span aria-hidden="true">↗</span>
            </a>
            <Link href="/">Yeon home</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
