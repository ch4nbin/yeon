# Yeon agent guide

## Project summary

Yeon is an early project for a typed, compact interchange format between AI agents,
with a Python codec and in-process handoff runtime planned for the first implementation.
The repository currently contains the landing page and planning documentation; no
normative protocol or core implementation exists yet.

## Where to look

- [README.md](README.md): short project summary.
- [docs/archive/project-brief.md](docs/archive/project-brief.md): original exploratory brief and proposal examples.
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
- [docs/archive/repository-bootstrap.md](docs/archive/repository-bootstrap.md): historical repository setup brief.

## Architecture boundaries

The landing page uses Next.js and TypeScript. The Yeon core has no implemented language
package or module boundary yet. The current working direction is a Python implementation
of the document model, canonical JSON codec, compact syntax, validation, and an
in-process runtime. Record actual boundaries here and in `ARCHITECTURE.md` as code lands.

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

For documentation-only changes, run `git diff --check`.

The landing page supports `npm run dev`, `npm run build`, and `npm run start`. No lint,
unit-test, or Yeon core verification commands exist yet. Add the core commands here when
the Python toolchain is introduced.

## Completion rule

Do not claim completion if relevant verification has not run. If a check cannot run,
state why. Do not present proposals or unresolved questions as Yeon protocol rules.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
