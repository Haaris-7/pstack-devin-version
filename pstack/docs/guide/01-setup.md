# Set up pstack

In this page you install the plugin, pick which models pstack uses, and run your first task. Setup is one command plus a short conversation.

## Install the plugin

Log in, then install from your local vendored copy:

```bash
devin auth login
devin plugins install --local ~/.devin-plugins/pstack
```

Devin confirms the plugin is installed, and its skills resolve as `/pstack:<skill>`.

## Pick your models

Run:

```text
/pstack:setup-pstack
```

[`/pstack:setup-pstack`](../../skills/setup-pstack/SKILL.md) lists the models you have access to with `devin models` (or asks you to paste the slugs from `/model` if the CLI is not logged in), shows you each role (the code delegate, judgment and prose, the four panel seats, and `inherit-parent`), and confirms your picks with `ask_user_question`. It writes `~/.devin/rules/pstack-models.md`, a small always-on rule every pstack skill reads, and pins `model:` on this plugin's agent profiles.

You only override what you care about. A role with no line in the rule keeps Devin's default subagent model. To restore a default later, delete that role's line, or just run `/pstack:setup-pstack` again.

You might be wondering what happens if you don't pin a model. Set a role to `inherit-parent` and pstack spawns that role with `subagent_general` instead of a custom profile, so the subagent inherits your parent session's model. Custom profiles that have no `model:` line run on Devin's default subagent model. For the panel seats, pin a distinct model on each seat (`pstack:pstack-panel-a` through `d`) for model diversity; setup also writes the `swarm workers` entry, the profile `/pstack:swarm` workers default to.

## Accept the verification offer, or don't

At the end of setup, `/pstack:setup-pstack` looks for a way to prove app behavior in your project, either a `verify-*` skill or an existing harness. If it finds neither, it offers once to generate one with [`/pstack:create-verification-skill`](../../skills/create-verification-skill/SKILL.md).

Say yes and it writes `.devin/skills/verify-<app>/`, a project-local skill that teaches agents to drive your app the way a user does. It proves the skill works once before handing it over. Say no and setup moves on. You can run `/pstack:create-verification-skill` yourself any time. [Verify and ship](./06-verify-and-ship.md#create-a-project-verification-skill) covers when it earns its place.

After setup, start a new session. The model rule applies to new sessions.

## Run your first task

Pick something real but small, and describe it the way you'd describe it to a colleague:

```text
/pstack:poteto-mode add a --json flag to this command. text output stays byte-identical. verify both.
```

Watch the todo list. Its first items are the matched playbook's steps copied in, the Feature playbook for this prompt. If `/pstack:poteto-mode` skips a step, the step stays in the list with `skip: <reason>`, so you can see what it chose not to do.

From here you can type normal follow-ups. `/pstack:poteto-mode` is sticky. It stays on for the conversation until you opt out by saying so.

Next: [Route work through `/pstack:poteto-mode`](./02-poteto-mode.md).
