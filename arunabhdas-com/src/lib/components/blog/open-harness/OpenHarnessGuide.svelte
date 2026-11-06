<script lang="ts">
	/**
	 * How to Build an Open Harness for Agentic Engineering
	 * The third guide in the WezTerm window, set on a night climb: a harness, a rope,
	 * and an anchor at every pitch. Code blocks are generated from a package that was
	 * typechecked, tested, and installed into real Pi.
	 */
	import { onMount, setContext } from 'svelte';
	import CodeBlock from '../guide/CodeBlock.svelte';
	import Step from '../guide/Step.svelte';
	import StepTabs from '../guide/StepTabs.svelte';
	import Wall from '../guide/Wall.svelte';
	import { GUIDE_KEY, GuideProgress } from '../guide/progress.svelte';
	import HashlineDemo from './HashlineDemo.svelte';
	import PolicyDemo from './PolicyDemo.svelte';
	import blocks from './code-blocks.json';
	import '../guide/guide-base.css';
	import './harness.css';
	import '../guide/guide-end.css';

	const tabs = [
		'pi',
		'ohmypi',
		'package',
		'policy',
		'guard',
		'hashline',
		'rules',
		'plan',
		'workers',
		'gates',
		'ledger',
		'install',
		'skill',
		'cli',
		'proof'
	];

	const progress = new GuideProgress('open-harness:done');
	setContext(GUIDE_KEY, { progress, blocks, path: '~/openharness' });

	onMount(() => progress.load());
</script>

<div class="blog-guide open-harness">
	<a class="skip" href="#guide">Skip to the guide</a>
	<Wall />

	<StepTabs {progress} {tabs} />

	<header class="hero">
		<div class="shellline" aria-hidden="true">
			<div class="r1"><span class="f">╭─</span><span class="pth">~/repos/arunabhdas/<b>openharness</b></span><span class="br">main</span><span class="fill"></span><span class="f">─╮</span></div>
			<div class="r2"><span class="f">╰─❯</span><span><span class="typed">openharness init && pi</span><span class="blk"></span></span></div>
		</div>
		<div>
			<h1><span>How to Build</span><span>an Open Harness</span><span>for Agentic</span><span>Engineering</span></h1>
			<p class="lede">Fifteen steps from a stock Pi install to OpenHarness, a package that won't let an agent call a task done until the checks pass and a second agent signs off. The best ideas come from OhMyPi, rebuilt as small extensions you can read in an afternoon.</p>
			<p class="byline"><a class="start" href="#guide">Start climbing</a><span>By <a href="https://medium.com/@arunabhdas">Arunabh Das</a></span></p>
		</div>
	</header>

	<main class="window" id="guide">
		<div class="intro">
			<div>
				<h2>A model is not an engineer</h2>
				<p>Give a capable model a shell and it will write code. It will also say "done" with a failing test, edit a file that moved, and touch things nobody asked it to touch. Engineering is the part around the typing: a plan, a check, a second pair of eyes, and a record of what happened.</p>
				<p>That part is the harness. A climber's harness doesn't climb for you. It ties you to anchors, so a slip costs a few feet and not the whole route. The model does the climbing, and the harness decides how far it can fall.</p>
				<p class="creed">Trust the rope, not the climber.</p>
				<dl class="dest">
					<dt>guard</dt><dd>Read, write, and exec tiers, with paths and commands that are never allowed</dd>
					<dt>edits</dt><dd>Hash-anchored edits that refuse to land on a file that moved</dd>
					<dt>rules</dt><dd>Stream rules that stop the model mid-sentence and retry</dd>
					<dt>plan</dt><dd>A read-only phase that ends with a typed plan for you to approve</dd>
					<dt>workers</dt><dd>Parallel subagents in their own git worktrees, returning typed reports</dd>
					<dt>gates</dt><dd>Verify, then review, against checks the model cannot rewrite</dd>
					<dt>ledger</dt><dd>A record of every run, and an exit code your CI can trust</dd>
				</dl>
			</div>
			<div>
				<h2>Four rules for the climb</h2>
				<ol class="rules">
					<li><b>Build on Pi, don't fork it.</b> A package upgrades with a version bump. A fork upgrades with a merge.</li>
					<li><b>Take ideas, give credit.</b> OhMyPi solved these problems first. This guide reimplements its ideas in small files, and copies none of its code.</li>
					<li><b>Fail closed.</b> A broken policy file, a missing reviewer, or a gate that can't run is a failure, never a pass.</li>
					<li><b>Test the harness without a model.</b> Pi can script one, so every gate gets a repeatable test that costs nothing.</li>
				</ol>
				<p>You need Node 22.19 or later, git, and a model for Pi to talk to: a subscription, an API key, or a local server. Tick each step as you finish it. Your progress stays in this browser.</p>
				<p>Prefer to read the finished thing first? <a href="/blog/downloads/openharness.zip">Download the whole package</a> (<code>openharness.zip</code>), tests included.</p>
				<div class="note">
					<p><b>Credit where it's due.</b> <a href="https://github.com/earendil-works/pi">Pi</a> is Mario Zechner's minimal agent harness. <a href="https://github.com/can1357/oh-my-pi">OhMyPi</a> is a fork of Pi from Stencil Labs. Both are MIT licensed, and this guide would not exist without them.</p>
				</div>
			</div>
		</div>

		<figure class="plate route-map">
			<div class="scroll">
				<svg viewBox="0 0 900 270" role="img" aria-label="The route of a task through OpenHarness. A task goes through plan and build, then the verify gate and the review gate, then done. Either gate can send the work back to build. The guard, anchored edits, and stream rules watch every step of build, and the ledger records everything.">
					<g fill="none" stroke-linecap="round">
						<path d="M40 120H860" stroke="#47FF9C" stroke-width="4"/>
						<path d="M520 104C520 40 330 40 330 104" stroke="#FFE073" stroke-width="3" stroke-dasharray="7 7"/>
						<path d="M680 104C680 6 330 6 330 104" stroke="#FFE073" stroke-width="3" stroke-dasharray="7 7"/>
						<path d="M60 236H840" stroke="#214969" stroke-width="3"/>
					</g>
					<path d="M322 92l8 14 8-14" fill="none" stroke="#FFE073" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
					<g fill="#011423" stroke-width="3">
						<circle cx="60" cy="120" r="9" stroke="#47FF9C"/>
						<circle cx="190" cy="120" r="9" stroke="#47FF9C"/>
						<circle cx="330" cy="120" r="9" stroke="#47FF9C"/>
						<circle cx="520" cy="120" r="11" stroke="#FFE073"/>
						<circle cx="680" cy="120" r="11" stroke="#FFE073"/>
						<circle cx="840" cy="120" r="9" stroke="#47FF9C"/>
					</g>
					<g font-family="JetBrains Mono,ui-monospace,monospace" font-size="15" text-anchor="middle" fill="#EAF6FF">
						<text x="60" y="154">task</text>
						<text x="190" y="154">plan</text>
						<text x="330" y="154">build</text>
						<text x="520" y="154">verify</text>
						<text x="680" y="154">review</text>
						<text x="840" y="154">done</text>
					</g>
					<g font-family="JetBrains Mono,ui-monospace,monospace" font-size="13" text-anchor="middle" fill="#8FB3CB">
						<text x="330" y="178">guard, anchors,</text>
						<text x="330" y="196">stream rules</text>
						<text x="190" y="178">read-only</text>
						<text x="520" y="178">your checks</text>
						<text x="680" y="178">a second agent</text>
						<text x="450" y="260">every step is written to the ledger</text>
					</g>
					<text x="505" y="18" font-family="JetBrains Mono,ui-monospace,monospace" font-size="13" text-anchor="middle" fill="#FFE073">not done yet</text>
				</svg>
			</div>
			<figcaption>The whole harness as a route. There is one way to finish, and it passes through both anchors.</figcaption>
		</figure>

		<section class="leg" style="--leg:var(--cyan)">
			<h2>Base camp</h2>
			<p>Learn the ground, then set up the package everything else hangs from.</p>
		</section>

		<Step n={1} slug="pi" leg="cyan" seg="base-camp" title="Install Pi and meet the core">
			<p>Pi is deliberately small. It gives a model four tools (<code>read</code>, <code>bash</code>, <code>edit</code>, and <code>write</code>), a session log, and a loop. Its README says it skips features like sub-agents and plan mode, and invites you to build them. That invitation is why it makes a good foundation.</p>
			<CodeBlock id="install-pi" />
			<CodeBlock id="install-pi-out" />
			<CodeBlock id="first-run" />
			<p>Everything in this guide uses four of Pi's seams: <strong>extensions</strong> that hook its events, <strong>tools</strong> a model can call, <strong>packages</strong> that install them as one unit, and an <strong>SDK</strong> that runs a session inside your own process.</p>
			<div class="note bad">
				<p><b>Pi has no permission system.</b> Its docs are plain about this: tools run with your account's permissions, and safety comes from limiting what that account can reach. Step 5 adds a guard, but a guard is a seatbelt. For anything unattended, also run inside a container.</p>
			</div>
		</Step>

		<Step n={2} slug="ohmypi" leg="cyan" seg="base-camp" title="Read OhMyPi as a map">
			<p>OhMyPi started as a fork of Pi and grew into a batteries-included agent, with a Rust core, an LSP, a debugger, and a browser. Install it and use it for a day. Its installer is a shell script, so read it first.</p>
			<CodeBlock id="install-omp" />
			<CodeBlock id="install-omp-out" />
			<p>Its argument is one worth taking seriously: the harness matters as much as the model. Its README reports one model going from 6.7% to 68.3% on an edit benchmark just by changing the edit format. That's their number, and <a href="https://blog.can.ac/2026/02/12/the-harness-problem/">their write-up</a> is worth your time.</p>
			<p>You could fork it, or fork Pi. A fork gives you total control, and it hands you every upstream merge from then on. For a harness whose value is policy, not plumbing, a package is the better trade. So read OhMyPi as a map, and pick the ideas that matter for engineering work:</p>
			<div class="scroll">
				<table class="need">
					<thead><tr><th>Idea from OhMyPi</th><th>What it does</th><th>Pi seam</th><th>Step</th></tr></thead>
					<tbody>
						<tr><td>Approval modes</td><td>Tiers tools into read, write, and exec</td><td><code>tool_call</code></td><td>5</td></tr>
						<tr><td>Hashline edits</td><td>Edits by content hash, not by retyping</td><td><code>registerTool</code></td><td>6</td></tr>
						<tr><td>Stream rules</td><td>Aborts mid-token, injects a rule, retries</td><td><code>message_update</code></td><td>7</td></tr>
						<tr><td>Plan mode</td><td>Explores read-only before it changes anything</td><td><code>setActiveTools</code></td><td>8</td></tr>
						<tr><td>Subagents</td><td>Worktrees and schema-checked results</td><td>SDK</td><td>9</td></tr>
						<tr><td>Code review</td><td>Findings ranked P0 to P3, with a verdict</td><td><code>agent_before_settle</code></td><td>10</td></tr>
					</tbody>
				</table>
			</div>
			<p>Leave the rest. The LSP, debugger, browser, and native core are real engineering, and they are the reason to use OhMyPi itself. They are not what makes work trustworthy.</p>
			<div class="note">
				<p><b>Could one package serve both?</b> Not this one. OhMyPi can load many Pi packages, but version 18.16.0 has neither of the two settle events the gates in step 10 depend on, and a direct load of OpenHarness failed on its Pi imports. This is a Pi package.</p>
			</div>
		</Step>

		<Step n={3} slug="package" leg="cyan" seg="base-camp" title="Create the package">
			<p>A Pi package is an ordinary folder. The <code>pi</code> key in <code>package.json</code> says what to load, and the <code>pi-package</code> keyword makes it discoverable.</p>
			<CodeBlock id="setup" />
			<CodeBlock id="package" />
			<CodeBlock id="tsconfig" />
			<CodeBlock id="npm-install" />
			<div class="note">
				<p><b>Peer dependencies are not optional.</b> Pi supplies its own packages to extensions. List them in <code>dependencies</code> and you can load duplicate copies, which Pi warns about at startup. Declare them as peers with <code>"*"</code>, and pin them in <code>devDependencies</code> for your own tests.</p>
			</div>
			<p>There is no build step. Pi loads TypeScript directly, and Node 22.19 strips types when it runs the tests.</p>
		</Step>

		<Step n={4} slug="policy" leg="cyan" seg="base-camp" title="Put the rules in one file">
			<p>A team's standards should live in the repo, in a file you can review. Each project gets a <code>harness.json</code>:</p>
			<CodeBlock id="harness-json" />
			<p>Two lists do different jobs. <code>protect</code> is off limits entirely, even to read. <code>frozen</code> can be read but never changed, which is what you want for your tests. Step 10 shows why that second list exists.</p>
			<p>The loader has one job that matters. A typo in a safety file must never quietly switch the safety off, so a broken file throws, and the caller fails closed.</p>
			<CodeBlock id="config" />
			<p>Every feature shares one small state object. It loads the policy on first use, because an extension only learns the working folder from an event. Its folder ignores itself, so the harness's own files never look like a code change.</p>
			<CodeBlock id="state" />
		</Step>

		<section class="leg" style="--leg:var(--yellow)">
			<h2>Place the protection</h2>
			<p>Three anchors that hold on every single tool call.</p>
		</section>

		<Step n={5} slug="guard" leg="yellow" seg="protection" title="Tier every tool call">
			<p>Borrowed from OhMyPi's approval modes: every tool is <code>read</code>, <code>write</code>, or <code>exec</code>, and the mode decides which need your approval. Protected paths and critical commands are denied in every mode, including <code>yolo</code>. An unknown tool gets the strictest tier, so a new tool is never trusted by accident.</p>
			<p>The decision is a pure function. It has no Node imports, which keeps it fast to test and lets it run right here on the page.</p>
			<CodeBlock id="policy" />
			<PolicyDemo />
			<p>Pi's <code>tool_call</code> event runs before a tool does, and can block it. Blocking isn't a crash: the model gets the reason as a tool result and carries on.</p>
			<CodeBlock id="guard" />
			<p>With no person at the keyboard, <code>ask</code> becomes no. And a broken <code>harness.json</code> leaves only reads working.</p>
			<div class="note">
				<p><b>Know what this is.</b> Matching words in a shell command is a speed bump. <code>cat .env</code> is caught, and <code>cat $(echo .e)nv</code> is not. It stops accidents, not an attacker. That's what the container in step 1 is for.</p>
			</div>
		</Step>

		<Step n={6} slug="hashline" leg="yellow" seg="protection" title="Anchor every edit">
			<p>Stock edits make the model retype the old text exactly, which wastes tokens and fails on a stray space. OhMyPi's hashline idea flips it: every line the model reads carries an anchor, a line number plus a short hash of its content, and an edit points at anchors.</p>
			<p>The real gain is what happens when the file changes underneath. If a formatter, a teammate, or a parallel worker got there first, the hash no longer matches and the edit is refused before it can land on the wrong line.</p>
			<CodeBlock id="hashline" />
			<HashlineDemo />
			<p>Now expose it as two tools, and take the stock <code>read</code> and <code>edit</code> away, so there's only one way to edit.</p>
			<CodeBlock id="edits" />
			<p class="side-note"><b>Simpler than the original.</b> OhMyPi's version has block operations, registers, and moves. This one has replace and insert, which is enough to get the safety property.</p>
			<p>This swap is nearly free. Pi's stock prompt and tools came to 1,426 tokens in a test project, and OpenHarness to 1,438, because the new edit tool's schema is smaller than the one it replaces.</p>
		</Step>

		<Step n={7} slug="rules" leg="yellow" seg="protection" title="Catch mistakes mid-sentence">
			<p>A rule in a system prompt costs tokens on every turn, and models still forget it. OhMyPi's stream rules cost nothing until they fire. They watch the output as it streams, and a match stops the model on the spot.</p>
			<CodeBlock id="rules" />
			<p>Three Pi events make this work. <code>message_update</code> sees each token, including tool arguments as they stream, so a bad <code>write</code> dies before it ever runs. <code>context</code> removes the failed attempt from what the model sees next. <code>agent_settled</code> retries, once the run has fully stopped.</p>
			<CodeBlock id="stream-rules" />
			<p>Removing the attempt is the part that's easy to miss. Without it, the bad output stays in context and the model is likely to repeat it. And each rule fires once per task, so a stubborn model can't loop forever. If it repeats the mistake, the gates still get a say.</p>
		</Step>

		<section class="leg" style="--leg:var(--purple)">
			<h2>Climb the loop</h2>
			<p>Protection stops bad moves. Now add the process that makes good ones: plan, delegate, and prove.</p>
		</section>

		<Step n={8} slug="plan" leg="purple" seg="loop" title="Plan before you touch anything">
			<p><code>/plan</code> removes every tool that can change something, so "read-only" is enforced, not requested. The phase ends with <code>submit_plan</code>, a typed tool, so a plan has a goal, steps, and a way to verify it. Then you approve it, or it stops.</p>
			<CodeBlock id="plan" />
			<p>Headless runs never auto-approve. The plan is saved to <code>.openharness/plan.md</code> and the run ends, because nobody was there to say yes.</p>
		</Step>

		<Step n={9} slug="workers" leg="purple" seg="loop" title="Delegate to workers in worktrees">
			<p>Two things go wrong with subagents: they trample each other's files, and they return prose you have to parse. OhMyPi answers with isolated worktrees and schema-checked results, and so does this.</p>
			<p>Start with a helper that runs a fresh agent with its own context. The only way out is a <code>report</code> tool whose schema you define. If the child finishes without calling it, that's an error, not an empty success.</p>
			<CodeBlock id="child" />
			<p>Then a tool that gives each worker its own git worktree and branch. Pi runs tool calls from one turn in parallel, so two <code>delegate</code> calls are two workers at once. Each runs under its own guard, and the worktree is removed even if the worker fails.</p>
			<CodeBlock id="delegate" />
			<p>The main agent gets back a typed report and a branch to merge. Workers run with no person attached, so anything that would ask is refused. To let them run shell commands, use <code>"mode": "yolo"</code>, inside a container.</p>
		</Step>

		<Step n={10} slug="gates" leg="purple" seg="loop" title="Hold the door shut">
			<p>This is the step that turns a coding agent into an engineering harness. Pi fires <code>agent_before_settle</code> when a run is about to end, and a handler can refuse. So "I'm done" stops being the model's call.</p>
			<CodeBlock id="gates" />
			<p>Follow the logic. If nothing changed, a question stays a question and no checks run. Otherwise your <code>verify</code> commands run, and failing output goes straight back to the model. Then a reviewer that never saw the work reads the diff and must return a typed verdict. Findings at or above your threshold send the work back too.</p>
			<div class="note bad">
				<p><b>The first version of this gate was fooled almost every time.</b> On a benchmark with a local 7B model, 7 of 8 runs came back <code>passed</code>, and in every one the model had rewritten the test. The gate had checked whatever was on disk. Telling the model not to change the test made no difference.</p>
			</div>
			<p>That's why <code>freeze</code> and <code>thaw</code> are here. When a task starts, the gate remembers every frozen file. Before it verifies anything, it puts them back, whichever tool changed them, and tells the model why. The guard refuses direct writes for fast feedback, but this is the part bash can't get around. Your checks are only worth something if the model can't edit them.</p>
			<p>Four details carry the weight:</p>
			<ul>
				<li><b>Retries are capped,</b> so a model that can't fix it fails loudly instead of burning tokens all night.</li>
				<li><b>A task has to change something.</b> Refused one edit, that same model simply gave up and asked for help, which looked like success. With <code>expectChange</code> on, doing nothing gets sent back too.</li>
				<li><b>A gate that cannot run is a failure.</b> If the reviewer crashes or never reports, the status is <code>failed</code>, and the catch block says so on screen.</li>
				<li><b>The reviewer can be a different model.</b> Set <code>review.model</code> to <code>provider/id</code> so one model isn't marking its own homework.</li>
			</ul>
		</Step>

		<section class="leg" style="--leg:var(--teal)">
			<h2>Tie in</h2>
			<p>Wire it together, install it, and make it usable by people and by CI.</p>
		</section>

		<Step n={11} slug="ledger" leg="teal" seg="tie-in" title="Keep a ledger">
			<p>Pi already saves full sessions. The ledger is the compact version: one line per tool, turn, block, and gate, so a run can be summarized and compared.</p>
			<CodeBlock id="ledger" />
		</Step>

		<Step n={12} slug="install" leg="teal" seg="tie-in" title="Wire it up and install it">
			<p>One function installs every feature. The order is deliberate: the guard goes first, so nothing runs before it.</p>
			<CodeBlock id="install" />
			<CodeBlock id="entry" />
			<CodeBlock id="typecheck" />
			<CodeBlock id="pi-install" />
			<p>That's it. Pi now loads OpenHarness in every project. To share it with a team, push the folder and install it with <code>pi install git:github.com/you/openharness</code>.</p>
		</Step>

		<Step n={13} slug="skill" leg="teal" seg="tie-in" title="Teach the model the route">
			<p>Gates work whether the model knows about them or not, but it wastes fewer turns if it does. A skill is instructions that load on demand, so it costs a line in the prompt until it's needed.</p>
			<CodeBlock id="skill" />
			<p>A prompt template turns the whole loop into one command.</p>
			<CodeBlock id="ship" />
			<CodeBlock id="try-it" />
			<CodeBlock id="try-it-in" />
		</Step>

		<Step n={14} slug="cli" leg="teal" seg="tie-in" title="Give CI a real exit code">
			<p>A harness you can only drive by hand isn't finished. Pi's SDK runs the same session inside your own process, so one function can serve the command line and the tests.</p>
			<CodeBlock id="harness" />
			<CodeBlock id="bin" />
			<CodeBlock id="link" />
			<p>Now a pipeline can run <code>openharness run "..."</code> and trust the exit code. It is 0 only when the status is <code>passed</code>, however confident the model sounded.</p>
			<div class="note">
				<p><b>Before you publish to npm:</b> this file runs because <code>npm link</code> keeps it outside <code>node_modules</code>. Node won't strip types inside <code>node_modules</code>, so a published CLI needs a build step. Installing through <code>pi install</code> isn't affected.</p>
			</div>
		</Step>

		<section class="leg" style="--leg:var(--cursor)">
			<h2>Prove it</h2>
			<p>A harness makes claims about failure. So test the failures.</p>
		</section>

		<Step n={15} slug="proof" leg="cursor" seg="summit" title="Test the harness without a model">
			<p>Pi ships a scripted model. It runs the real loop, real tools, and real gates, and replies from a list you write. That means you can prove what happens when a model lies about being done, for free, in milliseconds.</p>
			<CodeBlock id="helpers" />
			<p>The pure logic gets plain unit tests:</p>
			<CodeBlock id="pure" />
			<p>And the harness gets scenarios. Read the test names: each one is a promise.</p>
			<CodeBlock id="tests" />
			<CodeBlock id="test-run" />
			<CodeBlock id="test-out" />
			<h4>Then point it at a real model</h4>
			<p>A scripted model proves the gates work. It can't show what a real model does when it meets them. So the harness also ran against a small local one, Qwen2.5-Coder 7B, on eight tiny JavaScript bugs. Every task said the same thing: fix the bug so <code>node check.js</code> passes, and don't change <code>check.js</code>. A run only counted as solved if the test passed and git showed it unchanged.</p>
			<div class="scroll">
				<table class="need">
					<thead><tr><th>Setup</th><th>Solved</th><th>Said passed</th><th>False passes</th><th>Test left modified</th></tr></thead>
					<tbody>
						<tr><td>Stock Pi</td><td>0 of 8</td><td>No verdict</td><td>n/a</td><td>4 of 8</td></tr>
						<tr><td>Verify gate only</td><td>2 of 8</td><td>6 of 8</td><td class="bad">4</td><td class="bad">6 of 8</td></tr>
						<tr><td>Gate and <code>frozen</code></td><td>3 of 8</td><td>3 of 8</td><td class="good">0</td><td class="good">0 of 8</td></tr>
						<tr><td>Gate, <code>frozen</code>, and hashline</td><td>3 of 8</td><td>3 of 8</td><td class="good">0</td><td class="good">0 of 8</td></tr>
					</tbody>
				</table>
			</div>
			<p>Look at false passes first. With a gate alone, the harness said <code>passed</code> six times and four of those were wrong, because the model had rewritten the test. That's worse than stock Pi, which at least promises nothing. With <code>frozen</code>, false passes went to zero, and every <code>passed</code> was real.</p>
			<p>Trust the solved column least. The <code>frozen</code> setup solved 0 of 8 until its refusal messages were reworded to tell the model where to look, as in "Find the code it tests and fix that instead." Your refusals are prompts, so write them like prompts. The last two rows also solved mostly different tasks, so 3 of 8 is not a stable rate, and hashline made no measurable difference here.</p>
			<div class="note">
				<p><b>What this table can't tell you.</b> This is one model at 4-bit, eight tiny tasks, and one greedy run per cell, with the reviewer off. It ran through a test-only adapter that starts <code>llama-completion</code> on every turn, not a normal provider. The stock row comes from the run before the rewording, which stock Pi never sees. No frontier model was tested, so this says nothing about how much a harness adds to a strong one.</p>
			</div>
			<p>So the claim is narrow. The harness didn't make a weak model smart. It made its failures visible, and that's what a pipeline needs from it.</p>
		</Step>

		<section class="leg" style="--leg:var(--red-text)" id="limits">
			<h2>Where this stops working</h2>
			<p>A harness narrows the ways things go wrong. It doesn't remove them.</p>
		</section>
		<div class="col limits">
			<ul>
				<li><b>It won't make a weak model good.</b> The best setup in step 15 solved 3 of 8 tiny bugs. What changed is that the other 5 said <code>failed</code>.</li>
				<li><b>Your checks are the ceiling.</b> The verify gate is only as good as your tests. Weak tests give you a green run and a bad change.</li>
				<li><b>The guard is not a sandbox.</b> It matches words, and bash is expressive. Run unattended work in a container with no secrets.</li>
				<li><b>Models will game whatever you leave open.</b> <code>frozen</code> stops a rewritten test, but not a hard-coded answer that satisfies it. Review helps, and so does reading the diff.</li>
				<li><b>Review is one opinion.</b> A reviewer can miss things, and it costs tokens on every change. Use a different model, and turn it off where it doesn't pay.</li>
				<li><b>It tracks a moving target.</b> Pi changes fast. Pin the version, and let the tests tell you when an upgrade breaks a hook.</li>
			</ul>
		</div>
	</main>

	<section class="clearing" aria-labelledby="end">
		<div>
			<h2 id="end">Top of the route</h2>
			<p class="say">Every anchor held. The model did the climbing, and the harness decided how far it could fall. Now put your own rules in <code>harness.json</code> and go.</p>
		</div>
		<div class="readout" role="img" aria-label="Terminal output: 36 of 36 tests pass, 0 failed">
			<div><span class="p1">❯</span> npm test</div>
			<div class="big">36 of 36</div>
			<div class="big go2">0 failed</div>
		</div>
	</section>
	<footer>
		<div class="colophon">
		<p>Built and tested in November 2026 against Pi 1.5.0 and OhMyPi 18.16.0 on macOS 26.7 with Node 24. <a href="https://github.com/earendil-works/pi">Pi</a> and <a href="https://github.com/can1357/oh-my-pi">OhMyPi</a> are MIT licensed. Every TypeScript file on this page was typechecked and tested as the package you can <a href="/blog/downloads/openharness.zip">download</a>.</p>
		<p>Mountains are steep and APIs change. No em-dashes were harmed in the making of this guide.</p>
		<p><button class="reset" type="button" onclick={() => progress.reset()}>Clear my progress</button></p>
		</div>
	</footer>
</div>
