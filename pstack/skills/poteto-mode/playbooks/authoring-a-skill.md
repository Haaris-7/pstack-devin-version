### Authoring or modifying a skill

**You own the skill's voice.**

1. Author to Devin's SKILL.md conventions: frontmatter keys limited to `name` (equal to the directory name), `description`, `argument-hint`, `model`, `subagent`, `agent`, `allowed-tools`, `permissions`, `triggers`.
2. Validate the skill: frontmatter has `name` and `description`, referenced files exist, cross-skill links resolve.
3. Test cases if structural. Skip if subjective.
4. Run **Opening a PR**.

When in doubt, delete. Keep only prose that changes a decision. Tell it to do the thing and skip the reason. Explain only when the rule is confusing without one. Match tone to scope. Point at structural sources (types, READMEs, config) per the [Encode Lessons in Structure](../references/principles/encode-lessons-in-structure.md) principle. Delegate to other skills by path. Don't restate. A workflow you keep hitting but isn't captured → propose a new skill.

**Reply:** summary of the skill, key design decisions, validation notes.
