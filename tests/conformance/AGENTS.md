# Conformance-test guidance

- Read `docs/domain/invariants.md` and the relevant files under `docs/protocol/` first.
- Test externally observable protocol behavior through the public boundary; avoid coupling cases to implementation details.
- When an externally observable protocol bug is fixed, add regression coverage.
- Update conformance cases when protocol behavior changes intentionally.
- Keep any new transport-independent conformance cases separate from transport-specific integration coverage.
