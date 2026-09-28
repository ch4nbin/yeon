# Future directions

These ideas are intentionally outside v1. They are candidates rather than commitments.
Promote one to an active specification only when the local protocol and runtime provide
evidence for the problem it solves.

## Distributed runtime

- Persist handoff and attempt state across process restarts.
- Execute work on remote workers.
- Add durable queues and explicit delivery guarantees.
- Coordinate idempotency, leases, heartbeats, retries, and fencing tokens.
- Route work by agent capability and capacity.
- Scale stateless gateways behind a load balancer.
- Add multi-tenant authentication, quotas, and isolation.

## Product surfaces

- Web dashboard consuming the same structured event and trace stream as the CLI.
- Hosted trace storage and cross-run inspection.
- Shared schema registry and compatibility tooling.

## Research

- Learned latent representations between compatible models.
- Binary or compressed encodings beyond Compact Yeon.
- Capability negotiation across heterogeneous runtimes.

Distribution work begins only after the local runtime proves the document model,
lifecycle, failure semantics, and observability interface. Core documents must remain
transport independent so distribution does not change application payloads.
