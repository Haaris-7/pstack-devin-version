# Cursor Team Kit plugin

Internal-style workflows for CI, code review, shipping, and test reliability. The kit is designed to be plug and play without requiring third-party service integrations.

## Installation

```bash
devin auth login
devin plugins install --local ~/.devin-plugins/cursor-team-kit
```

Skills are then invoked as `/cursor-team-kit:<skill>` (e.g. `/cursor-team-kit:deslop`).

## Components

### Skills

| Skill | Description |
|:------|:------------|
| `loop-on-ci` | Watch CI runs and iterate on failures until checks pass |
| `review-and-ship` | Run a structured review, commit changes, and open a PR |
| `pr-review-canvas` | Generate an interactive HTML PR walkthrough with annotated, categorized diffs |
| `verify-this` | Prove or disprove claims with baseline/treatment artifacts and a clear verdict |
| `control-cli` | Build or adapt a local harness to drive and profile interactive CLIs or TUIs |
| `control-ui` | Build or adapt a local browser/CDP harness for web or Electron UIs |
| `make-pr-easy-to-review` | Clean noisy PR history, improve descriptions, and add reviewer guidance |
| `run-smoke-tests` | Run Playwright smoke tests and triage failures |
| `fix-ci` | Find failing CI jobs, inspect logs, and apply focused fixes |
| `new-branch-and-pr` | Create a fresh branch, complete work, and open a pull request |
| `get-pr-comments` | Fetch and summarize review comments from the active pull request |
| `check-compiler-errors` | Run compile and type-check commands and report failures |
| `what-did-i-get-done` | Summarize authored commits over a given time period into a concise status update |
| `weekly-review` | Generate a weekly recap of shipped work with bugfix/tech-debt/net-new highlights |
| `fix-merge-conflicts` | Resolve merge conflicts, validate build/tests, and summarize decisions |
| `deslop` | Remove AI-generated code slop and clean up code style |
| `workflow-from-chats` | Extract durable working preferences from sessions into skills, rules, or docs |
| `thermo-nuclear-code-quality-review` | Run an unusually strict maintainability review (code-judo, 1k-line rule, spaghetti, boundaries) |

### Agents

Custom subagent profiles, spawned with `run_subagent` as `cursor-team-kit:<name>`.

| Agent | Description |
|:------|:------------|
| `ci-watcher` | Monitor GitHub Actions runs and return concise pass/fail summaries |
| `thermo-nuclear-code-quality-review` | Subagent profile that runs the thermo-nuclear code quality rubric against a diff |

### Rules

| Rule | Description |
|:-----|:------------|
| `typescript-exhaustive-switch` | Require exhaustive switch handling for unions/enums |
| `no-inline-imports` | Keep imports at module top-level for readability and consistency |

## License

MIT

## Adapted for Devin

This plugin was adapted from [`cursor/plugins`](https://github.com/cursor/plugins) @ `6ed0f7a9504f577d7529064103cecce9be7dfc5e` (2026-09-20). The mapping:

- `Task` tool calls → `run_subagent` with profiles (`subagent_general`, `subagent_explore`, `cursor-team-kit:ci-watcher`, `cursor-team-kit:thermo-nuclear-code-quality-review`).
- per-call `model:` → `model:` pinned on agent profiles; Cursor effort tokens have no Devin equivalent.
- `AskQuestion` → `ask_user_question`; `Read` → `read`.
- `.mdc` rules → `rules/*.md` with `trigger:` frontmatter (`always_on`).
- chat transcripts → the Devin session store (`sessions.db`, filtered by `working_directory`).

To update from upstream: re-vendor the upstream plugin directory over this repo, then `git diff` against the baseline vendoring commit to re-apply this adaptation.
