# Protocol documentation

Yeon v1 has an accepted protocol shape but no normative field-level specification yet.

## Accepted shape

- One logical Yeon document model
- Four document kinds: `Handoff`, `Result`, `Error`, and `Event`
- Named, versioned schemas for typed input and output
- Canonical JSON as the deterministic machine encoding
- Compact Yeon as an optional LLM-facing text encoding
- Explicit protocol and schema version information
- Framework-neutral core documents

The Python SDK should expose typed objects and `parse`, `validate`, `encode`, and
`decode` operations. The in-process runtime consumes and produces the same documents.

## Representation flow

```text
Compact Yeon -> parse -----+
                           v
                     Yeon document
                           ^
Canonical JSON -> decode --+
```

Serialization and encoding run in the opposite direction. Codecs never define separate
document semantics.

## Still unresolved

No document field schema, value model, compact grammar, canonicalization algorithm,
compatibility policy, error code set, retry contract, or event ordering guarantee is
normative yet. Each requires a focused specification and externally observable
conformance cases.

Compact Yeon remains conditional: benchmarks must show a meaningful improvement over
formatted and minified JSON in token use, valid output rate, generation accuracy, parse
failure rate, latency, or cost.
