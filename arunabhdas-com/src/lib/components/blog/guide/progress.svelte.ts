/**
 * Reader progress through a guide, remembered in this browser.
 * Storage can throw in private windows, so every access is guarded.
 */
export const GUIDE_KEY = Symbol('blog-guide');

export type CodeBlockData = { lang: string; file?: string; code: string; out?: boolean };

/** What a post shares with its steps and code blocks through context. */
export type Guide = {
	progress: GuideProgress;
	blocks: Record<string, CodeBlockData>;
	/** The folder shown in each step's prompt, for example ~/dream */
	path: string;
};

export class GuideProgress {
	done = $state<number[]>([]);

	constructor(private storageKey: string) {}

	load() {
		try {
			const saved = JSON.parse(localStorage.getItem(this.storageKey) ?? '[]');
			this.done = Array.isArray(saved) ? saved.map(Number) : [];
		} catch {
			this.done = [];
		}
	}

	has(step: number) {
		return this.done.includes(step);
	}

	set(step: number, checked: boolean) {
		this.done = checked
			? [...this.done.filter((n) => n !== step), step]
			: this.done.filter((n) => n !== step);
		this.save();
	}

	reset() {
		this.done = [];
		this.save();
	}

	private save() {
		try {
			localStorage.setItem(this.storageKey, JSON.stringify(this.done));
		} catch {
			// Progress simply lasts until the page closes.
		}
	}
}
