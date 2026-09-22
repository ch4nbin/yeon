# Terminology

No canonical Yeon glossary has been agreed. This page records how terms appear in the
initial project brief; it does not define protocol semantics.

| Term | Use in the brief | Status |
|---|---|---|
| Agent | A specialized LLM/tool participant in an example workflow. | Provisional |
| Typed message | A proposed structured request or result with named fields and a return shape. | Proposal; no schema defined |
| Query language / DSL | A possible human-readable form for declaring tasks and constraints. | Proposal; no grammar defined |
| Latent representation | A possible compressed machine-facing representation between models. | Research direction; no encoding defined |
| Hidden state, logits, KV cache, weights | Model concepts discussed as possible internal information. | Explanatory terms only; no Yeon behavior defined |

When a term becomes part of an implemented design, record its Yeon-specific meaning
here and link the protocol docs or ADR that establish it.
