# Core v1

## Status

Discovery. Scope and implementation order are agreed; document semantics, grammar, and
interfaces remain unresolved.

## Goal

Create a useful agent-oriented interchange format with a compact textual form,
deterministic JSON representation, schema validation, and an ergonomic Python SDK.
Prove the format in an in-process handoff flow before adding distributed execution.

## Planned sequence

1. Define representative documents and measurable success criteria.
2. Design the abstract Yeon document model and supported value types.
3. Specify canonical JSON serialization and round-trip behavior.
4. Design and implement the compact Yeon grammar, parser, and serializer.
5. Integrate Python types and schema validation.
6. Add an in-process runtime for typed handoffs between registered handlers.
7. Publish verified examples, SDK reference, and format documentation.
8. Benchmark token use, generation accuracy, and parse failures against JSON.

## In scope

- Yeon document model
- Canonical JSON codec
- Compact text syntax
- Schema references and validation
- Python SDK objects and Pydantic integration
- Structured parse and validation errors
- In-process handoff runtime
- Conformance fixtures and benchmarks
- Runnable documentation examples

## Deferred

- Persistence and recovery across process restarts
- Remote workers and network transports
- Durable queues and delivery guarantees
- Worker discovery, leases, and capability routing
- Horizontal scaling and multi-tenant operation
- Learned latent representations

Deferred distributed work is tracked in [the roadmap](../../roadmap.md).

## Open decisions

- Which document kinds belong in the first release?
- Which value types are required beyond JSON's data model?
- How are absent values, nulls, numbers, Unicode, and field order canonicalized?
- How are schemas identified, versioned, and checked for compatibility?
- Which compact syntax is easiest for models to generate reliably?
- What lifecycle and error semantics should the in-process runtime expose?
- Which benchmark payloads and model providers produce representative evidence?

## Required evidence

- Text, JSON, and Python representations round-trip to the same document.
- Invalid documents fail with stable, actionable errors.
- Canonical JSON is deterministic across repeated serialization.
- Benchmarks compare Yeon with formatted and minified JSON.
- At least one real agent workflow uses the SDK without provider-specific core code.
- Public documentation examples run against the released interface.

## Documentation obligations

When an interface or behavior is implemented, update the corresponding protocol or SDK
documentation in the same change. Add executable examples and conformance coverage
before presenting behavior as stable.
