import { projects as rawProjects } from "../../data/projects.js";

const requiredStringFields = [
  "id", "name", "tagline", "description", "accent", "category", "type",
  "keyDecision", "storyTitle", "storySummary", "storyTone", "role",
  "challenge", "result", "widget"
];

function validateProject(project, index) {
  const errors = [];
  requiredStringFields.forEach((field) => {
    if (typeof project[field] !== "string" || !project[field].trim()) errors.push(`${field} must be a non-empty string`);
  });
  if (!Array.isArray(project.stack) || project.stack.length === 0) errors.push("stack must be a non-empty array");
  if (project.stack?.some((item) => typeof item !== "string" || !item.trim())) errors.push("stack entries must be strings");
  if (errors.length) throw new Error(`Invalid project at index ${index}: ${errors.join("; ")}`);
  return Object.freeze({ ...project, stack: Object.freeze([...project.stack]) });
}

export function getProjects() {
  return Object.freeze(rawProjects.map(validateProject));
}

export function getProjectById(id) {
  return getProjects().find((project) => project.id === id) || null;
}
