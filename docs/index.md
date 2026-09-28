# Documentation map

This directory is the source for Yeon's eventual public documentation site. Keep usage
guides, concepts, protocol reference, and runnable examples accurate as implementation
lands. Internal planning documents are included in the map but should be excluded from
the public site build.

## Product documentation

- [Architecture](../ARCHITECTURE.md): current system structure and open questions.
- [Terminology](domain/terminology.md): Yeon's working vocabulary.
- [Protocol](protocol/README.md): normative protocol status and future reference.
- [Conformance tests](../tests/conformance/README.md): future executable protocol contract.

Getting-started, SDK reference, integration guides, and examples will be added when the
corresponding interfaces exist. Do not publish speculative usage instructions.

## Internal project documentation

- [Domain invariants](domain/invariants.md) and [lifecycle](domain/lifecycle.md).
- [Design principles](design/principles.md), [visual direction](design/visual-direction.md), and [ADRs](design/adr/README.md).
- [Roadmap](roadmap.md), [active specs](specs/active/README.md), and [completed specs](specs/completed/README.md).
- [Research](research/README.md), [agent skills](agents/skills.md), and [issue tracker](agents/issue-tracker.md).
- [Original project brief](archive/project-brief.md) and [repository bootstrap](archive/repository-bootstrap.md).

## Documentation maintenance

- Update public docs in the same change that alters an interface or observable behavior.
- Keep proposals clearly labeled until protocol semantics are accepted and covered by conformance tests.
- Prefer runnable examples once the SDK exists; verify them in CI rather than copying untested snippets.
- Record deferred ideas in the roadmap and durable architectural decisions in an ADR.
- Keep this index as the navigation source for the future documentation page.

The root [README](../README.md) remains a short repository landing page. Archived briefs
provide historical context and never override protocol docs or conformance tests.
