/** Every line gets an anchor like 12#a3f1, its number plus a hash of its text. */
export type Edit = { from: string; to?: string; lines: string[] } | { after: string; lines: string[] };

export class StaleAnchor extends Error {}

/** FNV-1a, folded to 16 bits. Small, fast, and identical on every platform. */
export function lineHash(line: string) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < line.length; i++) {
    hash ^= line.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return ((hash ^ (hash >>> 16)) & 0xffff).toString(16).padStart(4, "0");
}

const split = (text: string) => {
  const lines = text.split("\n");
  if (lines.at(-1) === "") lines.pop();
  return lines;
};

export function render(text: string, offset = 1, limit = 400) {
  return split(text)
    .map((line, index) => `${index + 1}#${lineHash(line)}|${line}`)
    .slice(offset - 1, offset - 1 + limit)
    .join("\n");
}

/** Returns the zero-based index an anchor points to, or throws if the file moved on. */
function resolve(anchor: string, lines: string[]) {
  const match = anchor.match(/^(\d+)#([0-9a-f]{4})$/);
  if (!match) throw new StaleAnchor(`"${anchor}" is not an anchor. Use the form 12#a3f1.`);
  const index = Number(match[1]) - 1;
  if (index < 0 || index >= lines.length || lineHash(lines[index]) !== match[2]) {
    throw new StaleAnchor(`${anchor} is stale. Read the file again before editing.`);
  }
  return index;
}

/** All anchors are checked before anything changes, so a bad edit leaves no trace. */
export function applyEdits(text: string, edits: Edit[]) {
  const lines = split(text);
  const spans = edits.map((edit) => {
    if ("after" in edit) {
      const at = edit.after === "0" ? 0 : resolve(edit.after, lines) + 1;
      return { start: at, end: at, lines: edit.lines };
    }
    const start = resolve(edit.from, lines);
    const end = edit.to ? resolve(edit.to, lines) + 1 : start + 1;
    if (end <= start) throw new StaleAnchor(`${edit.to} comes before ${edit.from}.`);
    return { start, end, lines: edit.lines };
  });

  const ordered = spans.sort((a, b) => b.start - a.start);
  ordered.forEach((span, index) => {
    const next = ordered[index - 1];
    if (next && span.end > next.start) throw new StaleAnchor("Two edits overlap.");
  });
  for (const span of ordered) lines.splice(span.start, span.end - span.start, ...span.lines);

  return lines.join("\n") + (text.endsWith("\n") || !text ? "\n" : "");
}
