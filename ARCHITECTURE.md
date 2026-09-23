# Architecture

## Current state

The repository currently contains project documentation only. It has no source code,
package configuration, runtime, transport, adapters, tests, or build system. Therefore
there are no implemented module boundaries, dependency directions, public/internal
interfaces, validation points, lifecycle transitions, or integration points to describe.

## Project direction in the brief

The [project brief](docs/project-brief.md) explores a flow from a human request through planning and a
structured execution graph to specialized agents, then back to a human-readable
response. It also proposes typed messages and, as a separate research direction,
compressed latent representations. These are ideas from the brief, not an implemented
architecture or an accepted protocol design.

The bootstrap plan names protocol, runtime, transport, and adapter responsibilities as
possible boundaries. No code currently confirms those boundaries. Future architecture
documentation should describe actual dependency direction, data flow, validation,
state transitions, and extension points once they exist.

## Working v1 direction

The current direction is an SDK with an in-process handoff runtime:

```text
Host application
    -> Yeon SDK/runtime
    -> application-registered agent handler
    -> host application's model/provider calls
    -> validated result returned to the caller
```

Yeon would coordinate a handoff and validate/correlate its result; the host application
would retain ownership of model calls. The initial reliability target covers work while
the application process is running. Durable recovery across restarts is deferred. The
exact interface, payload schema, retry policy, persistence model, and trace format remain
open; this sketch is not normative.

## Open questions

- What is the initial implemented use case and execution model?
- Which components and boundaries are needed by that use case?
- What, if anything, is exchanged in a normative wire protocol?
- Where should validation and lifecycle ownership live?
