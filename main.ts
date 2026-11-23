// Sleeve notes for the Frog Trio — "The Blue Lily".
// Writes the album title and back cover blurb to /output/entry.txt.
// Deterministic, stdlib only: no network, no clock, no files outside this repo.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const TITLE = "The Blue Lily";

const BLURB =
  "The trio's first live record, cut in one night at the club it is named for. " +
  "The saxophone bends every tune toward midnight, the bass holds the room together, " +
  "and the drums keep it all moving without ever raising their voice. " +
  "Three frogs, and nobody in the room asked for a singer.";

// Title on its own line, a blank line, then the blurb. No trailing newline:
// the gate counts every character in the file, and the cap is 400.
const entry = `${TITLE}\n\n${BLURB}`;

if (entry.length < 1 || entry.length > 400) {
  throw new Error(`entry is ${entry.length} characters, must be 1-400`);
}
if (entry.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entry, "utf8");

// Read it back: fail loudly instead of shipping a file that is not the entry.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== entry) {
  throw new Error("read-back mismatch: /output/entry.txt does not hold the entry");
}
console.log(`wrote /output/entry.txt (${entry.length} characters)`);
