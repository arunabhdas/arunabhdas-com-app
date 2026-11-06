/**
 * A small highlighter for the guides' shell, Lua, JSON, Vim, Swift, and TypeScript snippets.
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

const SWIFT_TOKEN =
	/(?<c>\/\/.*$)|(?<s>#"(?:[^"]|"(?!#))*"#|"(?:[^"\\]|\\.)*")|(?<r>(?<=[(=:,]\s?)\/(?![/*\s])(?:[^/\\\n]|\\.)+\/)|(?<f>[@#][A-Za-z]+)|(?<k>\b(?:actor|as|async|await|break|case|catch|continue|default|defer|do|else|enum|extension|false|for|func|guard|if|import|in|init|is|let|nil|private|protocol|public|return|self|static|struct|switch|throw|throws|true|try|var|where|while)\b)|(?<v>\b[A-Z][A-Za-z0-9]*\b)/g;
const SWIFT_CLASS: Record<string, string> = {
	c: 't-c',
	s: 't-s',
	r: 't-s',
	f: 't-f',
	k: 't-k',
	v: 't-v'
};

function highlightSwift(code: string) {
	let inString = false;
	return code
		.split('\n')
		.map((line) => {
			const fence = line.includes('"""');
			if (inString) {
				if (fence) inString = false;
				return span('t-s', line);
			}
			if (fence) {
				const [before, after] = [line.slice(0, line.indexOf('"""')), line.slice(line.indexOf('"""'))];
				inString = true;
				return highlightSwiftLine(before) + span('t-s', after);
			}
			return highlightSwiftLine(line);
		})
		.join('\n');
}

function highlightSwiftLine(line: string) {
	return highlightWith(line, SWIFT_TOKEN, SWIFT_CLASS);
}

function highlightWith(line: string, tokens: RegExp, classes: Record<string, string>) {
	let html = '';
	let index = 0;
	for (const match of line.matchAll(tokens)) {
		const group = Object.keys(classes).find((name) => match.groups?.[name] !== undefined)!;
		html += escapeHtml(line.slice(index, match.index)) + span(classes[group], match[0]);
		index = match.index + match[0].length;
	}
	return html + escapeHtml(line.slice(index));
}

const TS_TOKEN =
	/(?<c>\/\/.*$|\/\*.*?\*\/)|(?<s>"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(?<r>(?<=[(=:,[!&|?]\s?)\/(?![/*\s])(?:[^/\\\n]|\\.)+\/[gimsuy]*)|(?<k>\b(?:as|async|await|break|case|catch|class|const|continue|default|else|export|extends|false|finally|for|from|function|if|import|in|new|null|of|private|return|static|switch|this|throw|true|try|type|typeof|undefined|void|while)\b)|(?<v>\b[A-Z][A-Za-z0-9]*\b)/g;
const TS_CLASS: Record<string, string> = { c: 't-c', s: 't-s', r: 't-s', k: 't-k', v: 't-v' };

export function highlight(code: string, lang: string) {
	if (lang === 'swift') return highlightSwift(code);
	if (lang === 'ts') {
		return code
			.split('\n')
			.map((line) => highlightWith(line, TS_TOKEN, TS_CLASS))
			.join('\n');
	}

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
