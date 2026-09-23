# Yeon agent guide

## Project summary

Yeon is an early project exploring structured communication between LLM agents and
possible latent representations. The project brief is exploratory; this repository
does not yet contain an implementation or a normative protocol specification.

## Where to look

- [README.md](README.md): short project summary.
- [docs/project-brief.md](docs/project-brief.md): initial brief and proposal examples.
- [ARCHITECTURE.md](ARCHITECTURE.md): what is known and still undecided about system structure.
- [docs/domain/terminology.md](docs/domain/terminology.md): provisional terms used in the brief.
- [docs/domain/invariants.md](docs/domain/invariants.md) and [docs/domain/lifecycle.md](docs/domain/lifecycle.md): confirmed domain rules and lifecycle; currently unresolved.
- [docs/protocol/](docs/protocol/README.md): normative protocol status and future protocol docs.
- [docs/design/adr/](docs/design/adr/README.md): accepted architectural decisions.
- [docs/design/visual-direction.md](docs/design/visual-direction.md): user-provided product and visual design preferences.
- [docs/roadmap.md](docs/roadmap.md): deferred ideas and future additions.
- [docs/specs/active/](docs/specs/active/README.md): current implementation specs.
- [tests/conformance/](tests/conformance/README.md): externally observable protocol contract; no cases exist yet.
- [docs/agents/](docs/agents/issue-tracker.md): issue-tracker and domain-doc conventions used by the installed engineering skills.
- [docs/agents/task-routes.md](docs/agents/task-routes.md): context routes for common future changes.
- [YEON_CODEX_BOOTSTRAP.md](YEON_CODEX_BOOTSTRAP.md): the full setup brief; consult when extending the repository structure.

## Architecture boundaries

There is no source code, language, package layout, or implemented module boundary yet.
The protocol/runtime/transport/adapters split in the bootstrap plan is a possible
future organization, not an established Yeon architecture. Record actual boundaries
here and in `ARCHITECTURE.md` only when implementation evidence supports them.

## Workflow for non-trivial changes

1. Inspect the affected source and tests (if they exist).
2. Read the relevant domain and protocol docs, active specs, and applicable ADRs.
3. Keep the change small and coherent; do not infer missing protocol semantics.
4. Add or update tests when behavior is implemented or changed.
5. Run the relevant repository checks listed below; report checks that cannot run.
6. Review the final diff for unintended changes.

Record a decision in `docs/design/adr/` when it is difficult to reverse, changes
protocol semantics or architecture boundaries, or needs rationale future contributors
would not otherwise know.

Repository-specific source of truth: use `docs/domain/` and `docs/design/adr/` as
described above. Upstream skills that mention `CONTEXT.md` or `docs/adr/` should follow
these Yeon paths instead; do not create a second glossary or ADR store.

For UI or frontend work, consult `docs/design/visual-direction.md` and
`.agents/skills/emil-design-eng/SKILL.md` first.
For code implementation, testing, debugging, design, or review, use the matching
project skill under `.agents/skills/` when applicable. The inventory is in
[`docs/agents/skills.md`](docs/agents/skills.md).

## Verification

No application test, lint, format, type-check, or build commands are configured
because the repository currently has no source code or toolchain. For documentation
changes, run `git diff --check`. Do not invent project commands; update this section
when a toolchain is introduced.

## Completion rule

Do not claim completion if relevant verification has not run. If a check cannot run,
state why. Do not present proposals or unresolved questions as Yeon protocol rules.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
