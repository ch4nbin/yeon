# ADR 0001: Build v1 as a framework-neutral protocol and local Python runtime

- Status: Accepted
- Date: 2026-09-28

## Context

Yeon could begin as a serialization format, provider-specific middleware, or a
distributed execution platform. A distributed first design would require persistence,
delivery guarantees, idempotency, worker coordination, routing, and operational
infrastructure before the core handoff semantics are proven.

AI agent development is centered heavily in Python, while target users already use
different provider SDKs and frameworks.

## Decision

V1 will provide a framework-neutral document protocol, Python SDK, and in-process
runtime. The runtime will own registration, validation, local execution, deadlines,
cancellation, retries, structured errors, lifecycle state, traces, and event emission.

Provider and framework support will use adapters outside the core. The first user
experience will be a CLI consuming structured runtime events. Distributed execution and
a web dashboard are deferred.

## Consequences

- The core can be tested without network infrastructure.
- Existing OpenAI, Anthropic, LangChain, LangGraph, MCP, and custom flows can integrate
  through adapters without changing document semantics.
- Python receives the first ergonomic SDK; other language SDKs can follow the protocol.
- V1 does not promise durability, remote work, delivery guarantees, or horizontal scale.
- Runtime event interfaces must remain presentation neutral so a later web UI can reuse
  them.

## Alternatives considered

- **Format only:** smaller scope, but insufficient to prove lifecycle and handoff
  ergonomics in real workflows.
- **Provider-specific middleware:** faster for one ecosystem, but compromises framework
  neutrality.
- **Distributed runtime first:** more infrastructure depth, but risks solving scaling
  before the protocol has demonstrated value.
