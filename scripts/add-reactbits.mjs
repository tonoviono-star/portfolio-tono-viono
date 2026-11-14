// Fetch React Bits components from the shadcn-style registry and write them into src/components.
// Usage: node scripts/add-reactbits.mjs <Component1> <Component2> ...
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
const dirArg = args.find((a) => a.startsWith("--dir="));
const OUT_DIR = dirArg ? dirArg.slice("--dir=".length) : "src/components";
const names = args.filter((a) => !a.startsWith("--dir="));
if (!names.length) {
  console.error("Usage: node scripts/add-reactbits.mjs <Component...>");
  process.exit(1);
}

const ROOT = process.cwd();
const DEPS = new Set();

for (const name of names) {
  const slug = `${name}-TS-TW`;
  const url = `https://reactbits.dev/r/${slug}.json`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`✗ ${slug}: HTTP ${res.status}`);
    continue;
  }
  const item = await res.json();

  for (const file of item.files ?? []) {
    const rel = path.join(OUT_DIR, path.basename(file.path));
    const target = path.join(ROOT, rel);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, file.content, "utf8");
    console.log(`✓ ${slug} -> ${rel}`);
  }

  for (const dep of item.dependencies ?? []) DEPS.add(dep);
  for (const dep of item.registryDependencies ?? []) console.log(`  (registry dep: ${dep})`);
}

console.log("\nDependencies:", [...DEPS].join(" ") || "(none)");
