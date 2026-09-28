# Core v1

## Status

Architecture accepted; document fields, codec rules, and runtime semantics remain in
discovery.

## Goal

Create a framework-neutral protocol and Python runtime for typed handoffs between AI
agents. Prove the document model and lifecycle locally before adding distributed
execution.

## Planned sequence

1. Define representative `Handoff`, `Result`, `Error`, and `Event` documents.
2. Design the document value model and schema system.
3. Implement typed Python SDK objects with Pydantic integration.
4. Implement the in-process registry and runtime.
5. Specify and implement canonical JSON.
6. Design and implement Compact Yeon if early evidence supports it.
7. Add the CLI renderer, structured events, and trace inspection.
8. Benchmark encodings and build framework adapters.
9. Publish verified examples, SDK reference, and protocol documentation.

## In scope

- Four v1 document kinds
- Named, versioned input and output schemas
- Python SDK objects and validation
- Local agent registry and typed handoff execution
- Deadlines, cancellation, retries, and structured errors
- Lifecycle events and traces
- Deterministic canonical JSON codec
- Optional Compact Yeon parser and serializer
- CLI runtime and inspection experience
- Conformance fixtures and encoding benchmarks
- At least one provider or framework adapter proving neutrality

## Deferred

- Persistence and recovery across process restarts
- Remote workers and network transports
- Durable queues and delivery guarantees
- Idempotency records, leases, heartbeats, and fencing
- Capability routing and load balancing
- Horizontal scaling and multi-tenant control planes
- Web dashboard
- Learned latent representations

Deferred work is tracked in [the roadmap](../../roadmap.md).

## Required evidence

- Python, Compact Yeon, and canonical JSON representations round-trip to the same
  document.
- Invalid inputs fail before execution and invalid outputs fail before return.
- Canonical JSON is identical across repeated serialization.
- Runtime events describe successful, failed, retried, timed out, and cancelled work.
- Benchmarks compare Compact Yeon with formatted and minified JSON.
- At least one real workflow uses the SDK without provider-specific core code.
- Public documentation examples run against the released interface.

## Open decisions

- Document fields and supported value types
- Schema identity and compatibility rules
- Canonical JSON algorithm
- Compact Yeon grammar and retention threshold
- Runtime retry, deadline, and cancellation semantics
- Event ordering and trace context
- First integration used to prove framework neutrality
