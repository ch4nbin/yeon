# Domain documentation routing

This is a single-context repository. The canonical domain docs live in `docs/domain/`;
protocol semantics belong in `docs/protocol/`; architectural decisions belong in
`docs/design/adr/`. Read the relevant files before changing those areas.

The canonical terminology file is `docs/domain/terminology.md` and the ADR directory is
`docs/design/adr/`. Upstream skills that mention `CONTEXT.md` or `docs/adr/` must use
these Yeon paths instead; do not create a second glossary or ADR store. The terminology
file currently records only provisional terms because the project has not agreed on a
stable domain model. When a term or decision is resolved, update the canonical docs and
link supporting ADRs/specs. Research and completed specs provide context but do not
override current domain or protocol docs.
