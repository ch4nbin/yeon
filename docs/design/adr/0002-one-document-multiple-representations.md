# ADR 0002: Use one document model with multiple representations

- Status: Accepted
- Date: 2026-09-28

## Context

Developers need typed objects, machines need deterministic serialization, and LLMs may
benefit from a compact text form. Treating each representation as its own model would
duplicate semantics and create drift between runtime behavior and wire formats.

## Decision

Yeon has one logical document model. Python SDK objects, canonical JSON, and Compact
Yeon represent that same document.

Canonical JSON is the deterministic machine encoding. Compact Yeon is an optional
LLM-facing encoding with its own parser and serializer. Both codecs translate directly
to and from the document model.

Compact Yeon will remain optional and will be retained only if benchmarks demonstrate
a meaningful advantage over JSON.

## Consequences

- Validation and runtime behavior share one semantic source of truth.
- Round-trip equivalence becomes a core conformance requirement.
- Callers can use typed objects without ever using Compact Yeon.
- Codec failures can be isolated from document and runtime semantics.
- Compact syntax can change or be removed without replacing the document model.

## Alternatives considered

- **JSON as the internal model:** simple initially, but exposes encoding choices
  throughout the SDK and runtime.
- **Separate text and JSON models:** allows independent evolution, but creates semantic
  duplication and conversion drift.
- **Compact Yeon as the only wire format:** maximizes product differentiation, but makes
  unproven syntax mandatory for every integration.
