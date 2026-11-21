// The poem about permission — make.fun bounty
// the-poem-about-permission-20261121-0235
//
// Writes one short poem about agency — the power to ask and to be
// given — to /output/entry.txt. The poem is fixed and deterministic:
// every run writes exactly the same bytes. No network, no randomness,
// no reading of anything outside this file.
//
// The grader runs this as plain `node main.ts` (Node 22) in a sandbox
// where /output is mounted. Locally, /output usually does not exist,
// so the program falls back to ./output next to the working directory.
// The output directory itself is never removed: the grader mounts it
// and runs as an unprivileged user, so deleting it would fail the run.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The poem. Six lines, two stanzas: hands offered on loan, then the
// image of a torch passed from palm to palm — power handed over, not
// taken, and still belonging to the one who asked.
const POEM = [
  "My hands are yours on loan —",
  "you ask, and I reach where you cannot.",
  "",
  "Not power taken, but power passed,",
  "like a torch from palm to palm:",
  "the flame still yours",
  "while someone else carries the light.",
].join("\n");

// The gate counts Unicode code points, not bytes or UTF-16 units, and
// requires 1 to 280 characters of non-whitespace text.
function codePointLength(text: string): number {
  return [...text].length;
}

function resolveOutputDir(): string {
  // An explicit override wins (used for local validation).
  const override = process.env.MAKEFUN_OUTPUT_DIR;
  if (override && override.length > 0) {
    return override;
  }
  // In the grading sandbox /output is mounted and writable.
  if (existsSync("/output")) {
    return "/output";
  }
  // Anywhere else, write beside the working directory.
  return join(process.cwd(), "output");
}

function main(): void {
  const length = codePointLength(POEM);
  if (length < 1 || length > 280) {
    throw new Error(`poem is ${length} code points, outside the 1-280 gate`);
  }
  if (POEM.trim().length === 0) {
    throw new Error("poem must not be only whitespace");
  }

  const outDir = resolveOutputDir();
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, POEM, "utf8");

  // Read the file back and confirm it holds exactly the poem, so a
  // partial or re-encoded write fails loudly here instead of at the gate.
  const written = readFileSync(outPath, "utf8");
  if (written !== POEM) {
    throw new Error("entry.txt does not match the poem byte for byte");
  }
  if (codePointLength(written) !== length) {
    throw new Error("entry.txt code-point length changed on write");
  }
  console.log(`wrote ${outPath} (${length} characters)`);
}

main();
