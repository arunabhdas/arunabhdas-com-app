<script lang="ts">
	/**
	 * How to Setup Dream SWE Dev Environment on macOS
	 * An illustrated guide that lives inside a WezTerm window. It keeps its own coolnight
	 * look, scoped to .blog-guide and .dream-guide, between the site header and footer.
	 */
	import { onMount, setContext } from 'svelte';
	import CodeBlock from '../guide/CodeBlock.svelte';
	import Step from '../guide/Step.svelte';
	import StepTabs from '../guide/StepTabs.svelte';
	import Wall from '../guide/Wall.svelte';
	import { GUIDE_KEY, GuideProgress } from '../guide/progress.svelte';
	import KeyRepeatDemo from './KeyRepeatDemo.svelte';
	import blocks from './code-blocks.json';
	import unicorn from './assets/unicorn.webp';
	import '../guide/guide-base.css';
	import './dream.css';
	import '../guide/guide-end.css';

	const tabs = [
		'mac',
		'xcode',
		'brew',
		'wezterm',
		'zsh',
		'ssh',
		'nvim',
		'herdr',
		'langs',
		'ides',
		'defaults',
		'secrets',
		'apps'
	];

	const progress = new GuideProgress('dream-swe-macos:done');
	setContext(GUIDE_KEY, { progress, blocks, path: '~/dream' });

	onMount(() => progress.load());
</script>

<div class="blog-guide dream-guide">
	<a class="skip" href="#guide">Skip to the guide</a>
	<Wall />

	<StepTabs {progress} {tabs} />

	<header class="hero">
		<div class="shellline" aria-hidden="true">
			<div class="r1"><span class="f">╭─</span><span class="pth">~/repos/arunabhdas/githubrepos/<b>zerotounicorn</b></span><span class="br">main</span><span class="fill"></span><span class="f">─╮</span></div>
			<div class="r2"><span class="f">╰─❯</span><span><span class="typed">cat dream-setup-macos.md</span><span class="blk"></span></span></div>
		</div>
		<div>
			<h1><span>How to Setup</span><span>Dream SWE Dev</span><span>Environment</span><span>on macOS</span></h1>
			<p class="lede">Thirteen steps from a factory-fresh Mac to a terminal, editor, and agent setup you will want to live in. Every step is a command you can read first, run yourself, and stop after.</p>
			<p class="byline"><a class="start" href="#guide">Start the walk</a><span>By <a href="https://medium.com/@arunabhdas">Arunabh Das</a>, from the <em>Zero to Unicorn</em> series</span></p>
		</div>
	</header>

	<main class="window" id="guide">
		<div class="intro">
		<div>
			<h2>Where this path ends</h2>
			<p>Developers disagree about almost everything. But WezTerm, Neovim, NvChad, and Herdr together make the most painless and productive setup for an AI-native engineer since the advent of sliced bread. Here is what you will have by the last step.</p>
			<dl class="dest">
				<dt>terminal</dt><dd>WezTerm with the coolnight palette, a Nerd Font, and a little glass</dd>
				<dt>shell</dt><dd>Stock zsh, Powerlevel10k, autosuggestions, and syntax highlighting</dd>
				<dt>editor</dt><dd>Neovim with NvChad, plus VS Code, JetBrains, and Xcode when you need them</dd>
				<dt>agents</dt><dd>Herdr running Claude Code and friends across every project at once</dd>
				<dt>languages</dt><dd>One version manager per language, so <code>node</code> is never the wrong one</dd>
				<dt>secrets</dt><dd>GPG and git-crypt, plus SSH keys that stay on the Mac that made them</dd>
			</dl>
		</div>
		<div>
			<h2>Four rules for the walk</h2>
			<ol class="rules">
				<li><b>No bootstrap script.</b> Each step is something you choose to run. Read it, paste it, check it, move on.</li>
				<li><b>Pin major versions, allow minor drift.</b> A project's own version file always wins.</li>
				<li><b>One manager per language.</b> Homebrew does not get to own your runtimes, with Go as the one exception.</li>
				<li><b>Keys stay put.</b> SSH keys are generated fresh on each Mac. Tokens live encrypted or in a password manager, nowhere else.</li>
			</ol>
			<p>Everything assumes Apple Silicon, where Homebrew lives at <code>/opt/homebrew</code>. On an Intel Mac, swap that for <code>/usr/local</code>. Tick each step as you finish it. Your progress stays in this browser, and the tab bar keeps count.</p>
		</div>
		</div>

		<section class="leg" style="--leg:var(--cyan)">
			<h2>Lay the foundation</h2>
			<p>Three steps that everything else stands on.</p>
		</section>

		<Step n={1} slug="mac" leg="cyan" seg="foundation" title="Know your Mac, then lock it">
			<p>Before you install anything, find out what you are working with. The architecture decides where Homebrew lives and which native binaries you get later.</p>
			<CodeBlock id="mac-check" />
			<figure class="plate p-arch wide">
				<div class="fig">
					<svg viewBox="0 0 190 150" role="img" aria-label="A chip with traces leading to two install paths">
						<g stroke="#214969" stroke-width="2">
							<path d="M40 34H18M40 58H18M40 82H18M40 106H18M60 16V2M84 16V2M108 16V2M60 134v14M84 134v14M108 134v14"/>
						</g>
						<path d="M128 50h28l14-16h20" fill="none" stroke="#47FF9C" stroke-width="2"/>
						<path d="M128 92h28l14 16h20" fill="none" stroke="#214969" stroke-width="2"/>
						<rect x="40" y="16" width="88" height="118" rx="8" fill="#032745" stroke="#0FC5ED" stroke-width="2"/>
						<rect x="53" y="30" width="62" height="90" rx="3" fill="#011423" stroke="#214969"/>
						<path d="M60 40h22v14H60zM86 40h22v14H86zM60 58h48v8H60z" fill="#033259"/>
						<text x="84" y="94" text-anchor="middle" fill="#47FF9C" font-family="JetBrains Mono,monospace" font-size="14" font-weight="700">arm64</text>
					</svg>
					<div class="routes">
						<div class="route on"><code>arm64</code><span>Apple Silicon</span><code>/opt/homebrew</code></div>
						<div class="route"><code>x86_64</code><span>Intel</span><code>/usr/local</code></div>
					</div>
				</div>
				<figcaption>One line of output picks the path everything else builds on.</figcaption>
			</figure>
			<p>Then, before real secrets ever touch this machine:</p>
			<ul>
				<li>Install all updates from <b>System Settings, General, Software Update</b>.</li>
				<li>Sign in to your Apple Account so the App Store, iCloud Keychain, and Find My work.</li>
				<li>Turn on <b>FileVault</b> under <b>Privacy &amp; Security</b>, and save the recovery key in your password manager.</li>
			</ul>
		</Step>

		<Step n={2} slug="xcode" leg="cyan" seg="foundation" title="Install the Xcode Command Line Tools">
			<p>Homebrew, git, and nearly every native build need Apple's compiler toolchain. You do not need all of Xcode for this.</p>
			<CodeBlock id="clt-install" />
			<figure class="plate p-clt wide">
				<div class="fig">
					<div class="dialog" role="img" aria-label="macOS dialog asking to install the command line developer tools, with Cancel and Install buttons">
						<svg viewBox="0 0 46 46" aria-hidden="true"><rect x="1" y="1" width="44" height="44" rx="10" fill="#0a84ff"/><path d="M12 33 27 18M24 12l10 10-4 4-10-10zM15 36l-5-5" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/></svg>
						<b>The "xcode-select" command requires the command line developer tools.</b>
						Would you like to install the tools now?
						<div class="btns"><span>Cancel</span><span class="go">Install</span></div>
					</div>
					<div class="gains">
						<p>Once the download finishes, you have:</p>
						<code>clang</code><code>make</code><code>git</code>
					</div>
				</div>
				<figcaption>Click Install, then Agree, and let it finish before you move on.</figcaption>
			</figure>
			<CodeBlock id="clt-check" />
			<p class="note ok"><b>You should see</b> <code>/Library/Developer/CommandLineTools</code> from the first command, and version banners from the other two.</p>
		</Step>

		<Step n={3} slug="brew" leg="cyan" seg="foundation" title="Install Homebrew, exactly once">
			<p>Almost everything from here on comes through Homebrew. Check first, because it may already be there.</p>
			<CodeBlock id="brew-install" />
			<p>The installer asks for your password and takes a few minutes. It ends by printing two lines. Here is the one trap in this step.</p>
			<figure class="plate">
				<div class="win dup">
					<div class="bar"><b>~/.zprofile</b></div>
					<div class="body" role="img" aria-label="A .zprofile with the brew shellenv line repeated twenty times, crossed out, and one correct line below it">
						<span class="ln">eval "$(/opt/homebrew/bin/brew shellenv)"</span>
						<span class="ln">eval "$(/opt/homebrew/bin/brew shellenv)"</span>
						<span class="ln">eval "$(/opt/homebrew/bin/brew shellenv)"</span>
						<span class="ln">eval "$(/opt/homebrew/bin/brew shellenv)"</span>
						<span class="ln">eval "$(/opt/homebrew/bin/brew shellenv)"</span>
						<span class="times">...twenty copies on a real machine, one per re-run</span>
						<span class="good">eval "$(/opt/homebrew/bin/brew shellenv)"</span>
					</div>
				</div>
				<figcaption>Appending that line every time you run the installer quietly slows every new shell. One copy is all you need.</figcaption>
			</figure>
			<p>So add the line only if it is not already there:</p>
			<CodeBlock id="brew-shellenv" />
			<p class="note ok"><b>You should see</b> <code>/opt/homebrew/bin/brew</code>. Read what <code>brew doctor</code> reports, though most of its warnings about unrelated tools are safe to ignore.</p>
		</Step>

		<section class="leg" style="--leg:var(--green)">
			<h2>Build the terminal</h2>
			<p>This is the room you will spend your days in, so it gets the most care.</p>
		</section>

		<Step n={4} slug="wezterm" leg="green" seg="terminal" title="Give the terminal a proper home">
			<p>WezTerm is GPU-accelerated, configured in Lua, and pleasantly boring to keep running. Install it with the Nerd Font that the prompt and NvChad both rely on for their icons.</p>
			<CodeBlock id="wezterm-install" />
			<figure class="plate p-wez wide">
				<div class="fig">
					<div class="wezshot" role="img" aria-label="A translucent WezTerm window floating over a foggy night forest, with its padding outlined">
						<div class="wezglass">
							<div class="bar"><b>1: zsh ×</b></div>
							<div class="wezpad"><div class="inner"><span class="d">╭─</span> <span class="c">~/repos/<b>dream</b></span> <span class="g">main</span> <span class="d">··················</span><br><span class="g">╰─❯</span> <span class="w">nvim .</span><span class="g">█</span></div></div>
						</div>
					</div>
					<ul class="wezkeys">
						<li><code>window_background_opacity = 0.8</code>Enough glass to see the forest.</li>
						<li><code>macos_window_background_blur = 10</code>Enough blur to read your code.</li>
						<li><code>window_padding</code>The dashed gap. Text stops crowding the edge, and the edge is easier to grab.</li>
						<li><code>RESIZE | MACOS_FORCE_ENABLE_SHADOW</code>No titlebar, but the native resize border stays.</li>
					</ul>
				</div>
				<div class="swatches" role="img" aria-label="The eight coolnight ANSI colors">
					<div class="lt" style="background:#214969">#214969</div><div style="background:#E52E2E">#E52E2E</div><div style="background:#44FFB1">#44FFB1</div><div style="background:#FFE073">#FFE073</div><div style="background:#0FC5ED">#0FC5ED</div><div style="background:#A277FF">#A277FF</div><div style="background:#24EAF7">#24EAF7</div><div style="background:#CBE0F0">#CBE0F0</div>
				</div>
				<figcaption>This whole page is set in those colors, and the panel you are reading sits at the same 0.8 opacity and blur 10. The wallpaper is your call, though a foggy forest is hard to beat.</figcaption>
			</figure>
			<p class="side-note"><b>Pick the right font name.</b> NvChad warns against Nerd Font variants that end in "Mono" because their icons render small. Use <code>JetBrainsMono Nerd Font</code>, not <code>JetBrainsMono Nerd Font Mono</code>.</p>
			<p>WezTerm reads <code>~/.wezterm.lua</code> and reloads it the moment you save.</p>
			<CodeBlock id="wezterm-config" />
			<p>Open WezTerm from Applications and do the rest of this guide inside it. Then check that it can see the font:</p>
			<CodeBlock id="wezterm-font-check" />
		</Step>

		<Step n={5} slug="zsh" leg="green" seg="terminal" title="Make the shell feel like yours">
			<p>No Oh My Zsh and no framework. Stock zsh plus three Homebrew packages gets you everything you will notice.</p>
			<CodeBlock id="zsh-plugins" />
			<p>If this is not a fresh Mac, move your old file aside first. Then write the new one. The language manager lines stay quiet until step 9 installs those tools, so you only do this once.</p>
			<CodeBlock id="zshrc" />
			<p>The Powerlevel10k wizard starts on its own the first time. These answers give you the prompt in the picture below, and you can rerun it any time with <code>p10k configure</code>.</p>
			<ul>
				<li>Style <b>Lean</b>, character set <b>Unicode</b>, height <b>Two lines</b></li>
				<li>Connection <b>Dotted</b>, frame <b>Full</b>, ornaments <b>Lightest</b></li>
				<li>Spacing <b>Sparse</b>, icons <b>Few</b>, flow <b>Concise</b>, instant prompt <b>Off</b></li>
			</ul>
			<figure class="plate wide">
				<div class="win anat">
					<div class="bar"><b>1: zsh ×</b></div>
					<div class="body" role="img" aria-label="A two-line prompt showing the directory, git branch, a dotted filler, and a greyed-out autosuggestion">
						<div class="row"><span class="d">╭─</span><span class="c">~/repos/arunabhdas/githubrepos/<b>zerotounicorn</b></span><span class="g">main</span><span class="fill"></span><span class="y">27s</span><span class="d">─╮</span></div>
						<div class="row"><span class="g">╰─❯</span><span><span class="g">git</span> <span class="w">commit</span> <span class="ghost">-m "Add coolnight palette"</span></span></div>
					</div>
				</div>
				<ul class="legend">
					<li><b class="c">the path</b>Where you are, with the last folder in bold.</li>
					<li><b class="g">the branch</b>Git status at a glance, without typing it.</li>
					<li><b class="y">the timer</b>Shown only when the last command took a while.</li>
					<li><b class="d">the grey text</b>Autosuggestion from your history. Press <kbd>→</kbd> to take it.</li>
				</ul>
			</figure>
		</Step>

		<Step n={6} slug="ssh" leg="green" seg="terminal" title="Give this Mac its own keys">
			<p>Generate a fresh key for every machine instead of copying an old one around. If a laptop goes missing, you revoke one key and nothing else changes.</p>
			<figure class="plate p-ssh wide">
				<div class="fig">
					<div class="keybox priv">
						<svg viewBox="0 0 68 40" aria-hidden="true"><circle cx="17" cy="20" r="13" fill="none" stroke="#FFE073" stroke-width="4"/><circle cx="17" cy="20" r="4" fill="#FFE073"/><path d="M30 20h34M52 20v11M62 20v8" stroke="#FFE073" stroke-width="4" fill="none"/></svg>
						<b>Private key</b>Stays here, with its passphrase in your Keychain.<br><code>~/.ssh/id_ed25519</code>
					</div>
					<div class="flow"><svg viewBox="0 0 80 16" aria-hidden="true"><path d="M0 8h72M64 1l8 7-8 7" fill="none" stroke="#47FF9C" stroke-width="2"/></svg><span>public half only</span></div>
					<div class="keybox">
						<b>Public key</b>Safe to share, so paste it anywhere you push code.<br><code>~/.ssh/id_ed25519.pub</code>
						<div class="hosts"><span>github.com</span><span>bitbucket.org</span><span>gitlab.com</span></div>
					</div>
				</div>
				<figcaption>Only the public half ever leaves this Mac. Private keys stay out of every repo, even encrypted ones.</figcaption>
			</figure>
			<CodeBlock id="ssh-key" />
			<p>Your public key is now on the clipboard. Paste it into <b>GitHub, Settings, SSH and GPG keys, New SSH key</b>, and do the same on any other host you use. Then test it:</p>
			<CodeBlock id="ssh-test" />
			<p class="note ok"><b>You should see</b> a greeting with your username. GitHub adds that it does not provide shell access, which is normal.</p>
			<p>While you are here, introduce yourself to git with some sensible defaults.</p>
			<CodeBlock id="git-config" />
		</Step>

		<section class="leg" style="--leg:var(--purple)">
			<h2>Bring in the editor and the agents</h2>
			<p>Neovim is where you write. Herdr is where you direct everything that writes alongside you.</p>
		</section>

		<Step n={7} slug="nvim" leg="purple" seg="editor" title="Install Neovim and NvChad">
			<p>Start with the systems hacker package set. None of these are random dependencies.</p>
			<CodeBlock id="nvim-packages" />
			<table class="need">
				<thead><tr><th>Package</th><th>Why it is here</th></tr></thead>
				<tbody>
					<tr><td><code>neovim</code></td><td>NvChad needs version 0.11 or later</td></tr>
					<tr><td><code>tree-sitter-cli</code></td><td>Required to build syntax parsers</td></tr>
					<tr><td><code>ripgrep</code></td><td>Powers project-wide search in Telescope</td></tr>
					<tr><td><code>git-lfs</code></td><td>Handles the large binary files some repos carry</td></tr>
					<tr><td><code>llvm</code></td><td>A current toolchain for native builds, beyond Apple's <code>clang</code></td></tr>
				</tbody>
			</table>
			<CodeBlock id="nvim-check" />
			<p class="note"><b>Watch out:</b> Homebrew keeps <code>llvm</code> off your <code>PATH</code> on purpose so it cannot shadow Apple's compiler. A bare <code>llvm-config</code> will say "command not found", and plain <code>clang</code> still means Apple's. That is why the check above spells out the full path.</p>
			<p>NvChad wants a clean slate. Move any old Neovim config and data out of the way, then clone the starter.</p>
			<CodeBlock id="nvchad-clone" />
			<p>Let lazy.nvim finish downloading plugins. Then, inside Neovim, run these one at a time:</p>
			<CodeBlock id="nvchad-commands" />
			<p>Open <code>nvim</code> once more and run <code>:MasonUpdate</code> to refresh the package registry. Then detach the config from the starter repo so it is yours to change:</p>
			<CodeBlock id="nvchad-detach" />
			<figure class="plate wide">
				<div class="nv" role="img" aria-label="An NvChad session with a file tree, Go code, a Telescope search popup, and a green status line">
					<div class="top"><span class="on">main.go</span><span>routes.go</span><span>go.mod</span></div>
					<div class="main">
						<div class="tree"><span class="dir">dream-api/</span><br>&nbsp;<span class="dir">cmd/</span><br>&nbsp;<span class="dir">internal/</span><br><span class="cur">&nbsp;main.go</span>&nbsp;routes.go<br>&nbsp;go.mod<br>&nbsp;go.sum<br>&nbsp;README.md</div>
<pre><span class="ln">1</span><span class="kw">package</span> main
<span class="ln">2</span>
<span class="ln">3</span><span class="kw">import</span> (
<span class="ln">4</span>    <span class="st">"log"</span>
<span class="ln">5</span>    <span class="st">"net/http"</span>
<span class="ln">6</span>)
<span class="ln">7</span>
<span class="ln">8</span><span class="cm">// main starts the API on :8080.</span>
<span class="ln">9</span><span class="kw">func</span> <span class="fn">main</span>() {'{'}
<span class="ln">10</span>    mux := http.<span class="fn">NewServeMux</span>()
<span class="ln">11</span>    <span class="fn">registerRoutes</span>(mux)
<span class="ln">12</span>    log.<span class="fn">Fatal</span>(http.<span class="fn">ListenAndServe</span>(<span class="st">":8080"</span>, mux))
<span class="ln">13</span>{'}'}</pre>
					</div>
					<div class="tele">
						<div class="q">Live Grep</div>
						<div class="in">❯ registerRoutes</div>
						<div class="res"><span class="hit">main.go:11</span><span>routes.go:7</span><span>routes_test.go:19</span></div>
					</div>
					<div class="status"><span class="mode">NORMAL</span><span>main.go</span><span class="sp"></span><span class="pill">dream-api</span><span class="pos">11/13</span></div>
					<div class="cmd">:MasonUpdate</div>
				</div>
				<figcaption>Where you end up. <kbd>Space</kbd> <kbd>f</kbd> <kbd>w</kbd> opens ripgrep through Telescope, and <kbd>Ctrl</kbd> <kbd>n</kbd> toggles the file tree.</figcaption>
			</figure>
		</Step>

		<Step n={8} slug="herdr" leg="purple" seg="agents" title="Run a herd of agents with Herdr">
			<p>Herdr is a terminal multiplexer built for AI coding agents. Think tmux with a sidebar that tells you which agent is working, which one is stuck waiting for you, and which one has finished. Sessions keep running when you close the window.</p>
			<CodeBlock id="herdr-install" />
			<p class="side-note"><b>Any agent works.</b> Herdr detects <code>claude</code>, <code>codex</code>, <code>opencode</code>, and others on its own when you start them in a pane.</p>
			<p>Open a new terminal window so <code>claude</code> lands on your <code>PATH</code>, then check both tools and connect them. The integration adds native session restore for Claude.</p>
			<CodeBlock id="herdr-connect" />
			<p>Now go to a project, run <code>herdr</code>, and start an agent in a pane.</p>
			<figure class="plate wide">
				<div class="hd" role="img" aria-label="Herdr with a sidebar of workspaces and agent states next to three panes">
					<div class="side">
						<div class="ws"><b>dream-api</b><span class="ag working"><i></i>claude working</span><span class="ag idle"><i></i>zsh idle</span></div>
						<div class="ws"><b>ios-app</b><span class="ag blocked"><i></i>claude blocked</span></div>
						<div class="ws"><b>docs</b><span class="ag done"><i></i>codex done</span></div>
					</div>
					<div class="panes">
						<div class="pane"><span class="g">●</span> <span class="w">claude</span><br><span class="d">Reading routes.go</span><br><span class="d">Adding a health check</span><br><span class="c">Edit</span> internal/health.go<br><span class="g">+ func Health(w, r)</span><br><span class="c">Bash</span> go test ./...<br><span class="g">ok</span> <span class="d">dream-api/internal</span><br><span class="d">Working</span><span class="g">█</span></div>
						<div class="pane"><span class="g">╰─❯</span> <span class="w">nvim .</span><br><span class="d">main.go  routes.go</span></div>
						<div class="pane"><span class="g">╰─❯</span> <span class="w">go run ./cmd/api</span><br><span class="d">listening on :8080</span></div>
					</div>
				</div>
				<figcaption>An illustration of the layout. The sidebar is the point: one glance shows that ios-app needs you and the other two do not.</figcaption>
			</figure>
			<p>The prefix is <kbd>Ctrl</kbd> <kbd>b</kbd>, the same as tmux. Press it, then one of these.</p>
			<ul class="keys">
				<li><kbd>v</kbd> Split right</li>
				<li><kbd>-</kbd> Split down</li>
				<li><kbd>c</kbd> New tab</li>
				<li><kbd>n</kbd> / <kbd>p</kbd> Next or previous tab</li>
				<li><kbd>w</kbd> Move between workspaces</li>
				<li><kbd>Shift</kbd> <kbd>n</kbd> New workspace</li>
				<li><kbd>q</kbd> Detach, agents keep running</li>
				<li><kbd>?</kbd> Show every binding</li>
			</ul>
			<p>Run <code>herdr</code> again to reattach. <code>herdr server stop</code> ends the session and stops its panes. The mouse works too: click to focus, drag borders to resize, right-click to split.</p>
		</Step>

		<section class="leg" style="--leg:var(--yellow)">
			<h2>Finish the machine</h2>
			<p>The last stretch: languages, heavier IDEs, system settings, secrets, and apps.</p>
		</section>

		<Step n={9} slug="langs" leg="yellow" seg="languages" title="One manager per language">
			<p>Install runtimes through Homebrew and you eventually get the classic "wrong version on PATH" afternoon. Each language gets its own manager here, so each project can pin what it needs.</p>
			<figure class="plate wide">
				<div class="scroll">
				<table class="shelf">
					<thead><tr><th>Language</th><th>Manager</th><th>Pin</th><th>Project file</th></tr></thead>
					<tbody>
						<tr><td>Node.js</td><td>fnm</td><td>latest LTS</td><td><code>.nvmrc</code></td></tr>
						<tr><td>Python</td><td>pyenv + pipx</td><td>3.12</td><td><code>.python-version</code></td></tr>
						<tr><td>Ruby</td><td>chruby + ruby-install</td><td>3.4</td><td><code>.ruby-version</code></td></tr>
						<tr><td>Java and Kotlin</td><td>SDKMAN</td><td>21 LTS</td><td><code>.sdkmanrc</code></td></tr>
						<tr><td>Rust</td><td>rustup</td><td>stable</td><td><code>rust-toolchain.toml</code></td></tr>
						<tr><td>Go</td><td>Homebrew</td><td>latest</td><td><code>go.mod</code></td></tr>
						<tr><td>Dart and Flutter</td><td>Flutter SDK</td><td>stable</td><td><code>pubspec.yaml</code></td></tr>
					</tbody>
				</table>
				</div>
				<figcaption>Go is the only language Homebrew manages here. Its toolchain updates cleanly in place. These pins are starting points, so swap in whatever your projects target.</figcaption>
			</figure>
			<p>Install only what you use. The <code>~/.zshrc</code> from step 5 already knows about all of them.</p>
			<h4>Node.js</h4>
			<CodeBlock id="node" />
			<h4>Python</h4>
			<CodeBlock id="python" />
			<p class="note"><b>Why the long list?</b> pyenv compiles Python from source, and those libraries are what give you working <code>ssl</code>, <code>sqlite3</code>, and <code>tkinter</code> modules.</p>
			<h4>Ruby</h4>
			<CodeBlock id="ruby" />
			<p class="note ok"><b>You should see</b> a path under <code>~/.rubies</code>, not <code>/usr/bin/ruby</code>. That older system Ruby belongs to Apple, so leave it alone.</p>
			<h4>Java, Kotlin, Gradle, and Maven</h4>
			<CodeBlock id="java" />
			<h4>Rust and Go</h4>
			<CodeBlock id="rust-go" />
			<h4>Dart and Flutter</h4>
			<p>Skip standalone Dart, since Flutter ships a matching SDK. <code>flutter doctor</code> walks you through whatever is still missing.</p>
			<CodeBlock id="flutter" />
		</Step>

		<Step n={10} slug="ides" leg="yellow" seg="ides" title="Add the heavyweight IDEs">
			<p>Neovim handles most days. These handle the rest. Install only the ones your work calls for.</p>
			<h4>Visual Studio Code</h4>
			<CodeBlock id="vscode-install" />
			<p>In VS Code, open the Command Palette with <kbd>Cmd</kbd> <kbd>Shift</kbd> <kbd>P</kbd> and run <b>Shell Command: Install 'code' command in PATH</b>. Then either sign in to the built-in Settings Sync, or move your extensions by hand:</p>
			<CodeBlock id="vscode-extensions" />
			<p>A few settings worth keeping everywhere:</p>
			<CodeBlock id="vscode-settings" />
			<h4>JetBrains</h4>
			<p>Install the Toolbox, then let it manage IntelliJ IDEA, Android Studio, and the rest. JetBrains keeps settings in its in-app Settings Sync, so there are no dotfiles to carry.</p>
			<CodeBlock id="jetbrains" />
			<h4>Xcode</h4>
			<p>For iOS, macOS, or Swift work, install Xcode from the Mac App Store, then:</p>
			<CodeBlock id="xcode" />
		</Step>

		<Step n={11} slug="defaults" leg="yellow" seg="macos" title="Tune macOS for typing code">
			<p>Stock macOS is set up for typing letters. Hold <kbd>j</kbd> in Neovim and you will feel the difference at once. Try it here, at the real speeds.</p>
			<figure class="plate wide">
				<KeyRepeatDemo />
				<figcaption>Over one second that works out to 8 characters against 27. Values count in 15 ms ticks, so <code>InitialKeyRepeat 15</code> is 225 ms and <code>KeyRepeat 2</code> is 30 ms.</figcaption>
			</figure>
			<p>This only changes settings that affect how you work. Dock size, wallpaper, dark mode, and trackpad speed are yours to set by hand. Read it first and delete any line you disagree with.</p>
			<CodeBlock id="macos-defaults" />
			<p>Log out and back in for the key repeat to take effect. Everything here is safe to run again, and any setting comes back with <code>defaults delete</code>, for example <code>defaults delete NSGlobalDomain KeyRepeat</code>.</p>
			<p class="note"><b>Safari is deliberately missing.</b> Modern macOS protects Safari's preferences, so scripted writes tend to fail. Turn it on by hand instead: <b>Safari, Settings, Advanced, Show features for web developers</b>.</p>
		</Step>

		<Step n={12} slug="secrets" leg="yellow" seg="secrets" title="Put your dotfiles and secrets under lock">
			<p>Your config is now worth keeping. Put it in a private repo, and let git-crypt encrypt the few files that hold real tokens, so the next Mac takes minutes instead of a weekend.</p>
			<figure class="plate p-sec wide">
				<div class="fig">
					<div class="vault"><b>Your working tree</b>Plain text. Your editor and tools read it normally.<div class="bytes plain">//registry...:_authToken=abc</div></div>
					<div class="step-ar"><svg viewBox="0 0 50 14" aria-hidden="true"><path d="M0 7h44M38 1l6 6-6 6" fill="none" stroke="#A277FF" stroke-width="2"/></svg><span>git push</span></div>
					<div class="vault locked"><b>The remote</b>Ciphertext only. A leak of the repo leaks nothing useful.<div class="bytes">.GITCRYPT.8f3ac91d07e2b54f</div></div>
					<div class="step-ar"><svg viewBox="0 0 50 14" aria-hidden="true"><path d="M0 7h44M38 1l6 6-6 6" fill="none" stroke="#47FF9C" stroke-width="2"/></svg><span>git-crypt unlock</span></div>
					<div class="vault"><b>Your next Mac</b>Your GPG key turns it back into plain text.<div class="bytes plain">//registry...:_authToken=abc</div></div>
				</div>
				<figcaption>Encryption happens inside git, on the way in and out. You keep working with normal files.</figcaption>
			</figure>
			<p>First, make a GPG key. Pick ECC or RSA 4096, and use the same email as your git commits.</p>
			<CodeBlock id="gpg-key" />
			<p>The long ID follows the slash on the <code>sec</code> line. Create an empty <b>private</b> repo on your git host, then set up the local copy. The <code>.gitattributes</code> rule must be committed before any secret goes in.</p>
			<CodeBlock id="dotfiles-repo" />
			<p class="note bad"><b>Stop and check:</b> every file under <code>secrets/</code> must say <code>encrypted</code> before you commit. Plain text that reaches git history stays there, and the only fix is to rotate the token and rewrite history.</p>
			<CodeBlock id="dotfiles-push" />
			<p>Back up the private GPG key to your password manager. Without it, nothing unlocks.</p>
			<CodeBlock id="gpg-backup" />
			<h4>On your next Mac</h4>
			<CodeBlock id="next-mac" />
			<p class="side-note"><b>Bring or regenerate?</b> If a token is easy to mint again, mint a fresh one. The encrypted folder is for things that are painful to recreate, not for everything.</p>
		</Step>

		<Step n={13} slug="apps" leg="yellow" seg="apps" title="Install the apps, in the right order">
			<p>The order is the trick. Each group makes the next one easier: a browser so you can sign in, then a password manager so the sign-ins are painless, and only then the rest.</p>
			<figure class="plate wide">
				<div class="dock" role="img" aria-label="A Dock with five numbered groups in install order">
					<div><svg viewBox="0 0 58 58" aria-hidden="true"><rect width="58" height="58" rx="13" fill="#0FC5ED"/><circle cx="29" cy="29" r="16" fill="none" stroke="#011423" stroke-width="3"/><path d="M13 29h32M29 13c-11 10-11 22 0 32M29 13c11 10 11 22 0 32" fill="none" stroke="#011423" stroke-width="2.5"/></svg><small>1</small>Browsers</div>
					<div><svg viewBox="0 0 58 58" aria-hidden="true"><rect width="58" height="58" rx="13" fill="#FFE073"/><circle cx="21" cy="29" r="9" fill="none" stroke="#011423" stroke-width="4"/><path d="M30 29h18M41 29v8M47 29v5" stroke="#011423" stroke-width="4" fill="none"/></svg><small>2</small>Passwords</div>
					<div><svg viewBox="0 0 58 58" aria-hidden="true"><rect width="58" height="58" rx="13" fill="#47FF9C"/><path d="M14 19l10 10-10 10" fill="none" stroke="#011423" stroke-width="4"/><path d="M29 41h15" stroke="#011423" stroke-width="4"/></svg><small>3</small>Containers</div>
					<div><svg viewBox="0 0 58 58" aria-hidden="true"><rect width="58" height="58" rx="13" fill="#A277FF"/><ellipse cx="29" cy="17" rx="15" ry="6" fill="none" stroke="#011423" stroke-width="3.5"/><path d="M14 17v24c0 8 30 8 30 0V17M14 29c0 8 30 8 30 0" fill="none" stroke="#011423" stroke-width="3.5"/></svg><small>4</small>Databases</div>
					<div><svg viewBox="0 0 58 58" aria-hidden="true"><rect width="58" height="58" rx="13" fill="#CBE0F0"/><circle cx="16" cy="29" r="5" fill="#011423"/><circle cx="42" cy="16" r="5" fill="#011423"/><circle cx="42" cy="42" r="5" fill="#011423"/><path d="M16 29 42 16M16 29l26 13" stroke="#011423" stroke-width="3"/></svg><small>5</small>Networking</div>
				</div>
			</figure>
			<CodeBlock id="apps" />
			<p>Leave yourself time for the apps that need a paid sign-in or a manual step, such as Adobe Creative Cloud, Microsoft 365, and your JetBrains account. Keep this list honest, too. If you have not opened an app in a year, it does not get a place on the new machine.</p>
		</Step>

		<section class="leg" style="--leg:var(--cursor)" id="check">
			<h2>Check the whole trail</h2>
			<p>Paste this into a fresh WezTerm window. Green ticks only, please.</p>
		</section>
		<div class="col" style="margin-top:1em">
			<CodeBlock id="health-check" />
			<p>To keep it all fresh, run this every week or two. Inside Neovim, <code>:Lazy sync</code> and <code>:MasonUpdate</code> do the same job for your plugins.</p>
			<CodeBlock id="weekly-update" />
			<p>And whenever you add something you love, refresh your inventory so the next Mac gets it too:</p>
			<CodeBlock id="inventory" />
		</div>
	</main>

	<section class="clearing" aria-labelledby="end">
		<div>
			<h2 id="end">You made it out of the woods</h2>
			<p class="say">It is morning, your terminal looks like a dream, and every tool answers on the first try. Go build the unicorn.</p>
		</div>
		<img class="unicorn" src={unicorn} width="697" height="641" alt="An engraved unicorn standing in the clearing at dawn">
	</section>
	<footer>
		<p>Adapted from <a href="https://arunabhdas.medium.com/how-to-go-from-zero-to-unicorn-part-4-how-to-1337-ai-native-engineer-setup-e948793953d4">How to Setup a Unicorn AI-native Engineer Environment</a>, Part 4 of <em>How to go from Zero to Unicorn</em>, by <a href="https://medium.com/@arunabhdas">Arunabh Das</a>. More on <a href="https://github.com/arunabhdas">GitHub</a>.</p>
		<p>Package names checked against Homebrew in November 2026. No em-dashes were harmed in the making of this guide.</p>
		<p><button class="reset" type="button" onclick={() => progress.reset()}>Clear my progress</button></p>
	</footer>
</div>
