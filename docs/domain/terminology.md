# Terminology

These terms define the accepted v1 domain language. Field-level and wire-level
semantics remain unresolved until protocol specifications and conformance cases exist.

| Term | Yeon meaning | Status |
|---|---|---|
| Agent | A callable participant registered with the runtime under a target name. | V1 |
| Yeon document | The typed semantic object shared by SDK objects and all encodings. | V1 |
| Handoff | A request to execute a named target with typed input and expected output. | V1 |
| Result | The successful terminal response to a handoff. | V1 |
| Error | The failed terminal response to a handoff. | V1 |
| Event | A structured observation about a handoff lifecycle. Events do not replace the terminal Result or Error. | V1 |
| Schema | A named, versioned contract used to validate document input or output. | V1; compatibility rules open |
| Compact Yeon | The optional LLM-facing textual encoding of a Yeon document. | V1 research target; grammar open |
| Canonical JSON | The deterministic machine-facing encoding of a Yeon document. | V1; canonical rules open |
| Python SDK | Typed document objects and interfaces for parse, validate, encode, and decode operations. | V1 |
| Runtime | The in-process execution engine that validates and dispatches handoffs to registered agents. | V1 |
| Agent registry | The runtime mapping from a handoff target name to a callable agent. | V1 |
| Trace | Structured records associated with a handoff or trace identifier. | V1; field model open |
| Renderer | A consumer that turns structured runtime events into a presentation such as CLI output. | V1 |
| Adapter | An integration that connects a framework, provider, or presentation layer to a Yeon interface. | V1 |

Learned latent representations remain a research idea and are not part of v1.
