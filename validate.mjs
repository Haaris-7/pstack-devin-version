#!/usr/bin/env node
// Structural validator for the Devin-adapted plugins. No dependencies.
// Checks: SKILL.md / agent frontmatter keys and names, rule triggers,
// plugin manifest JSON, and relative markdown link targets.
import fs from "node:fs";
import path from "node:path";

const ROOT = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const PLUGINS = ["pstack", "cursor-team-kit"];

const SKILL_KEYS = new Set([
	"name",
	"description",
	"argument-hint",
	"model",
	"subagent",
	"agent",
	"allowed-tools",
	"permissions",
	"triggers",
]);
const AGENT_KEYS = new Set(["name", "description", "model", "allowed-tools", "tools", "max-nesting"]);
const RULE_TRIGGERS = new Set(["always_on", "manual", "model_decision", "agent", "glob"]);

const problems = [];
const fail = (file, msg) => problems.push(`${path.relative(ROOT, file)}: ${msg}`);

function frontmatter(file) {
	const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
	if (lines[0] !== "---") return null;
	const end = lines.indexOf("---", 1);
	if (end === -1) return null;
	return lines.slice(1, end);
}

function topKeys(fm) {
	const keys = [];
	for (const line of fm) {
		const m = line.match(/^([A-Za-z0-9_-]+):/);
		if (m) keys.push(m[1]);
	}
	return keys;
}

function scalar(fm, key) {
	for (const line of fm) {
		const m = line.match(new RegExp("^" + key + ":\\s*(.*)$"));
		if (m) return m[1].replace(/^["']|["']$/g, "").trim();
	}
	return null;
}

function* walk(dir) {
	if (!fs.existsSync(dir)) return;
	for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, e.name);
		if (e.isDirectory()) yield* walk(p);
		else yield p;
	}
}

for (const plugin of PLUGINS) {
	const base = path.join(ROOT, plugin);

	// manifests parse
	const manifest = path.join(base, ".devin-plugin", "plugin.json");
	try {
		JSON.parse(fs.readFileSync(manifest, "utf8"));
	} catch (e) {
		fail(manifest, `plugin.json does not parse: ${e.message}`);
	}

	// skills
	for (const file of walk(path.join(base, "skills"))) {
		if (path.basename(file) !== "SKILL.md") continue;
		const fm = frontmatter(file);
		if (!fm) {
			fail(file, "missing frontmatter");
			continue;
		}
		for (const k of topKeys(fm)) {
			if (!SKILL_KEYS.has(k)) fail(file, `unsupported skill frontmatter key "${k}"`);
		}
		const name = scalar(fm, "name");
		const dir = path.basename(path.dirname(file));
		if (name !== dir) fail(file, `skill name "${name}" != directory "${dir}"`);
	}

	// agents
	for (const file of walk(path.join(base, "agents"))) {
		if (!file.endsWith(".md")) continue;
		const fm = frontmatter(file);
		if (!fm) {
			fail(file, "missing frontmatter");
			continue;
		}
		for (const k of topKeys(fm)) {
			if (!AGENT_KEYS.has(k)) fail(file, `unsupported agent frontmatter key "${k}"`);
		}
	}

	// rules
	for (const file of walk(path.join(base, "rules"))) {
		if (!file.endsWith(".md")) {
			fail(file, "rule file is not .md");
			continue;
		}
		const fm = frontmatter(file);
		const trigger = fm && scalar(fm, "trigger");
		if (!trigger) fail(file, "rule has no trigger");
		else if (!RULE_TRIGGERS.has(trigger)) fail(file, `bad trigger "${trigger}"`);
	}
}

// relative markdown links resolve
const LINK = /\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
for (const file of walk(ROOT)) {
	if (!file.endsWith(".md")) continue;
	const text = fs.readFileSync(file, "utf8");
	let m;
	while ((m = LINK.exec(text))) {
		let target = m[1];
		if (/^[a-z]+:/i.test(target) || target.startsWith("#")) continue; // scheme or pure anchor
		target = target.split("#")[0];
		if (!target || target.includes("<") || target === "url") continue; // placeholder target
		const resolved = path.resolve(path.dirname(file), decodeURIComponent(target));
		if (!fs.existsSync(resolved)) fail(file, `dead link -> ${m[1]}`);
	}
}

if (problems.length) {
	for (const p of problems) console.error(p);
	console.error(`${problems.length} problem(s)`);
	process.exit(1);
}
console.log("validate: all checks passed");
