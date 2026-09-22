# Yeon Codex Repository Bootstrap Instructions

You are configuring the **Yeon** repository for long-term development with Codex and other coding agents.

Your job is to:

1. Inspect the existing repository before changing structure.
2. Download and install the relevant engineering skills from:
   `https://github.com/mattpocock/skills`
3. Set up a clean, agent-readable project structure.
4. Create concise `AGENTS.md` guidance so future Codex runs can find the right context.
5. Preserve existing useful code, docs, tests, and history.
6. Do **not** invent Yeon protocol semantics that are not already supported by the repository.

---

# 1. First: inspect the existing repository

Before making structural changes:

- inspect the entire repository tree
- inspect existing `README`, architecture docs, ADRs, specs, tests, build config, package config, CI config, and source layout
- identify the current language/toolchain
- identify the real commands for:
  - tests
  - formatting
  - linting
  - type checking
  - building
- identify whether any existing files already serve the roles described below

Do **not** reorganize blindly just to match this proposed structure.

If the existing repository has a better-established convention, adapt this plan to the existing project instead of forcing unnecessary moves.

Do not delete useful files.

Do not rewrite working code or protocol behavior as part of this setup.

---

# 2. Download the Matt Pocock skills repository

Clone or otherwise inspect:

```text
https://github.com/mattpocock/skills
```

Read the repository's own setup/install instructions before deciding where the skills should live.

Install or copy the skills most relevant to Yeon.

## Core implementation / code-quality skills

Install:

```text
tdd
code-review
codebase-design
diagnosing-bugs
improve-codebase-architecture
implement
```

## Design / planning / research skills

Also install:

```text
research
grill-with-docs
to-spec
to-tickets
```

If the repo contains a setup/bootstrap skill for configuring Matt Pocock's skills, use it if appropriate.

Do **not** blindly install every skill in the repository.

Preserve each selected skill's full directory, including its:

```text
SKILL.md
references/
scripts/
assets/
```

when those supporting directories exist.

Configure the skills in the location expected by Codex / the skills repository.

If there is a choice between project-local and global installation, prefer **project-local configuration for Yeon** unless the upstream instructions strongly recommend otherwise.

The final setup must allow a future Codex agent working inside this repository to discover and use the installed skills without the user needing to explain them every session.


---

# 2A. Primary design-engineering skill

For **product/UI design and frontend interaction design**, Yeon should primarily rely on Emil Kowalski's design-engineering skill:

```text
https://github.com/emilkowalski/skills/blob/main/skills/emil-design-eng/SKILL.md
```

Inspect/download the source repository as needed:

```text
https://github.com/emilkowalski/skills
```

Install the complete:

```text
emil-design-eng
```

skill directory, preserving its `SKILL.md` and any supporting files.

This is the **primary design authority for UI polish, component design, interaction details, motion, animation decisions, and frontend feel**.

Its guidance should take precedence over generic design suggestions for those areas unless:
- the existing Yeon design system explicitly says otherwise,
- accessibility requirements conflict,
- product requirements conflict,
- or a documented Yeon-specific ADR/design rule intentionally overrides it.

The skill specifically emphasizes trained taste, compounding invisible details, intentional animation, responsive component behavior, and careful interaction polish. When reviewing UI code, preserve the skill's required review format and other explicit rules rather than paraphrasing them away. citeturn833615view0

Do not reinterpret `codebase-design` as the primary UI/visual-design skill.

Use:

```text
emil-design-eng
    -> UI/UX execution, visual polish, component behavior, interaction design, motion

codebase-design
    -> software/module/API architecture and code structure
```

If Yeon contains a frontend application, add appropriate routing guidance to the relevant `AGENTS.md` file so that UI work explicitly consults `emil-design-eng`.

---

# 3. Target repository structure

Use this as the target conceptual structure:

```text
yeon/
├── AGENTS.md
├── README.md
├── ARCHITECTURE.md
│
├── docs/
│   ├── index.md
│   │
│   ├── domain/
│   │   ├── terminology.md
│   │   ├── invariants.md
│   │   └── lifecycle.md
│   │
│   ├── protocol/
│   │   ├── messages.md
│   │   ├── wire-format.md
│   │   ├── errors.md
│   │   ├── versioning.md
│   │   ├── capability-negotiation.md
│   │   └── delegation.md
│   │
│   ├── design/
│   │   ├── principles.md
│   │   └── adr/
│   │
│   ├── specs/
│   │   ├── active/
│   │   └── completed/
│   │
│   └── research/
│
├── src/
│   └── yeon/
│       ├── protocol/
│       ├── runtime/
│       ├── transport/
│       └── adapters/
│
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── conformance/
│   └── fixtures/
│
├── examples/
├── scripts/
├── pyproject.toml / package config
└── .github/
    └── workflows/
```

This is a **conceptual target**, not a command to move everything mechanically.

If the repository is not Python, preserve the language's normal source/package conventions.

If the project already has a strong package/module layout, keep it and map the conceptual responsibilities onto the existing structure.

---

# 4. Repository source-of-truth hierarchy

Organize the project so agents can determine which artifacts are authoritative.

Use this hierarchy:

```text
AGENTS.md
    -> navigation, mandatory rules, verification commands

ARCHITECTURE.md
    -> current system architecture and module boundaries

docs/domain/
    -> domain vocabulary and invariants

docs/protocol/
    -> normative protocol semantics

docs/design/adr/
    -> why important architectural decisions were made

docs/specs/active/
    -> work currently being implemented

docs/specs/completed/
    -> historical completed implementation specs

tests/conformance/
    -> executable externally observable protocol contract
```

A future agent should be able to enter the repository with zero chat history and understand where to look.

---

# 5. Root AGENTS.md

Create a concise root:

```text
AGENTS.md
```

Do **not** turn it into a giant manual.

It should act as a routing layer and contain:

## Project summary

A short description of Yeon based only on existing repository evidence.

Do not invent project semantics.

## Where to look

Point agents to:

```text
ARCHITECTURE.md
docs/domain/terminology.md
docs/domain/invariants.md
docs/domain/lifecycle.md
docs/protocol/
docs/design/adr/
docs/specs/active/
tests/conformance/
```

Explain when each one should be consulted.

## Architectural boundaries

Document the intended responsibilities, if supported by the existing codebase:

```text
protocol/
    transport-independent protocol models and semantics

runtime/
    orchestration, execution, lifecycle/state transitions

transport/
    networking / I/O / transport mechanics

adapters/
    integration with external systems or APIs
```

Do not assert these boundaries if the existing repository clearly defines different ones. In that case, document the real boundaries.

## Mandatory workflow for non-trivial changes

The root `AGENTS.md` should tell Codex to:

1. inspect relevant source
2. inspect relevant tests
3. read relevant domain/protocol docs
4. check active specs
5. check applicable ADRs
6. make the smallest coherent change
7. add or update tests
8. run relevant verification commands
9. review the final diff

## Verification commands

Populate this section with the **real commands from the repo**.

Examples only:

```text
format
lint
type-check
unit tests
integration tests
conformance tests
build
```

Do not invent commands.

## Completion rule

Include guidance equivalent to:

```text
Do not claim completion if relevant verification has not been run.
If a check cannot be run, explicitly say why.
```

---

# 6. Nested AGENTS.md files

Create nested `AGENTS.md` files only where materially different rules apply.

Do not scatter them everywhere.

Good candidates include:

```text
src/yeon/protocol/AGENTS.md
tests/conformance/AGENTS.md
```

Adapt paths to the actual repository.

## Protocol AGENTS.md

For the protocol subtree, include rules such as:

```text
- Read docs/domain/invariants.md before changing protocol semantics.
- Read the relevant docs/protocol/* file.
- Check applicable ADRs.
- Keep protocol semantics independent of specific transports.
- Do not duplicate protocol-wide validation inside individual transports.
- Public schema/wire changes require compatibility/versioning consideration.
- Lifecycle/state changes require corresponding tests.
```

Only include rules that make sense for the actual Yeon repository.

## Conformance AGENTS.md

For conformance tests:

```text
- Tests should focus on externally observable protocol behavior.
- Prefer black-box behavior over implementation details.
- Fixed externally observable protocol bugs should receive regression coverage.
- Protocol changes should update conformance tests when behavior changes.
```

---

# 7. ARCHITECTURE.md

Create or improve:

```text
ARCHITECTURE.md
```

It should explain:

- major modules/packages
- dependency direction
- public vs internal boundaries
- protocol/runtime/transport/adapters relationships
- important data flow
- important extension points
- where validation happens
- where lifecycle/state transition logic lives
- where external integrations enter the system

Do not invent architecture.

If the current implementation is unclear, document only what can be established from code and existing docs, and mark uncertain sections explicitly.

---

# 8. Domain documentation

Create:

```text
docs/domain/terminology.md
docs/domain/invariants.md
docs/domain/lifecycle.md
```

## terminology.md

Define existing Yeon terms.

Examples of categories that may belong here if they already exist in the project:

```text
agent
task
capability
message
result
error
delegation
transport
session
execution
state
```

Do not create definitions just because these terms appear in this instruction.

Use terminology supported by Yeon's actual code/docs.

## invariants.md

This should become one of the most important files for agent-assisted development.

Record truths that must remain valid across implementations.

Examples of the *kind* of thing that belongs here:

```text
identity invariants
state-transition invariants
transport-independence invariants
version compatibility invariants
error invariants
ownership/provenance invariants
capability invariants
```

Do **not** invent actual Yeon invariants.

Extract existing invariants from the code, tests, current docs, specs, and ADRs.

If an invariant is uncertain, mark it as unresolved rather than guessing.

## lifecycle.md

Document:

- states
- allowed transitions
- terminal states
- invalid transitions
- retry/cancellation behavior if applicable

Only based on repository evidence.

---

# 9. Protocol docs

Create or reorganize protocol documentation under:

```text
docs/protocol/
```

Potential files:

```text
messages.md
wire-format.md
errors.md
versioning.md
capability-negotiation.md
delegation.md
```

Only create substantive content for areas that actually exist in Yeon.

For unsupported areas:

- omit the file, or
- create a clearly marked skeleton/TODO if having the placeholder is useful

Do not fabricate a protocol design.

---

# 10. ADRs

Use:

```text
docs/design/adr/
```

for architectural decision records.

Preserve existing ADRs if they already exist.

Use ADRs for decisions that are:

- architecturally significant
- hard to reverse
- likely to confuse a future contributor without the reasoning
- protocol-semantic
- dependency/boundary changing

Do not write ADRs for trivial implementation details.

---

# 11. Specs

Organize implementation specs into:

```text
docs/specs/active/
docs/specs/completed/
```

Active specs describe ongoing work.

Completed specs provide useful historical context but should not override current protocol/domain documentation.

Where possible, specs should link to:

- relevant ADRs
- protocol docs
- tests
- issues/tickets

---

# 12. Research

Use:

```text
docs/research/
```

for external research and comparisons.

This may include research on protocols, standards, frameworks, or prior art relevant to Yeon.

Research files must clearly distinguish:

- external facts / citations
- conclusions for Yeon
- unresolved questions

Research is not automatically normative.

A research note should not silently become protocol behavior.

---

# 13. Tests

Organize tests conceptually as:

```text
tests/unit/
tests/integration/
tests/conformance/
tests/fixtures/
```

Adapt to the repository's actual test conventions.

## Unit tests

Focused module-level behavior.

## Integration tests

Interactions across internal components or external interfaces.

## Conformance tests

Externally observable Yeon protocol behavior.

Treat conformance tests as an executable protocol contract.

When protocol behavior changes intentionally, corresponding conformance tests should be considered.

---

# 14. Skills workflow

Configure the selected skills so Codex can use them naturally.

The intended workflow is approximately:

```text
new idea / ambiguous product or protocol design
    -> grill-with-docs

UI / frontend / interaction / animation / visual design
    -> emil-design-eng

external standards / prior art
    -> research

turn design into implementation plan
    -> to-spec

split implementation into work
    -> to-tickets

implementation
    -> implement

during implementation
    -> tdd

software architecture / module / API boundary decisions
    -> codebase-design

UI implementation or UI review
    -> emil-design-eng first
    -> code-review afterward for implementation/spec correctness

before completion / PR
    -> code-review

bug or regression
    -> diagnosing-bugs

periodic structural cleanup
    -> improve-codebase-architecture
```

Do not hard-code a workflow that conflicts with the upstream skill instructions.

Read each skill's `SKILL.md` and preserve its intended usage.

---

# 15. Code-quality expectations

Set up project guidance so future Codex agents are encouraged to:

- make small coherent changes
- preserve existing abstractions unless there is a reason to change them
- avoid duplicating protocol logic
- keep module boundaries clear
- write tests at the correct level
- add regression tests for fixed bugs
- avoid speculative abstraction
- avoid coupling protocol semantics to one transport
- avoid making public API/schema changes accidentally
- run verification before claiming completion
- review diffs for unintended behavior

Do not add large style guides when the repository's formatter/linter can enforce the same thing automatically.

Prefer executable checks over prose where possible.

---

# 16. Do not force Codex to read the whole repository every task

Do **not** write instructions like:

```text
Read every file in the repository before doing anything.
```

Instead, make the repository easy to navigate.

The root `AGENTS.md` should route agents toward the context relevant to the requested change.

Examples:

```text
Changing protocol semantics?
    -> docs/domain/invariants.md
    -> relevant docs/protocol/*
    -> applicable ADRs
    -> conformance tests

Changing architecture?
    -> ARCHITECTURE.md
    -> applicable ADRs
    -> affected module-level AGENTS.md

Implementing a feature?
    -> relevant active spec
    -> affected source
    -> affected tests

Fixing a bug?
    -> reproducing test
    -> affected source
    -> diagnosing-bugs skill
    -> regression test

Adding a transport?
    -> architecture docs
    -> transport interface/base abstraction
    -> protocol invariants
    -> integration/conformance tests
```


```text
Building or refining frontend UI?
    -> relevant frontend AGENTS.md
    -> emil-design-eng skill
    -> existing Yeon design system/components
    -> accessibility requirements
    -> implementation
    -> UI review using emil-design-eng
    -> code-review
```

The goal is **agent legibility**, not dumping the entire repository into context.

---

# 17. Do not invent missing Yeon semantics

This rule is mandatory.

When setting up documentation:

```text
DO NOT INVENT YEON PROTOCOL SEMANTICS.
```

If information is missing:

- derive it from current code/tests/docs if possible
- otherwise create a clearly labeled TODO
- state the unresolved question
- do not silently make the design decision

This setup task is primarily organizational and documentation-oriented.

Do not alter runtime/protocol behavior unless required to keep paths/imports working after an approved file move.

---

# 18. Preserve existing work

During restructuring:

- preserve useful documentation
- preserve git history where practical
- prefer `git mv` when moving files
- update internal links
- update imports only when necessary
- update references in docs
- update CI paths if necessary
- update package manifests/configuration only when necessary
- do not delete old content until its replacement is verified

Ask before performing a destructive or ambiguous architectural migration.

---

# 19. Verification

After setup, verify all of the following.

## Repository structure

Show the resulting tree.

## AGENTS.md discovery

Verify:

- root instructions exist
- nested instructions are scoped correctly
- nested instructions do not contradict root guidance accidentally

## Skill discovery

Verify all selected skills are installed and discoverable.

List:

```text
tdd
code-review
codebase-design
diagnosing-bugs
improve-codebase-architecture
implement
research
grill-with-docs
to-spec
to-tickets
emil-design-eng
```

Report the exact installed paths.

## Build / quality checks

Run all applicable existing checks:

```text
format check
lint
type check
unit tests
integration tests
conformance tests
build
```

Only run commands supported by the real repository.

If something cannot run, report why.

## Link/path validation

Check for broken:

- documentation links
- imports
- config references
- CI references
- script paths

caused by the restructuring.

---

# 20. Final agent-legibility audit

After completing the setup, perform a second pass as if you are a brand-new Codex agent with:

- zero prior conversation context
- only the repository
- automatically discovered `AGENTS.md` files
- installed project skills

Determine whether that agent can answer:

1. What is Yeon?
2. Which docs define protocol semantics?
3. Which docs define domain invariants?
4. Which files describe the architecture?
5. Why were important design decisions made?
6. Where is current implementation work specified?
7. Where are protocol conformance tests?
8. How do I run tests?
9. How do I run linting?
10. How do I run formatting?
11. How do I run type checking?
12. How do I build the project?
13. Which skills are available?
14. When should each skill be used?
15. What changes require conformance tests?
16. What changes should trigger an ADR?
17. What must not be inferred when documentation is missing?

Fix documentation/navigation gaps discovered during this audit.

Do not change application semantics during this pass.

---

# 21. Test four common future tasks

At the end, explain exactly which files/context a future Codex agent should inspect for each of these tasks.

## A. Add a protocol field

Expected route should resemble:

```text
AGENTS.md
-> docs/domain/invariants.md
-> relevant docs/protocol/*
-> versioning/compatibility docs
-> applicable ADRs
-> protocol source
-> conformance tests
```

## B. Fix a runtime bug

Expected route should resemble:

```text
AGENTS.md
-> diagnosing-bugs skill
-> affected runtime source
-> relevant tests
-> relevant spec/domain docs if semantics are involved
-> regression test
```

## C. Add a new transport

Expected route should resemble:

```text
AGENTS.md
-> ARCHITECTURE.md
-> transport abstraction/interface
-> protocol invariants
-> existing transport implementations
-> integration tests
-> conformance tests
```

## D. Change a lifecycle transition

Expected route should resemble:

```text
AGENTS.md
-> docs/domain/lifecycle.md
-> docs/domain/invariants.md
-> applicable ADRs/spec
-> lifecycle/runtime implementation
-> conformance tests
```

Adapt all routes to the repository's real structure.

---

# 22. Final report

When finished, produce a concise report containing:

## Installed skills

Show every installed skill and its path.

## Files created

List new docs/config files.

## Files moved

List any moved files and why.

## Files intentionally left alone

Mention anything that did not fit the proposed tree and why it was preserved.

## Resulting repository tree

Show the important structure.

## Verification results

Report:

```text
tests:
lint:
format:
typecheck:
build:
skill discovery:
AGENTS.md discovery:
```

## Unresolved questions

List anything that could not be determined from the existing repository without inventing semantics.

## Recommended next step

Suggest the single best next step for making Yeon more agent-legible or implementation-ready.

---

# 23. Critical constraints

Throughout this task:

```text
DO NOT blindly rewrite the repository.
DO NOT invent protocol semantics.
DO NOT delete useful documentation.
DO NOT move files solely for cosmetic consistency.
DO NOT modify public behavior as part of organizational cleanup.
DO NOT claim verification you did not perform.
DO NOT install unrelated skills.
DO NOT make AGENTS.md enormous.
```

Prefer:

```text
inspect
understand
adapt
organize
document
verify
```

The goal is a repository that is easy for both humans and Codex agents to understand and safely modify.
