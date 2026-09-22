# Issue tracker: GitHub

The repository remote is `https://github.com/ch4nbin/yeon`; use GitHub Issues for
specs and tracked work. The `gh` CLI must be installed and authenticated before using
issue skills. It is not installed in the environment used for this bootstrap.

- Create: `gh issue create --title "..." --body "..."`
- Read: `gh issue view <number> --comments`
- List: `gh issue list --state open`
- Comment: `gh issue comment <number> --body "..."`
- Close: `gh issue close <number> --comment "..."`

PRs are not configured as a triage request surface.
