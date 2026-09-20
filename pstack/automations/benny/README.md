# benny

benny gives you two scheduled devin sessions for slack issue reports. one triages each report. the other reproduces confirmed bugs and may prepare a small draft fix.

> **Adapted for Devin.** Upstream, benny drove Cursor's built-in `/automate` skill and its Automations editor. Devin has no equivalent, so each automation is a reviewed prompt file that you schedule yourself: a recurring Devin cloud session (Devin API / Playbooks) or a cron job running `devin -p "$(cat <prompt-file>)"`. The `setup-benny` flow writes the two prompt files; everything else (triage and repro logic, safety rules, thread coordinates) is unchanged.

the files in this directory are dormant setup and automation sources. they do not appear as slash skills.

## set it up

1. point devin at [`FOR_AGENTS.md`](./FOR_AGENTS.md) and name the target repository.
2. let setup merge this whole directory into the target at `.devin/automations/benny/`. it must preserve destination-only files and review conflicts instead of overwriting local edits.
3. let setup install pstack (`devin plugins install --local ~/.devin-plugins/pstack`) and record it in the target repository's `.devin/config.json` for shared dependencies:

```json
{
	"requiredPlugins": ["~/.devin-plugins/pstack"]
}
```

4. keep user-owned configuration outside the copied pack, for example in `.devin/benny/`. adapt [`configuration.example.yaml`](./templates/configuration.example.yaml) and [`feature-map.example.md`](./skills/reproduce-and-fix-issues/references/feature-map.example.md).
5. commit `.devin/config.json`, `.devin/automations/benny/`, and any secret-free configuration before enabling either automation.
6. review each generated prompt file, then schedule it as a recurring devin cloud session or a cron `devin -p "$(cat <prompt-file>)"`. send a harmless test report and verify every source-channel post stays in the original thread.
