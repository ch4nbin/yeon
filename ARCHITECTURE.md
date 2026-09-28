# Architecture

## Current state

The repository contains a Next.js landing page deployed under `/yeon` and project
documentation. The Yeon format, Python SDK, runtime, protocol, and conformance suite
have not been implemented yet. No backend module boundaries or normative protocol
semantics exist today.

## Project direction in the brief

The [project brief](docs/archive/project-brief.md) explores a flow from a human request through planning and a
structured execution graph to specialized agents, then back to a human-readable
response. It also proposes typed messages and, as a separate research direction,
compressed latent representations. These are ideas from the brief, not an implemented
architecture or an accepted protocol design.

The bootstrap plan names protocol, runtime, transport, and adapter responsibilities as
possible boundaries. No code currently confirms those boundaries. Future architecture
documentation should describe actual dependency direction, data flow, validation,
state transitions, and extension points once they exist.

## Working core direction

The current direction is an agent-oriented document format with multiple equivalent
representations:

```text
compact Yeon text <-> Yeon document model <-> canonical JSON
                                      ^
                                      |
                               Python SDK objects
```

The first implementation should establish the document model, canonical JSON rules,
compact syntax, schema validation, and Python codec. An in-process handoff runtime can
then prove the format in real agent workflows while the host application retains
ownership of model and provider calls.

Remote execution, durable recovery, queues, worker coordination, and horizontal scaling
are deferred. The core representation should remain transport independent so those
features can be added later without changing application payloads.

## Open questions

- Which concrete document kinds belong in the first version?
- Which types must the document model support beyond JSON?
- What canonicalization and schema compatibility rules are required?
- What compact syntax is measurably better than minified JSON for agent generation?
- Which lifecycle behavior belongs in the later in-process runtime?
