# Domain invariants

The following rules define the accepted v1 architecture. Exact field and encoding rules
remain open until specified under `docs/protocol/` and covered by conformance tests.

1. **One logical document model.** Python objects, Compact Yeon, and canonical JSON are
   representations of the same Yeon document.
2. **Four document kinds.** V1 documents are `Handoff`, `Result`, `Error`, or
   `Event`.
3. **Validation surrounds execution.** A handoff input is validated before its target
   runs, and successful output is validated before it is returned downstream.
4. **One terminal outcome.** A handoff finishes with either `Result` or `Error`.
5. **Protocol and runtime have separate jobs.** Documents describe the requested work
   and its outcome; the runtime performs execution and lifecycle management.
6. **Core semantics are framework neutral.** Provider and framework objects do not
   appear in the document model.
7. **Encodings are optional at the runtime seam.** Callers can use typed SDK objects
   without producing Compact Yeon text.
8. **Observability starts with structured events.** Runtime logs and traces derive from
   emitted `Event` documents rather than terminal-specific side effects.
9. **Distribution is outside v1 guarantees.** V1 provides no durable state, remote
   execution, delivery guarantee, worker coordination, or horizontal scaling contract.

See [ADR 0001](../design/adr/0001-v1-local-runtime.md) and
[ADR 0002](../design/adr/0002-one-document-multiple-representations.md).
