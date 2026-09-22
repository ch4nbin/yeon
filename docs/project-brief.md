# Agent Communication for LLM Systems

> **Project status:** This is an early project brief. The examples and architecture
> sketches below are exploratory proposals, not normative Yeon protocol behavior.
> No implementation, schemas, lifecycle, or compatibility rules are defined yet.

See [repository guidance](../AGENTS.md), [architecture](../ARCHITECTURE.md), and the
[documentation map](index.md).

## 1. The Core Idea

Instead of having agents communicate mainly through free-form natural language, they can exchange **structured, typed messages**.

Humans can still use natural language, but the internal system can convert requests into a more deterministic representation.

Example:

```text
Human request
    ↓
Planner LLM
    ↓
Structured query / intermediate representation
    ↓
Agent runtime
    ↓
Specialized agents / tools
    ↓
Structured result
    ↓
Final LLM response
```

A useful framing is:

> **Humans speak natural language. Agents communicate through a typed protocol.**

---

## 2. Structured Messages Between Agents

Instead of Agent A sending:

```text
"Can you check whether this customer qualifies for a refund and use the policy docs?"
```

it could send:

```json
{
  "task": "check_refund_eligibility",
  "inputs": {
    "customer_id": "123",
    "order_id": "456"
  },
  "constraints": {
    "must_use": ["refund_policy"],
    "confidence_min": 0.9
  },
  "return_schema": "RefundDecision"
}
```

Then Agent B could return:

```json
{
  "status": "complete",
  "decision": "eligible",
  "confidence": 0.96,
  "evidence": [
    "refund_policy_section_4"
  ]
}
```

This makes communication:

- less ambiguous
- easier to validate
- easier to route
- easier to log and debug
- cheaper in tokens
- more reliable for multi-agent workflows

---

## 3. A Query Language / Protocol for Agents

Instead of raw JSON, the communication layer could use a compact DSL.

Example:

```text
TASK refund_check

INPUT customer=123
INPUT order=456

USE refund_policy

REQUIRE confidence >= 0.9

RETURN RefundDecision
```

Or for a research workflow:

```text
AGENT researcher
GOAL find evidence about NVIDIA revenue growth
SOURCE web
RETURN ResearchResult
```

The researcher could return something typed like:

```text
RESULT ResearchResult

facts = [
    {
        claim: "Revenue increased",
        source: "...",
        confidence: 0.98
    }
]
```

Then another agent receives that as input:

```text
AGENT writer
INPUT ResearchResult
GOAL write investor summary
REQUIRE citations
RETURN Markdown
```

This is closer to an API protocol than agents casually talking to each other.

---

## 4. Why This Is Better Than Pure Natural Language

Natural language is flexible, but that flexibility creates ambiguity.

A structured protocol lets the runtime know exactly:

```text
what task is being requested
what inputs are required
what tools are allowed
what constraints must hold
what schema should come back
what confidence level is required
```

It also allows the system to reject malformed outputs.

For example, if a research agent must return:

```text
ResearchResult {
    claim
    source
    confidence
}
```

and it forgets `source`, the runtime can automatically fail validation and retry.

---

# Latent Communication Between Agents

## 5. Going Beyond Text

A more ambitious idea is to avoid having agents communicate through text at all.

Instead of:

```text
Agent A
    ↓
"I think we should inspect the financial statements first..."
    ↓
Agent B
```

the agents could pass internal model representations:

```text
Agent A
    ↓
latent representation
    ↓
Agent B
```

This is a different problem from building a textual query language.

---

## 6. What Could Be Passed?

### Weights

Weights are the model's learned parameters.

They are:

- huge
- mostly fixed during inference
- shared across many requests

They are **not** the reasoning state of a specific request.

So passing model weights between agents is generally not what you want.

### Hidden States / Activations

Hidden states are intermediate vectors generated while the model processes a prompt.

Conceptually:

```text
tokens
  ↓
transformer layers
  ↓
hidden vectors
```

These are much closer to the model's temporary internal representation of the current task.

### Logits

Logits are the scores the model produces for possible next tokens.

They represent the model's next-token distribution.

### KV Cache

The KV cache stores attention information from previous tokens during generation.

It is request-specific and allows the model to continue generation efficiently.

---

## 7. Latent Agent-to-Agent Communication

The interesting research direction would be:

> **Can one model pass a compressed internal representation directly to another model instead of translating everything into natural language?**

Conceptually:

```text
Model A hidden states
        ↓
   learned encoder
        ↓
 compressed latent message
        ↓
   learned decoder
        ↓
      Model B
```

For example:

```text
z ∈ R^(128 × 1024)
```

could represent a compact machine-to-machine message.

Instead of exchanging a paragraph, the agents exchange vectors.

---

## 8. Why This Is Hard

### Different models have different representation spaces

A hidden vector from one model does not automatically mean the same thing to another.

```text
Model A latent space ≠ Model B latent space
```

Even models with the same hidden dimension may represent concepts differently.

### Hidden states can be huge

For example:

```text
context length = 4,000
hidden size = 8,192
```

That is:

```text
4,000 × 8,192
≈ 32.8 million values
```

So directly passing full hidden states may be too expensive.

### Interoperability

If agents use different model families, you would likely need:

```text
encoder
shared latent space
decoder
```

or some jointly learned communication protocol.

---

## 9. A Learned Latent Protocol

One possible architecture is:

```text
Agent A
  ↓
internal representation
  ↓
communication encoder
  ↓
compact shared latent
  ↓
communication decoder
  ↓
Agent B
```

The communication encoder could learn to preserve only information useful for the downstream agent.

This could make communication:

- smaller
- faster
- less verbose
- potentially richer than text
- optimized specifically for machine-to-machine reasoning

---

## 10. Combining Structured and Latent Communication

A strong architecture could use both.

### Human-facing layer

Readable and declarative:

```text
RESEARCH NVIDIA

THEN ANALYZE revenue growth

THEN WRITE memo

REQUIRE citations
MAX_COST $0.10
```

### Runtime layer

Turns that into an execution graph:

```text
planner
   ↓
research agent
   ↓
analysis agent
   ↓
writer agent
```

### Agent communication layer

Instead of sending long natural-language messages between every step, agents could exchange:

```text
typed metadata
+
compressed latent representations
```

So the full system could look like:

```text
Human
  ↓
Natural language / DSL
  ↓
Planner
  ↓
Structured execution graph
  ↓
Agent A
  ↓
Typed + latent message
  ↓
Agent B
  ↓
Typed + latent message
  ↓
Agent C
  ↓
Natural-language response
```

---

# Product / Research Direction

The broader thesis is:

> **Natural language is optimized for human communication, not necessarily machine-to-machine reasoning.**

A research question could be:

> Can LLM agents communicate more efficiently and effectively using learned latent protocols instead of natural language?

A product layer could then provide:

- a human-readable query language
- typed schemas between agents
- routing and validation
- model/tool orchestration
- latent communication underneath
- tracing and observability

That gives you two layers:

```text
Developer-facing:
declarative agent query language

Machine-facing:
typed + latent agent communication protocol
```

The human-facing layer stays understandable, while the machine-facing layer can be optimized for efficiency and reasoning quality.
