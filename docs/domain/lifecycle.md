# Handoff lifecycle

V1 uses a local, in-process handoff lifecycle:

```text
pending -> running -> completed
                   -> failed
                   -> cancelled
```

- **pending**: the runtime has accepted the handoff but has not started the target.
- **running**: input validation passed and the target is executing.
- **completed**: output validation passed and the runtime produced a `Result`.
- **failed**: the runtime produced an `Error` because validation or execution failed.
- **cancelled**: execution stopped through cancellation and the runtime produced an
  `Error` representing that terminal outcome.

`Result` and `Error` are terminal documents. `Event` records lifecycle
observations such as `handoff.created`, `handoff.started`, `handoff.retrying`,
`handoff.completed`, `handoff.failed`, and `handoff.cancelled`.

Retries, deadlines, and cancellation belong to the v1 runtime, but their exact
transition rules, attempt identity, error codes, and event ordering are unresolved.
Those semantics require an active protocol specification and conformance coverage
before implementation.
