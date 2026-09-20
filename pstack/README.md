# pstack

i'm [poteto](https://x.com/poteto). i'm not a president or ceo, but i've worked with millions of lines of code at Meta, Netflix, and Cursor. i'm also on the react core team where i help build and maintain react compiler.

there's a growing sense that ai writes too much slop code. i agree. i don't want to ship like a team of twenty slop artists. throughput without quality is not a goal i aspire to. if you want to go fast, go deep first. 

**pstack is my answer.** these are the same skills i use everyday to ship high quality code at Cursor. this turns devin into a real engineering team. the goal is not to maximize loc, in fact it's the opposite. pstack helps you write less, but higher quality code.

**pstack gives you fearless parallelism.** when you can go deep on one agent and trust it to write good, verifiable code, you can truly parallelize with confidence. start multiple agents up with `poteto-mode` and trust that they'll apply rigorous engineering principles to their work.

**devin gives you the best of all worlds.** every frontier model has its strengths and weaknesses. use any model with pstack. in fact, many of my skills use multi-model workflows to take advantage of each model's unique strengths.

fork it. improve it. make it yours. PRs are welcome! 

## install

```bash
devin auth login
devin plugins install --local ~/.devin-plugins/pstack
```

skills are then invoked as `/pstack:<skill>` (e.g. `/pstack:poteto-mode`).

## get started

two steps:

1. run [`/pstack:setup-pstack`](./skills/setup-pstack/SKILL.md) and choose which models you want per role.
2. use [`/pstack:poteto-mode`](./skills/poteto-mode/SKILL.md) whenever you're doing anything that requires rigor.

new here? the [pstack guide](./docs/guide/README.md) walks you through a first real task, from setup and prompting through verification and overnight runs.

that's it. the other skills are situational; the mode skill uses them for you as needed. out of the box the mode splits work by role, carried by subagent profiles: `pstack:poteto-agent` is the code delegate, `pstack:pstack-judge` is prose and judgment, and `pstack:pstack-panel-a` through `pstack:pstack-panel-d` are the panel seats. until [`/pstack:setup-pstack`](./skills/setup-pstack/SKILL.md) pins a model on each profile, they run on devin's default subagent model.

## usage

use [`/pstack:poteto-mode`](./skills/poteto-mode/SKILL.md) at the start of a task. it reads your request, picks from a set of playbooks, and runs the other skills as the steps need them.

### just use [`/pstack:poteto-mode`](./skills/poteto-mode/SKILL.md)

this skill is the main shortcut. i use it whenever i need the agent to do rigorous engineering work. it comes with twenty-three playbooks:

```
/pstack:poteto-mode this pr has a subtle bug where the scroll drifts every 750ms even when idle.
repro first, then fix and verify.
```

```
/pstack:poteto-mode i'm going to bed. land the stack even if ci flakes. i want everything merged
by morning.
```

<details>
<summary>the twenty-three playbooks</summary>

| playbook | for |
|---|---|
| [investigation](./skills/poteto-mode/playbooks/investigation.md) | a read-only question. how does x work, why was y built this way, are we sure. |
| [bug fix](./skills/poteto-mode/playbooks/bug-fix.md) | reproduce a defect, root-cause it, and fix with runtime evidence. |
| [perf](./skills/poteto-mode/playbooks/perf-issue.md) | trace a measured slowness and improve it against a baseline. |
| [hillclimb](./skills/poteto-mode/playbooks/hillclimb.md) | sustained, scientific improvement of one metric against a target, looping hypotheses with before/after measurement and one commit per accepted win. |
| [runtime forensics](./skills/poteto-mode/playbooks/runtime-forensics.md) | diagnose a live symptom (leak, idle-cpu spin, glitch) from instrumentation. |
| [trace forensics](./skills/poteto-mode/playbooks/trace-forensics.md) | diagnose a captured profiling artifact (cpuprofile, trace, spindump, heap snapshot). |
| [feature](./skills/poteto-mode/playbooks/feature.md) | new or changed behavior, built from a named data shape. |
| [refactoring](./skills/poteto-mode/playbooks/refactoring.md) | a behavior-preserving change to structure or shape. |
| [prototype](./skills/poteto-mode/playbooks/prototype.md) | a throwaway sketch to make a design or behavioral decision cheaply, or to settle an empirical fork by observing it. |
| [visual parity](./skills/poteto-mode/playbooks/visual-parity.md) | pixel-exact ui equivalence between two implementations. |
| [authoring a skill](./skills/poteto-mode/playbooks/authoring-a-skill.md) | writing or editing a SKILL.md. |
| [eval](./skills/poteto-mode/playbooks/eval.md) | test how a skill or prompt change affects agent behavior, blinded. |
| [babysit](./skills/poteto-mode/playbooks/babysit.md) | drive a pr or a stack to merge-ready: conflicts, review threads, ci. |
| [shipping](./skills/poteto-mode/playbooks/shipping.md) | independently verify a green stack, then land the contiguous verified run bottom-up through github by default or origin when available. |
| [autonomous run](./skills/poteto-mode/playbooks/autonomous-run.md) | drive a long task to completion without stopping. |
| [orchestrate](./skills/poteto-mode/playbooks/orchestrate.md) | a standing project handed to one coordinator chat: multi-day, many stacked prs, fleets of subagents. |
| [autopilot-full](./skills/poteto-mode/playbooks/autopilot-full.md) | run independent prs to merged with one owner per pr and root verification of each merge-ready head. |
| [autopilot-stack](./skills/poteto-mode/playbooks/autopilot-stack.md) | build and verify one linear base-branch stack for the operator to review and land. |
| [session pickup](./skills/poteto-mode/playbooks/session-pickup.md) | resume or take over a prior agent's in-flight work. |
| [pause safely](./skills/poteto-mode/playbooks/pause-safely.md) | suspend in-flight work cleanly so it can be resumed later. |
| [multi-phase plan](./skills/poteto-mode/playbooks/multi-phase-plan.md) | work that spans phases or stacked PRs. |
| [worktree cleanup](./skills/poteto-mode/playbooks/worktree-cleanup.md) | reclaim disk by pruning merged or abandoned worktrees and stale ios simulators, safety-gated. |
| [opening a pr](./skills/poteto-mode/playbooks/opening-a-pr.md) | open a ready pr from small ordered commits with a conventional commits title and a briefing-style body. invoked at the end of every other playbook. |

</details>



when invoked it:

1. matches your task to a [playbook](./skills/poteto-mode/playbooks/) and opens a todo list whose first items are its steps, copied in verbatim.
2. routes to the other skills as the steps fire.
3. writes unslopped replies framed for the consumer and the maintainer.

the full rules and playbooks live in [`skills/poteto-mode/SKILL.md`](./skills/poteto-mode/SKILL.md).

[`/pstack:poteto-mode`](./skills/poteto-mode/SKILL.md) is also a sticky mode: once entered it stays on across turns, applying itself when a playbook matches or the task needs rigor and staying out of the way otherwise. opt out any time by saying so.

[`/pstack:poteto-mode`](./skills/poteto-mode/SKILL.md) works extremely well with devin's `/loop` command. you can make devin work for many hours without sacrificing rigor.

## skills

[`/pstack:poteto-mode`](./skills/poteto-mode/SKILL.md) runs most of these for you when a step needs them (`how`, `why`, `architect`, `arena`, `swarm`, `interrogate`, `unslop`, `no-comments`, `technical-writing`, `tdd`, and the principles). the table below is for when you want one directly:

```
/pstack:how do we cancel runs? do we have an n+1 when we look up every run to cancel?
```

```
/pstack:interrogate review this pr.
```

<details>
<summary>all skills</summary>

| skill | use it when |
|---|---|
| [`/pstack:poteto-mode`](./skills/poteto-mode/SKILL.md) | default entry point for any non-trivial task. |
| [`/pstack:how`](./skills/how/SKILL.md) | you want a walkthrough of how a subsystem works. |
| [`/pstack:why`](./skills/why/SKILL.md) | you want to know why something was built this way. discovers available MCPs at run time and queries each evidence category in parallel (source control, issue tracker, long-form docs, real-time chat, infra observability, error tracking, analytics warehouse). |
| [`/pstack:recall`](./skills/recall/SKILL.md) | you're starting or resuming work and want your recent context on a topic rebuilt from your own chat history and the shared record, handed back as a tight current-state brief. |
| [`/pstack:blast-radius`](./skills/blast-radius/SKILL.md) | you have a small-looking change and want to know what else it could break, with the one fact it's safe because of proven by running code, not asserted. |
| [`/pstack:architect`](./skills/architect/SKILL.md) | you're about to write code that crosses a function boundary and want the caller's usage, types, and module shape settled first. |
| [`/pstack:arena`](./skills/arena/SKILL.md) | you want N parallel attempts at the same thing, then to grab the best parts of each. |
| [`/pstack:swarm`](./skills/swarm/SKILL.md) | you want N parallel workers across different slices or races, then one aggregated report. |
| [`/pstack:interrogate`](./skills/interrogate/SKILL.md) | you have a diff and want several different models to try to break it, including a strict code-quality lens. |
| [`/pstack:automate-me`](./skills/automate-me/SKILL.md) | you want your own `-mode` skill, drafted from how you've actually worked. |
| [`/pstack:make-bot-ui`](./skills/make-bot-ui/SKILL.md) | you want a page or dashboard whose buttons wake a Grok Bot over a webhook, including the sender-key handoff and Tailscale. |
| [`/pstack:setup-pstack`](./skills/setup-pstack/SKILL.md) | you want to pick which models pstack uses per role. detects your models, writes a config rule, and pins `model:` on the plugin's agent profiles. |
| [`/pstack:reflect`](./skills/reflect/SKILL.md) | a long task landed and you want the recipe captured as a skill edit. |
| [`/pstack:teach`](./skills/teach/SKILL.md) | you want to actually understand a change or subsystem, not just have it summarized. runs how + why and weaves one plain explanation, built up diagram by diagram. |
| [`/pstack:tdd`](./skills/tdd/SKILL.md) | you're fixing a bug and there's a cheap local test path. write the failing test first, then the fix. |
| [`/pstack:no-comments`](./skills/no-comments/SKILL.md) | strip comments before review; spawns Comment Sicko, fixes accepted findings, offers encodings for claimed constraints. |
| [`/pstack:typescript-best-practices`](./skills/typescript-best-practices/SKILL.md) | you're reading or editing typescript. grounds the type-system-discipline principle in syntax. |
| [`/pstack:figure-it-out`](./skills/figure-it-out/SKILL.md) | no bundled playbook fits. designs a rigorous, auditable playbook for the task. |
| [`/pstack:show-me-your-work`](./skills/show-me-your-work/SKILL.md) | you want a reviewable decision trail. logs decisions to a tsv you can commit. |
| [`/pstack:create-verification-skill`](./skills/create-verification-skill/SKILL.md) | your project has no scripted way to prove app behavior. generates a project-local verify skill with a feature map, for any language or platform. |
| [`/pstack:maintain-verification-skill`](./skills/maintain-verification-skill/SKILL.md) | your verify skill's feature map has drifted from the app. source wave + one live pass, at most one PR of proven corrections. |
| [`/pstack:unslop`](./skills/unslop/SKILL.md) | you're cleaning up writing. removes AI tells. |
| [`/pstack:bro`](./skills/bro/SKILL.md) | you want the last message restated in plain human language, no jargon. |
| [`/pstack:technical-writing`](./skills/technical-writing/SKILL.md) | layered doc standard (Diátaxis + Google developer style + STE + Global English) for docs, RFCs, readmes, PR descriptions, commit messages. |

</details>



### examples

mostly i type [`/pstack:poteto-mode`](./skills/poteto-mode/SKILL.md) at the start of a task and let it route to a playbook. the other skills fire as the steps need them. a few i reach for directly.


<details>
<summary>all the examples</summary>

```
bug fix:           /pstack:poteto-mode this pr has a subtle bug where the scroll drifts every 750ms
                   even when idle. repro first, then fix and verify.
perf:              /pstack:poteto-mode a big list takes a second or two to load even though we
                   virtualize. run a cpu trace and tell me why.
feature:           /pstack:poteto-mode build a small feature behind a feature flag. verify it
                   really works.
prototype:         /pstack:poteto-mode build two prototypes of the markdown renderer so we can
                   compare. spawn an agent for each.
multi-phase:       /pstack:poteto-mode open source these skills as a plugin. nothing internal
                   leaks, work in a temp dir, show me the dependency graph first.
overnight run:     /pstack:poteto-mode i'm going to bed. land the stack even if ci flakes. i want
                   everything merged by morning.
babysit:           /pstack:poteto-mode check on pr 123. anything outstanding?
visual parity:     /pstack:poteto-mode the row spacing is too tall when this flag is on. the
                   second image is correct. repro and fix until it matches.
figure it out:     /pstack:poteto-mode i'm stepping away. migrate every caller from the synchronous
                   store to the new async one, keeping behavior identical. i want to trust it was
                   done right when i'm back.
how:               /pstack:how do we cancel runs? do we have an n+1 when we look up every run to
                   cancel?
why:               /pstack:why is this feature flag not on yet?
architect:         design this instrumentation to be high signal with no false positives.
                   /pstack:architect this first.
arena:             /pstack:arena take my prompt to the arena verbatim. i want to compare their
                   proposals with yours.
swarm:             /pstack:swarm check every package under packages/ against its check.sh. one
                   worker per package. one report.
interrogate:       /pstack:interrogate review this pr.
tdd:               /pstack:tdd implement
unslop:            can we unslop and tighten the new changes?
reflect:           /pstack:reflect that took too long. capture what we learned so the next run
                   doesn't repeat it.
show-me-your-work: /pstack:show-me-your-work keep a decision trail i can review when i'm back.
automate-me:       /pstack:automate-me
```

</details>

## the `poteto-agent` and Comment Sicko subagents

pstack also ships a subagent profile that runs my style end to end. spawn it from a parent agent with the [`pstack:poteto-agent` profile](./agents/poteto-agent.md). it reads `poteto-mode` in full, including its inline principles index, before doing any work. substituting `subagent_general` skips that read and drifts.

[`/pstack:poteto-mode`](./skills/poteto-mode/SKILL.md) and [`pstack:poteto-agent`](./agents/poteto-agent.md) route through the same wrapper.

pstack also ships [Comment Sicko](./agents/comment-sicko.md), a read-only comment reviewer available as the `pstack:comment-sicko` profile. usually invoke it through [`/pstack:no-comments`](./skills/no-comments/SKILL.md), not directly.

## principles

twenty-three reference files, one principle each, under [`skills/poteto-mode/references/principles/`](./skills/poteto-mode/references/principles/). they are not slash commands. `poteto-mode` indexes them inline, reads that index at task start, and opens the leaf file for any principle it applies. the standalone files are there so other skills can reference a principle by name, and so the index can point at the full rule for each.

<details>
<summary>all twenty-three principles</summary>

| principle | group | rule |
|---|---|---|
| [laziness-protocol](./skills/poteto-mode/references/principles/laziness-protocol.md) | core | Bias toward deletion and the smallest change that solves the problem. |
| [foundational-thinking](./skills/poteto-mode/references/principles/foundational-thinking.md) | core | Apply before writing logic: choosing core types and data structures, sequencing scaffold-vs-feature work, asking what concurrent actors share. Get the data structures right so downstream code becomes obvious. |
| [redesign-from-first-principles](./skills/poteto-mode/references/principles/redesign-from-first-principles.md) | core | Redesign as if the requirement had been a foundational assumption from day one, instead of bolting it on. |
| [attack-the-premise](./skills/poteto-mode/references/principles/attack-the-premise.md) | core | Apply when two or more fixes that share one premise have failed the same gate. Take a census of which actors hold the imbalance before the next fix, then question the premise instead of writing another fix that assumes it. |
| [subtract-before-you-add](./skills/poteto-mode/references/principles/subtract-before-you-add.md) | core | Remove dead weight, redundant validators, and stub references first, then build on the simpler base. |
| [minimize-reader-load](./skills/poteto-mode/references/principles/minimize-reader-load.md) | core | Count layers between question and answer, and hidden state in the reader's head; collapse one-caller wrappers and shrink mutable scope. |
| [outcome-oriented-execution](./skills/poteto-mode/references/principles/outcome-oriented-execution.md) | core | Apply during planned rewrites and migrations with explicit phase boundaries. Converge on the target architecture; don't preserve smooth intermediate states with throwaway compatibility code. |
| [experience-first](./skills/poteto-mode/references/principles/experience-first.md) | core | Choose user delight over implementation convenience; ship fewer polished features over more rough ones. |
| [exhaust-the-design-space](./skills/poteto-mode/references/principles/exhaust-the-design-space.md) | core | Build 2-3 competing prototypes and compare side by side before committing. |
| [build-the-lever](./skills/poteto-mode/references/principles/build-the-lever.md) | core | Apply to any non-trivial work, not just bulk work: edits, migrations, analyses, checks. Build the tool that does it or proves it (codemod, script, generator, or a skill your subagents follow) instead of working by hand. The tool is the artifact a reviewer can rerun. |
| [model-the-domain](./skills/poteto-mode/references/principles/model-the-domain.md) | architecture | Encode the domain in a structure instead of scattered conditionals. |
| [boundary-discipline](./skills/poteto-mode/references/principles/boundary-discipline.md) | architecture | Concentrate guards at system boundaries (CLI, config, network, external APIs); trust internal types and keep business logic in pure functions. |
| [type-system-discipline](./skills/poteto-mode/references/principles/type-system-discipline.md) | architecture | Make illegal states unrepresentable, brand semantic primitives, parse external data at boundaries, refuse to lie to the compiler, exhaust variants, derive from authoritative schemas. |
| [make-operations-idempotent](./skills/poteto-mode/references/principles/make-operations-idempotent.md) | architecture | Converge to the same end state regardless of partial prior runs. |
| [migrate-callers-then-delete-legacy-apis](./skills/poteto-mode/references/principles/migrate-callers-then-delete-legacy-apis.md) | architecture | Migrate callers and delete the old API in the same wave instead of preserving compatibility layers. |
| [separate-before-serializing-shared-state](./skills/poteto-mode/references/principles/separate-before-serializing-shared-state.md) | architecture | Eliminate the sharing first; serialize structurally only when one shared writer is a real invariant. |
| [prove-it-works](./skills/poteto-mode/references/principles/prove-it-works.md) | verification | Apply after completing a task, before declaring done. Verify against the real artifact (run the feature, read the actual value, inspect the diff), not a proxy, self-report, or 'it compiles.'. |
| [fix-root-causes](./skills/poteto-mode/references/principles/fix-root-causes.md) | verification | Trace each symptom to its root cause and fix it there; reproduce first, ask why until you reach it, resist nil-check guards that silence crashes. |
| [sequence-verifiable-units](./skills/poteto-mode/references/principles/sequence-verifiable-units.md) | verification | Apply to multi-step work (sweeps, migrations, runs of similar edits) and to how you stack commits and PRs. Break work into small units that each end in a verifiable state, check each before the next, and order delivery so the sequence proves itself to a reviewer. |
| [test-behavior-not-implementation](./skills/poteto-mode/references/principles/test-behavior-not-implementation.md) | verification | Apply when you write, change, or keep a test. Call the code the way its users do and assert the result they observe against a literal expected value. If the test would still pass when every imported function returns undefined, rewrite the assertion or delete the test. |
| [guard-the-context-window](./skills/poteto-mode/references/principles/guard-the-context-window.md) | delegation | Route bulk to subagents; keep summaries in the main thread, not raw payloads. |
| [never-block-on-the-human](./skills/poteto-mode/references/principles/never-block-on-the-human.md) | delegation | Proceed, present the result, let the human course-correct after the fact; reserve confirmation for irreversible actions. |
| [encode-lessons-in-structure](./skills/poteto-mode/references/principles/encode-lessons-in-structure.md) | meta | Encode the rule as a lint, metadata flag, runtime check, or script instead of more text. |

</details>

## not shipped here

a few things `poteto-mode` references but doesn't bundle:

- the `deslop` skill (`/cursor-team-kit:deslop`) ships in the `cursor-team-kit` plugin.
- `control-cli` (for CLIs and TUIs) and `control-ui` (for browser, Electron, web) ship in `cursor-team-kit` too.
- SKILL.md authoring follows devin's skill conventions; the [authoring-a-skill playbook](./skills/poteto-mode/playbooks/authoring-a-skill.md) has the details.

install `cursor-team-kit` alongside pstack if you want the full set:

```bash
devin plugins install --local ~/.devin-plugins/cursor-team-kit
```

the helper scripts under [`skills/poteto-mode/scripts/`](./skills/poteto-mode/scripts/) need [`bun`](https://bun.sh) installed.

## why are there no planning skills?

devin already has a great plan mode (`/plan`) which works great with pstack. but personally, i don't believe in planning. the best spec is code. if you do want to make a plan, [`/pstack:poteto-mode`](./skills/poteto-mode/SKILL.md) covers it, but it's not a default. 

## make it yours

`poteto-mode` is my style. you may not want exactly that.

type [`/pstack:automate-me`](./skills/automate-me/SKILL.md). it mines your recent session transcripts, drafts a `<your-name>-mode` skill from how you've actually worked, and routes through pstack underneath. you keep pstack as the base and end up with your own routing skill alongside `poteto-mode`.

models are configurable too. type [`/pstack:setup-pstack`](./skills/setup-pstack/SKILL.md). it detects the models you have access to, writes a small always-on rule mapping each role (code, judgment, the panel seats) to a model, and pins `model:` on this plugin's agent profiles. every skill falls back to sensible defaults when the rule is absent, so you override only what you want.

## automations

pstack also ships a dormant [benny automation pack](./automations/benny/). benny triages slack issue reports, then reproduces and fixes confirmed bugs with real ui evidence. its files are not registered as slash skills.

to set it up, point devin at [`FOR_AGENTS.md`](./automations/benny/FOR_AGENTS.md). setup copies the pack into the target repository at `.devin/automations/benny/`, requires pstack there for shared skills, and keeps user configuration outside the copied pack. each live automation is a reviewed prompt file you schedule as a recurring devin cloud session (devin api / playbooks) or a cron `devin -p` job.

## license

MIT

## adapted for devin

this plugin was adapted from [`cursor/plugins`](https://github.com/cursor/plugins) @ `6ed0f7a9504f577d7529064103cecce9be7dfc5e` (2026-09-20). the mapping:

- `Task` tool calls → `run_subagent` with profiles (`subagent_general`, `subagent_explore`, `pstack:poteto-agent`, `pstack:comment-sicko`, `pstack:pstack-judge`, `pstack:pstack-panel-a..d`).
- per-call `model:` slugs → `model:` pinned on agent profiles via `/pstack:setup-pstack`; cursor effort tokens have no devin equivalent (thinking level is a session toggle).
- `AskQuestion` → `ask_user_question`; `Read` → `read`.
- the 23 `principle-*` skills → reference files under `skills/poteto-mode/references/principles/`, read by `poteto-mode`.
- cursor transcripts (`~/.cursor/projects/*/agent-transcripts/`) → the devin session store (`sessions.db`, filtered by `working_directory`).
- cursor automations → scheduled devin cloud sessions (devin api / playbooks) or cron `devin -p` jobs.
- `.cursor/` paths → `.devin/`; `~/.cursor/rules/*.mdc` → `~/.devin/rules/*.md`.

to update from upstream: re-vendor the upstream plugin directories over this repo, then `git diff` against the baseline vendoring commit to re-apply this adaptation.
