# Common task routes

These routes reflect the current documentation-only repository. Source and test paths
are placeholders until an implementation and toolchain exist.

## Add a protocol field

1. Read `AGENTS.md`, `docs/domain/invariants.md`, and the applicable files under `docs/protocol/`.
2. Check compatibility/versioning guidance when it exists and review relevant ADRs and active specs.
3. Agree on protocol semantics before changing them; update the protocol docs and ADR if warranted.
4. Implement in the eventual protocol source and add/update externally observable cases under `tests/conformance/`.

## Fix a runtime bug

1. Read `AGENTS.md` and use `.agents/skills/diagnosing-bugs/SKILL.md`.
2. Reproduce the bug in a focused test, inspect the affected runtime source, and consult domain docs if semantics are involved.
3. Add regression coverage, run the repository's configured checks, and review the diff.

## Add a transport

1. Read `AGENTS.md` and `ARCHITECTURE.md`.
2. Confirm the actual transport abstraction and dependency direction once implementation exists; none is established today.
3. Check protocol invariants and relevant ADRs, inspect existing transport implementations, and add integration/conformance coverage.

## Change a lifecycle transition

1. Read `AGENTS.md`, `docs/domain/lifecycle.md`, and `docs/domain/invariants.md`.
2. Review applicable ADRs and active specs; resolve the lifecycle semantics before implementing them.
3. Update lifecycle documentation, implementation, and externally observable conformance tests together.
