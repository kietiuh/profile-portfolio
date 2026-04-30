#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { projects } from "../src/data/projects.js";

const root = process.cwd();
const failures = [];
const requiredFiles = [
  "index.html",
  "work.html",
  "process.html",
  "src/data/projects.js",
  "src/scripts/main.js",
  "src/scripts/app-init.js",
  "src/scripts/router.js",
  "src/scripts/utils/dom.js",
  "src/scripts/utils/project-schema.js",
  "src/styles/base.css",
  "src/styles/main.css"
];

function fail(message) { failures.push(message); }
function read(path) { return readFileSync(join(root, path), "utf8"); }
function walk(dir, out = []) {
  for (const entry of readdirSync(join(root, dir))) {
    const rel = join(dir, entry);
    const abs = join(root, rel);
    if (statSync(abs).isDirectory()) walk(rel, out);
    else out.push(rel);
  }
  return out;
}

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) fail(`Missing required file: ${file}`);
}

for (const file of walk("src").filter((file) => extname(file) === ".js")) {
  try { execFileSync("node", ["--check", file], { stdio: "pipe" }); }
  catch (error) { fail(`JS syntax failed: ${file}\n${error.stderr?.toString() || error.message}`); }
}

for (const file of walk("src/styles").filter((file) => extname(file) === ".css")) {
  const css = read(file);
  if ((css.match(/{/g) || []).length !== (css.match(/}/g) || []).length) fail(`CSS brace mismatch: ${file}`);
}

for (const file of ["index.html", "work.html", "process.html"]) {
  const html = read(file);
  const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1].split("#")[0]);
  for (const ref of refs) {
    if (!ref || ref.startsWith("http") || ref.startsWith("mailto:") || ref.startsWith("#")) continue;
    if (!existsSync(join(root, ref))) fail(`Broken local reference in ${file}: ${ref}`);
  }
}

const requiredProjectFields = [
  "id", "name", "tagline", "description", "accent", "category", "type", "role", "challenge", "result", "keyDecision", "storyTitle", "storySummary", "storyTone", "widget", "stack"
];
const ids = new Set();
projects.forEach((project, index) => {
  requiredProjectFields.forEach((field) => {
    if (!(field in project)) fail(`Project ${index} missing field: ${field}`);
  });
  if (ids.has(project.id)) fail(`Duplicate project id: ${project.id}`);
  ids.add(project.id);
  if (!Array.isArray(project.stack) || project.stack.length === 0) fail(`Project ${project.id} needs non-empty stack array`);
});

const combined = walk("src").filter((file) => [".js", ".css"].includes(extname(file))).map(read).join("\n");
["corrective pass", "polish pass", "TODO_REMOVE", "cursor: none", "data-cursor-label"].forEach((token) => {
  if (combined.includes(token)) fail(`Disallowed stale token found: ${token}`);
});

if (failures.length) {
  console.error("Project lint failed:\n" + failures.map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}

console.log(`Project lint passed (${projects.length} projects, ${walk("src").length} source files).`);
