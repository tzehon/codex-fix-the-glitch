import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const requiredFiles = [
  "AGENTS.md",
  "CHALLENGE.md",
  "index.html",
  "styles.css",
  "src/app.mjs",
  "src/game-engine.mjs",
  "tests/fake-scheduler.mjs",
  "tests/game-engine.test.mjs",
];
const failures = [];

const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
if (nodeMajor < 22) {
  failures.push(`Node 22 or newer is required; found ${process.version}`);
} else {
  console.log(`[ok] Node ${process.version} is supported`);
}

for (const relativePath of requiredFiles) {
  try {
    const file = await stat(path.join(repositoryRoot, relativePath));
    if (!file.isFile()) {
      failures.push(`${relativePath} exists but is not a file`);
    }
  } catch {
    failures.push(`Missing required file: ${relativePath}`);
  }
}
if (failures.length === 0) {
  console.log(`[ok] Found all ${requiredFiles.length} required workshop files`);
}

const packageJson = JSON.parse(await readFile(path.join(repositoryRoot, "package.json"), "utf8"));
const dependencySections = ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"];
const declaredDependencies = dependencySections.flatMap((section) =>
  Object.keys(packageJson[section] ?? {}).map((name) => `${section}:${name}`),
);
if (declaredDependencies.length > 0) {
  failures.push(`This workshop must be dependency-free: ${declaredDependencies.join(", ")}`);
} else {
  console.log("[ok] No third-party packages are declared");
}

if (failures.length > 0) {
  console.error("\nPreflight failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log("\nPreflight passed. You are ready to start the challenge.");
}
