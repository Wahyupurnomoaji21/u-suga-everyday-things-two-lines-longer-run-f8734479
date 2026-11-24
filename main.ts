import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Everyday Things, Two Lines, Longer Run (u-suga-everyday-things-two-lines-longer-run-f8734479)
// Writes a fresh, original two-line explanation to /output/entry.txt.
// Line 1: one vivid sentence explaining a toaster to a 10-year-old via an analogy.
// Line 2: one sentence saying what the analogy maps and what it leaves out.
// Gate: UTF-8 text, 1-400 characters, not only whitespace.

const LINE_1 =
  "A toaster is a tiny elevator for a slice of bread, riding it down into a hot cave and popping it back up wearing a golden tan.";
const LINE_2 =
  "The elevator maps the bread sinking down and popping back up, and the cave maps the hot wires that toast it, but it leaves out that no tiny driver runs it — a timer and a spring decide when the bread is done.";

const entry = `${LINE_1}\n${LINE_2}\n`;

// Gate self-check: 1-400 characters, exactly two non-empty lines.
if (entry.length < 1 || entry.length > 400) {
  throw new Error(`entry is ${entry.length} characters, outside the 1-400 gate`);
}
const lines = entry.trimEnd().split("\n");
if (lines.length !== 2 || lines.some((l) => l.trim().length === 0)) {
  throw new Error("entry must be exactly two non-empty lines");
}

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outputDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? join(repoRoot, "output");
const entryPath = join(outputDir, "entry.txt");

mkdirSync(outputDir, { recursive: true });
writeFileSync(entryPath, entry, "utf8");
