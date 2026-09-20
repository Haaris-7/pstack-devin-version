---
name: setup-pstack
description: Configure which models pstack uses per role. Detects your available models, writes an always-on rule that overrides the skill defaults, and pins `model:` on the plugin's agent profiles. Use for /pstack:setup-pstack, "configure pstack models", or changing pstack's model choices.
---

# Setup pstack

Write `~/.devin/rules/pstack-models.md`, an always-on rule that records pstack's model per role, then pin `model:` on this plugin's agent profiles. The profiles live at `../../agents/` relative to this file; the plugin is installed `--local`, so the edits are live on the next session.

## Steps

### 1. Detect available models

Run `devin models` to list the model slugs available to this user. If the CLI is not logged in, ask the user to paste the slugs from the `/model` picker. Never write a real slug you have not confirmed is available. The aliases `inherit-parent` and `auto` are always valid even though they are not detected slugs. Devin slugs carry no effort token. Thinking level is a session toggle (Alt+T), not something this rule configures.

### 2. Load current state

The default role-to-model mapping is the rule shape shown in step 5 below. If `~/.devin/rules/pstack-models.md` already exists, read it and treat its role values as the current choices. Otherwise start from those defaults.

### 3. Map and confirm

Show every role with its model, marking any real slug not in the detected set as needing a choice. Ask whether to accept as-is or change specific roles, offering the detected models plus `inherit-parent` and `auto` (both mean: spawn this role with `subagent_general` instead of the profile, so it runs on the parent chat model, which is how Auto users stay on Auto). Prefer `ask_user_question` over free text.

The roles:

- `code delegate`: pinned on the `pstack:poteto-agent` profile. Every playbook's code-writing delegate.
- `judgment and prose`: pinned on the `pstack:pstack-judge` profile. Synthesis, explanation, review verdicts.
- `panel seat a` through `panel seat d`: pinned on `pstack:pstack-panel-a` through `pstack:pstack-panel-d`. Arena runners, architect runners, interrogate reviewers, and the arena cross-judge draw one seat per entry, so distinct slugs across the four seats give real model diversity.

### 4. Validate

Every real slug written must be in the detected set. `inherit-parent` and `auto` always pass. If a chosen real slug is not available, stop and ask again.

### 5. Write the rule

Write `~/.devin/rules/pstack-models.md` with `trigger: always_on` and one line per role, using the same labels poteto-mode uses. Overwrite the whole file so re-runs stay idempotent. Shape:

```
---
description: pstack per-role model choices
trigger: always_on
---
# pstack model configuration. One line per role. Delete a line to fall back to the skill default.
# `inherit-parent` or `auto` as a value: spawn with `subagent_general` instead of the profile (runs on the parent chat model).
code delegate: opus
judgment and prose: opus
panel seat a: opus
panel seat b: codex
panel seat c: swe
panel seat d: gemini
```

Those are placeholder slugs; write the ones the user picked.

### 6. Pin the profiles

For each role, set the `model:` field in the matching profile under `../../agents/`: `poteto-agent.md`, `pstack-judge.md`, `pstack-panel-a.md` through `pstack-panel-d.md`. For `inherit-parent` or `auto`, remove the `model:` line from that profile instead; the skills spawn `subagent_general` for it anyway. Edits apply on the next session.

### 7. Confirm

Tell the user the rule was written and the profiles pinned, and that both apply to new sessions. Re-running this skill updates them.

### 8. Offer a verification skill (optional)

Check whether the project has a way to drive the real app for proof (a `verify-*` skill, or an existing harness). If not, offer once: "want a project-local verification skill, so agents can drive the app the way a user does and prove changes work? I can generate one with /pstack:create-verification-skill." On yes, invoke `/pstack:create-verification-skill` (resolves wherever pstack is installed). On no, move on without pushing.
