/**
 * A small highlighter for the guide's shell, Lua, JSON, and Vim snippets.
 * Every string is escaped here, so the result is safe to render with {@html}.
 */
const TOKEN =
	/(?<s>"(?:[^"\\]|\\.)*"|'[^']*')|(?<f>(?<=\s)--?[A-Za-z][\w-]*)|(?<v>\$\{?[A-Za-z_]\w*\}?)/g;
const CLASS_FOR: Record<string, string> = { s: 't-s', f: 't-f', v: 't-v' };
const KEYWORDS = new Set(['do', 'done', 'then', 'else', 'fi', 'for', 'if']);

function escapeHtml(text: string) {
	return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function span(className: string, text: string) {
	return `<span class="${className}">${escapeHtml(text)}</span>`;
}

function highlightTokens(line: string) {
	let html = '';
	let index = 0;
	for (const match of line.matchAll(TOKEN)) {
		const group = Object.keys(CLASS_FOR).find((name) => match.groups?.[name] !== undefined)!;
		html += escapeHtml(line.slice(index, match.index)) + span(CLASS_FOR[group], match[0]);
		index = match.index + match[0].length;
	}
	return html + escapeHtml(line.slice(index));
}

/** Finds a trailing comment that is not inside a string. */
function splitComment(line: string, marker: string): [string, string] {
	let quote: string | null = null;
	for (let i = 0; i < line.length; i++) {
		const char = line[i];
		if (quote) {
			if (char === quote) quote = null;
		} else if (char === '"' || char === "'") {
			quote = char;
		} else if (line.startsWith(marker, i) && (i === 0 || line[i - 1] === ' ' || line[i - 1] === '\t')) {
			return [line.slice(0, i), line.slice(i)];
		}
	}
	return [line, ''];
}

function highlightShell(line: string) {
	const [body, comment] = splitComment(line, '#');
	const command = body.match(/^(\s*)([A-Za-z][\w./-]*)(?=\s|$)(.*)$/);
	const html =
		command && !KEYWORDS.has(command[2])
			? command[1] + span('t-k', command[2]) + highlightTokens(command[3])
			: highlightTokens(body);
	return comment ? html + span('t-c', comment) : html;
}

export function highlight(code: string, lang: string) {
	const marker = code.slice(0, 60).includes('wezterm') ? '--' : '#';
	let heredoc: string | null = null;

	return code
		.split('\n')
		.map((line) => {
			if (heredoc) {
				if (line.trim() === heredoc) {
					heredoc = null;
					return span('t-k', line);
				}
				const [body, comment] = splitComment(line, marker);
				return highlightTokens(body) + (comment ? span('t-c', comment) : '');
			}
			if (lang === 'sh') {
				heredoc = line.match(/<<'(\w+)'/)?.[1] ?? null;
				return highlightShell(line);
			}
			if (lang === 'json') return highlightTokens(line);
			if (lang === 'vim') return span('t-k', line);
			return escapeHtml(line);
		})
		.join('\n');
}
