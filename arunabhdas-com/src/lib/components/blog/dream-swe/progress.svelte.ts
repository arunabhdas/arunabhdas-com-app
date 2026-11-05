/**
 * Reader progress through the guide, remembered in this browser.
 * Storage can throw in private windows, so every access is guarded.
 */
const STORAGE_KEY = 'dream-swe-macos:done';

export const PROGRESS_KEY = Symbol('dream-swe-progress');

export class GuideProgress {
	done = $state<number[]>([]);

	load() {
		try {
			const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
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
			localStorage.setItem(STORAGE_KEY, JSON.stringify(this.done));
		} catch {
			// Progress simply lasts until the page closes.
		}
	}
}
