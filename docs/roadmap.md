# Future directions

Keep ideas that are useful but intentionally outside the current v1 scope here. These
are candidates, not commitments; revisit them when a concrete use case requires them.

## Deferred distributed runtime

- Recover handoffs across process restarts.
- Persist handoff and attempt state.
- Execute work on remote workers.
- Add durable queues and at-least-once delivery.
- Coordinate idempotency, worker leases, heartbeats, retries, and fencing tokens.
- Route work by agent capability and capacity.
- Scale stateless gateways behind a load balancer.
- Add multi-tenant authentication, quotas, and isolation.

These features remain relevant, but the document model, canonical JSON, compact syntax,
schema validation, Python codec, and in-process runtime come first. The core format
should stay transport independent so distribution can be added without changing user
payloads.

Add future ideas here as they come up, with the problem they address and the reason they
were deferred. Promote an item to an active spec only after agreeing on its scope.
