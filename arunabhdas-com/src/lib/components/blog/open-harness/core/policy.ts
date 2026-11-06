/** Decides what a tool call may do. Pure, so it runs anywhere and tests in microseconds. */
export type Tier = "read" | "write" | "exec";
export type Decision = "allow" | "ask" | "deny";
export type Verdict = { decision: Decision; reason: string };
export type Policy = { mode: "ask" | "write" | "yolo"; protect: string[]; frozen?: string[] };
export type Call = { tool: string; input: Record<string, unknown> };

const TIERS: Record<string, Tier> = {
  read: "read", grep: "read", find: "read", ls: "read", read_lines: "read", submit_plan: "read", report: "read",
  write: "write", edit: "write", edit_lines: "write", delegate: "write",
  bash: "exec",
};

/** Never allowed, in any mode. */
const CRITICAL: [RegExp, string][] = [
  [/\bsudo\b/, "runs as root"],
  [/\brm\s+-\w*r\w*\s+(\/|~|\$HOME)(\s|$)/, "deletes a home or root folder"],
  [/\b(curl|wget)\b[^|;&]*\|\s*(ba|z)?sh\b/, "pipes the network into a shell"],
  [/\bgit\s+push\b[^;&|]*\s(--force|-f)\b/, "force-pushes"],
  [/\bgit\s+reset\s+--hard\b/, "throws away work"],
  [/\b(mkfs|shutdown|reboot)\b/, "touches the machine"],
];

/** Unknown tools get the strictest tier, so a new tool is never silently trusted. */
export const tierOf = (tool: string): Tier => TIERS[tool] ?? "exec";

function globToRegExp(glob: string): RegExp {
  const body = glob
    .replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replace(/\*\*/g, "\0")
    .replace(/\*/g, "[^/]*")
    .replace(/\0/g, ".*");
  return new RegExp(`^${body}$`);
}

/** Resolves . and .. segments. Returns null when the path leaves the project. */
export function normalize(path: string, cwd = ""): string | null {
  const inside = cwd && path.startsWith(`${cwd}/`) ? path.slice(cwd.length + 1) : path;
  if (inside.startsWith("/") || inside.startsWith("~")) return null;
  const parts: string[] = [];
  for (const part of inside.split("/")) {
    if (part === "..") {
      if (!parts.length) return null;
      parts.pop();
    } else if (part && part !== ".") {
      parts.push(part);
    }
  }
  return parts.join("/");
}

export function isProtected(path: string, protect: string[]) {
  const name = path.split("/").pop() ?? path;
  return protect.some((glob) => globToRegExp(glob).test(glob.includes("/") ? path : name));
}

export function decide({ tool, input }: Call, policy: Policy, cwd = ""): Verdict {
  const tier = tierOf(tool);

  if (typeof input.path === "string") {
    const path = normalize(input.path, cwd);
    if (path === null && tier !== "read") {
      return { decision: "deny", reason: `${input.path} is outside the project` };
    }
    if (path !== null && isProtected(path, policy.protect)) {
      return { decision: "deny", reason: `${path} is protected` };
    }
    if (path !== null && tier !== "read" && isProtected(path, policy.frozen ?? [])) {
      return { decision: "deny", reason: `${path} is frozen. Find the code it tests and fix that instead` };
    }
  }

  if (tool === "bash") {
    const command = String(input.command ?? "");
    for (const [pattern, why] of CRITICAL) {
      if (pattern.test(command)) return { decision: "deny", reason: `this command ${why}` };
    }
    for (const word of command.split(/[\s"'=;|&<>]+/)) {
      const path = word && normalize(word, cwd);
      if (path && isProtected(path, policy.protect)) {
        return { decision: "deny", reason: `the command mentions ${path}, which is protected` };
      }
    }
  }

  const free = policy.mode === "yolo" || tier === "read" || (policy.mode === "write" && tier === "write");
  return free
    ? { decision: "allow", reason: `${tier} is allowed in ${policy.mode} mode` }
    : { decision: "ask", reason: `${tier} needs approval in ${policy.mode} mode` };
}
