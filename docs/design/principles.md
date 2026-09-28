# Design principles and direction

The initial project brief proposes that humans use natural language while agents may
communicate through typed structures, with learned latent communication as a possible
research direction. It also proposes validation, routing, tracing, and orchestration
as potential product capabilities.

These statements capture the brief's direction; they are not binding system design
principles or implemented behavior. Promote a proposal to an accepted rule only after
it is deliberately decided and, when architecturally significant, recorded as an ADR.

## Current product direction

The user wants Yeon to become a useful developer tool with a design credible to product
users and technical interviewers. The initial product problem is typed, compact,
machine-verifiable communication between agents.

Working v1 direction:

- Define one agent-oriented document model shared by compact Yeon text, canonical JSON, and Python objects.
- Prioritize deterministic parsing, validation, agent-specific semantics, and measured token efficiency.
- Build a Python codec and schema integration before adding network infrastructure.
- Use an in-process handoff runtime to prove the format against real agent workflows.
- Defer durable and distributed execution until the core interfaces are stable.

These are current design choices, not yet a complete protocol or implementation spec.
