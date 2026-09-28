# Protocol documentation

There is currently no normative Yeon protocol specification. The README's JSON and DSL
snippets are illustrative proposals only. No message schema, wire format, error model,
versioning rule, capability negotiation, or delegation semantics has been established.

Add focused protocol documents only when those areas are designed. Protocol changes
should link to relevant domain invariants, ADRs, and externally observable conformance
tests. Do not treat research or examples as normative by themselves.

## Planned core work

The agreed implementation order begins with an abstract Yeon document model, canonical
JSON representation, compact Yeon syntax, schema validation, and a Python codec. The
exact document kinds, types, grammar, canonicalization rules, compatibility behavior,
and error model remain open and must be resolved in an active specification before
they become normative.
