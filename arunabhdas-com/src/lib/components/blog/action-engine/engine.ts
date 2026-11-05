/**
 * The rule tier and validator from the post's Swift package, ported line for line so the
 * page can run them. Same words, same pinned clock, same hash as `act plan` on a Mac.
 */
export const DEMO_NOW = Date.UTC(2026, 10, 5, 9, 0, 0);

const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const DATE =
	/^(?:(?:on |next )?(today|tomorrow|sunday|monday|tuesday|wednesday|thursday|friday|saturday))?\s*(?:(?:at )?(\d{1,2})(?::(\d{2}))?\s*(am|pm)?)?$/;
const TAIL =
	/\s+((?:on |next )?(?:today|tomorrow|sunday|monday|tuesday|wednesday|thursday|friday|saturday)(?:\s+(?:at )?\d{1,2}(?::\d{2})?\s*(?:am|pm)?)?|at \d{1,2}(?::\d{2})?\s*(?:am|pm)?)$/i;

export type Action =
	| { addTask: { title: string; due?: string } }
	| { scheduleEvent: { title: string; start: string; minutes: number } }
	| { saveNote: { title: string; body: string } }
	| { extractTasks: { note: string } };

export type Step = { id: string; action: Action; after: string[] };
export type Plan = { steps: Step[] };

function iso(time: number) {
	return new Date(time).toISOString().replace('.000Z', 'Z');
}

export function resolveDate(phrase: string, now = DEMO_NOW): string | null {
	const text = phrase.toLowerCase().trim();
	const match = text ? text.match(DATE) : null;
	if (!match) return null;
	const [, day, rawHour, rawMinute, ampm] = match;

	let hour = 9;
	let minute = 0;
	if (rawHour !== undefined) {
		hour = Number(rawHour);
		minute = rawMinute === undefined ? 0 : Number(rawMinute);
		if (ampm) {
			if (hour < 1 || hour > 12) return null;
			hour = (hour % 12) + (ampm === 'pm' ? 12 : 0);
		} else if (rawMinute === undefined) {
			return null;
		}
	}
	if (hour > 23 || minute > 59) return null;

	const today = new Date(now);
	let offset = 0;
	if (day === 'tomorrow') offset = 1;
	else if (day && day !== 'today') {
		offset = (DAYS.indexOf(day) - today.getUTCDay() + 7) % 7;
		if (offset === 0) offset = 7;
	}
	return iso(
		Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + offset, hour, minute)
	);
}

function splitWhen(text: string): [string, string | null] {
	const match = text.match(TAIL);
	return match ? [text.slice(0, match.index), match[1]] : [text, null];
}

function action(text: string, now: number): Action | null {
	let m = text.match(/^(?:remind me to|add a task to|add task:?|todo:?)\s+(.+)$/i);
	if (m) {
		const [title, phrase] = splitWhen(m[1]);
		if (phrase === null) return { addTask: { title } };
		const due = resolveDate(phrase, now);
		return due ? { addTask: { title, due } } : null;
	}
	m = text.match(/^(?:schedule|book)\s+(?!me\b)(.+?)(?:\s+for\s+(\d+)\s*(minutes?|mins?|hours?))?$/i);
	if (m) {
		const [title, phrase] = splitWhen(m[1]);
		const start = phrase === null ? null : resolveDate(phrase, now);
		if (!start) return null;
		let minutes = 30;
		if (m[2]) minutes = m[3].toLowerCase().startsWith('hour') ? Number(m[2]) * 60 : Number(m[2]);
		return { scheduleEvent: { title, start, minutes } };
	}
	m = text.match(/^(?:save a note|save note|note)(?:\s+(?:called|titled))?\s+([^:]+):\s*(.+)$/i);
	if (m) return { saveNote: { title: m[1], body: m[2] } };

	m = text.match(/^(?:extract tasks from\s+(.+)|turn\s+(.+)\s+into tasks)$/i);
	if (m) return { extractTasks: { note: m[1] ?? m[2] } };

	return null;
}

/** Tier 0: a plan, or null when the request needs a model. */
export function planFromRules(request: string, now = DEMO_NOW): Plan | null {
	const parts = request
		.split(/\s+(?:and\s+)?then\s+/)
		.filter(Boolean)
		.map((part) => part.trim());
	const steps: Step[] = [];
	for (const [index, part] of parts.entries()) {
		const found = action(part, now);
		if (!found) return null;
		steps.push({ id: `s${index + 1}`, action: found, after: index === 0 ? [] : [`s${index}`] });
	}
	return steps.length ? { steps } : null;
}

const MAX_STEPS = 8;
const HORIZON = 2 * 365 * 86_400_000;

function titleProblem(title: string) {
	if (!title.trim() || [...title].length > 120) return 'a title has 1 to 120 characters.';
	if (/[\n\r]/.test(title)) return 'a title is a single line.';
	return null;
}

function fieldProblem(action: Action, now: number) {
	const outside = (date: string) => {
		const time = Date.parse(date);
		return time < now || time > now + HORIZON;
	};
	if ('addTask' in action) {
		const { title, due } = action.addTask;
		const problem = titleProblem(title);
		if (problem) return problem;
		return due && outside(due) ? 'the due date is not in the next two years.' : null;
	}
	if ('scheduleEvent' in action) {
		const { title, start, minutes } = action.scheduleEvent;
		const problem = titleProblem(title);
		if (problem) return problem;
		if (outside(start)) return 'the start is not in the next two years.';
		return minutes < 5 || minutes > 480 ? 'an event lasts 5 to 480 minutes.' : null;
	}
	if ('saveNote' in action) {
		const { title, body } = action.saveNote;
		const problem = titleProblem(title);
		if (problem) return problem;
		return !body || [...body].length > 4000 ? 'a note body has 1 to 4,000 characters.' : null;
	}
	if ('extractTasks' in action) return titleProblem(action.extractTasks.note);
	return 'The request is outside the four things this engine can do.';
}

/** The gate. Returns the reason a plan is refused, or null when it may run. */
export function refuse(plan: Plan, now = DEMO_NOW): string | null {
	if (!plan.steps.length) return 'The plan has no steps.';
	if (plan.steps.length > MAX_STEPS) {
		return `The plan has ${plan.steps.length} steps. The limit is ${MAX_STEPS}.`;
	}
	const ids = new Set<string>();
	for (const step of plan.steps) {
		if (ids.has(step.id)) return `Two steps share the id ${step.id}.`;
		ids.add(step.id);
	}
	for (const step of plan.steps) {
		const problem = fieldProblem(step.action, now);
		if (problem) return problem.startsWith('The request') ? problem : `Step ${step.id}: ${problem}`;
		for (const needed of step.after) {
			if (!ids.has(needed)) return `Step ${step.id} waits for ${needed}, which does not exist.`;
		}
	}
	const done = new Set<string>();
	while (done.size < plan.steps.length) {
		const next = plan.steps.find(
			(step) => !done.has(step.id) && step.after.every((id) => done.has(id))
		);
		if (!next) return 'The steps wait for each other in a loop.';
		done.add(next.id);
	}
	return null;
}

export function canonicalJSON(value: unknown): string {
	if (Array.isArray(value)) return `[${value.map(canonicalJSON).join(',')}]`;
	if (value && typeof value === 'object') {
		const entries = Object.entries(value).sort(([a], [b]) => (a < b ? -1 : 1));
		return `{${entries.map(([key, item]) => `${JSON.stringify(key)}:${canonicalJSON(item)}`).join(',')}}`;
	}
	return JSON.stringify(value);
}

export async function fingerprint(value: unknown) {
	const bytes = new TextEncoder().encode(canonicalJSON(value));
	const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', bytes));
	return [...digest.slice(0, 6)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}
