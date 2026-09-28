# Architecture

## Current state

The repository contains a Next.js landing page and starter documentation deployed
under `/yeon`. The Yeon protocol, Python SDK, runtime, codecs, CLI, and conformance
suite have not been implemented.

The v1 architecture is agreed at a conceptual level. Exact document fields, value
types, grammar, canonicalization rules, compatibility policy, and retry semantics
remain design work and must not be presented as implemented behavior.

## V1 system

Yeon v1 is a framework-neutral communication protocol with a Python SDK and local,
in-process runtime.

```text
Developer code
    -> Yeon document
    -> input schema validation
    -> in-process runtime
    -> registered agent
    -> output schema validation
    -> Result or Error
```

The document model is the center of the system:

```text
Compact Yeon <-> Yeon document <-> Canonical JSON
                       ^
                       |
               Python SDK objects
```

Compact Yeon and canonical JSON are encodings of the same logical document. Neither
defines a separate data model.

## Target modules

These names describe responsibilities and seams. They do not prescribe package paths
until implementation establishes them.

### Document model

Defines the meaning of `Handoff`, `Result`, `Error`, and `Event`. Every codec,
validator, runtime operation, and integration depends on this model.

### Schema system

Identifies and versions schemas, validates handoff inputs before execution, and
validates outputs before returning them downstream. Compatibility rules are still open.

### Codecs

- **Canonical JSON** provides deterministic machine serialization for hashing, caching,
  comparison, signing, storage, and reproducibility.
- **Compact Yeon** provides optional LLM-facing text through a grammar, parser, and
  serializer. It remains optional unless benchmarks show a meaningful advantage over
  JSON.

Both codecs translate through the document model rather than through each other.

### Python SDK

Exposes typed document objects and a small interface for parsing, validating, encoding,
and decoding. Pydantic integration should make schemas ergonomic without making the
core protocol depend on an agent framework.

### In-process runtime

Owns the local agent registry and executes typed handoffs. Its responsibilities are
registration, validation, target lookup, execution, deadlines, cancellation, retries,
structured errors, lifecycle state, traces, and event emission.

The protocol describes what a handoff means. The runtime makes that handoff happen.

### Observability and presentation

The runtime emits structured `Event` documents. Logs, traces, and the v1 CLI consume
those events through renderer interfaces. The runtime does not write directly to a
terminal, which leaves the same event stream available to a future web interface.

### Integrations

OpenAI, Anthropic, LangChain, LangGraph, MCP, and custom agents belong at adapter seams
outside the document model. Provider-specific types must not leak into core documents.

## Dependency direction

```text
CLI renderer -----+
Tracing adapter --+--> runtime --> schemas --> document model
Framework adapter-+       |                       ^
                          +--> codecs ------------+
```

The document model has no runtime, provider, transport, or presentation dependency.
Codecs do not execute agents. Renderers consume events and do not control runtime state.

## Deferred distribution

V1 does not include persistent handoff state, remote workers, durable queues, delivery
guarantees, idempotency records, leases, heartbeats, capability routing, load balancing,
horizontal scaling, or a multi-tenant control plane.

The document model stays transport independent so those features can be introduced
later without changing application payloads.

## Open decisions

- Exact fields and supported value types for each document kind
- Schema identity, versioning, and compatibility rules
- Canonical ordering and encoding rules for strings, numbers, nulls, and absent values
- Compact Yeon grammar and actionable parse error model
- Deadline, cancellation, and retry transition semantics
- Trace context fields and event ordering guarantees
- Benchmark corpus, models, and thresholds required to retain Compact Yeon

See [ADR 0001](design/adr/0001-v1-local-runtime.md) and
[ADR 0002](design/adr/0002-one-document-multiple-representations.md).
