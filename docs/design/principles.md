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
users and technical interviewers. The initial product problem is reliable handoffs
between agent calls.

Working v1 direction:

- Provide an in-process SDK/runtime rather than requiring every model call to pass through a hosted proxy.
- Let the host application provide agent handlers and own its model/provider calls.
- Have Yeon coordinate handoffs and validate/correlate results while the application is running.
- Do not promise persistence or recovery across process restarts in v1.

These are current design choices, not yet a complete protocol or implementation spec.
