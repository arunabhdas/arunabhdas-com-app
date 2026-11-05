<script lang="ts">
	/**
	 * Agentic AI Without the Token Tax
	 * A build guide in the same WezTerm window as the Dream SWE guide, set in a rail yard:
	 * the model asks for a route, and an interlocking decides whether it may run.
	 * Code blocks are generated from a package that was compiled and run.
	 */
	import { onMount, setContext } from 'svelte';
	import CodeBlock from '../guide/CodeBlock.svelte';
	import Step from '../guide/Step.svelte';
	import StepTabs from '../guide/StepTabs.svelte';
	import Wall from '../guide/Wall.svelte';
	import { GUIDE_KEY, GuideProgress } from '../guide/progress.svelte';
	import EngineDemo from './EngineDemo.svelte';
	import GateDemo from './GateDemo.svelte';
	import TokenMeter from './TokenMeter.svelte';
	import blocks from './code-blocks.json';
	import '../guide/guide-base.css';
	import './action.css';
	import '../guide/guide-end.css';

	const tabs = [
		'package',
		'actions',
		'hash',
		'dates',
		'rules',
		'contract',
		'gemma',
		'apple',
		'gate',
		'router',
		'effects',
		'journal',
		'cli',
		'tests',
		'evals'
	];

	const progress = new GuideProgress('action-engine:done');
	setContext(GUIDE_KEY, { progress, blocks, path: '~/act' });

	onMount(() => progress.load());
</script>

<div class="blog-guide action-engine">
	<a class="skip" href="#guide">Skip to the guide</a>
	<Wall />

	<StepTabs {progress} {tabs} />

	<header class="hero">
		<div class="shellline" aria-hidden="true">
			<div class="r1"><span class="f">╭─</span><span class="pth">~/repos/arunabhdas/<b>act</b></span><span class="br">main</span><span class="fill"></span><span class="f">─╮</span></div>
			<div class="r2"><span class="f">╰─❯</span><span><span class="typed">act eval holdout.jsonl</span><span class="blk"></span></span></div>
		</div>
		<div>
			<h1><span>Agentic AI</span><span>Without the</span><span>Token Tax</span></h1>
			<p class="subtitle">Building a Deterministic, On-Device Action Engine</p>
			<p class="lede">Fifteen steps to a small Swift engine that turns plain requests into checked, repeatable actions on your own Mac. Rules go first, a local model handles the rest, and no token leaves the machine.</p>
			<p class="byline"><a class="start" href="#guide">Start building</a><span>By <a href="https://medium.com/@arunabhdas">Arunabh Das</a></span></p>
		</div>
	</header>

	<main class="window" id="guide">
		<div class="intro">
			<div>
				<h2>The tax, and the way around it</h2>
				<p>Most agent frameworks run a loop. Every turn sends the system prompt, every tool schema, and the whole conversation back to a cloud model. You pay for all of it again on the next turn, and you pay to decide things you already know how to decide: what day Friday is, which file to write, whether a step already ran.</p>
				<p>Railways settled this long ago. A signaller asks for a route. An interlocking, a machine with no opinions, refuses any route that conflicts with another. Judgment proposes, and the machine disposes.</p>
				<p class="creed">The AI proposes, code validates, and deterministic software executes.</p>
				<dl class="dest">
					<dt>rules</dt><dd>Known requests become plans in about a millisecond, with no model at all</dd>
					<dt>model</dt><dd>Gemma 3 4B or Apple's on-device model for the rest, held to a grammar</dd>
					<dt>gate</dt><dd>A validator that refuses loops, past dates, and anything outside four actions</dd>
					<dt>approval</dt><dd>A plan hash, so what you read is byte for byte what runs</dd>
					<dt>effects</dt><dd>Steps that survive a crash and never run twice</dd>
					<dt>proof</dt><dd>A replayable audit log and a scored test set</dd>
				</dl>
			</div>
			<div>
				<h2>Four rules for the build</h2>
				<ol class="rules">
					<li><b>The model proposes. It never acts.</b> It fills in a form, and code does everything after that.</li>
					<li><b>Code owns the facts.</b> Dates, paths, ids, counts, and order never come from a model.</li>
					<li><b>Take the cheapest route first.</b> A regular expression beats a model whenever it can.</li>
					<li><b>Approve the exact plan.</b> A hash ties what you read to what runs.</li>
				</ol>
				<p>You need macOS 26 or later, Xcode 27, Homebrew, and 2.5 GB of disk for the model. There are no Swift dependencies and no API keys. Tick each step as you finish it. Your progress stays in this browser.</p>
				<p>Prefer to read the finished thing first? <a href="/blog/downloads/act.zip">Download the whole package</a> (<code>act.zip</code>), with both test sets.</p>
				<div class="note">
					<p><b>What deterministic means here.</b> Rules, the validator, and the executor are plain functions of their inputs. A model is not, so its reply is treated as an input: recorded once, then replayed exactly. Greedy decoding repeated every result in these tests, but a new model or llama.cpp build can change a reply. Everything after the reply stays fixed.</p>
				</div>
			</div>
		</div>

		<figure class="plate track">
			<div class="scroll">
				<svg viewBox="0 0 900 250" role="img" aria-label="A track diagram. A request runs along the main line through rules, the gate, approval, the executor, and the journal. Requests that rules cannot read take a siding through the local model and rejoin before the gate. Refused plans leave on a spur that ends at a buffer stop.">
					<g fill="none" stroke-width="4" stroke-linecap="round">
						<path d="M36 130H860" stroke="#47FF9C"/>
						<path d="M238 130C280 130 280 206 322 206H416C458 206 458 130 500 130" stroke="#A277FF"/>
						<path d="M520 130C556 130 556 52 592 52H724" stroke="#E52E2E"/>
					</g>
					<path d="M724 36v32" stroke="#E52E2E" stroke-width="5" stroke-linecap="round"/>
					<g fill="#011423" stroke-width="3">
						<circle cx="60" cy="130" r="9" stroke="#47FF9C"/>
						<circle cx="210" cy="130" r="9" stroke="#47FF9C"/>
						<circle cx="369" cy="206" r="9" stroke="#A277FF"/>
						<circle cx="520" cy="130" r="9" stroke="#FFE073"/>
						<circle cx="640" cy="130" r="9" stroke="#47FF9C"/>
						<circle cx="750" cy="130" r="9" stroke="#47FF9C"/>
						<circle cx="846" cy="130" r="9" stroke="#47FF9C"/>
					</g>
					<g font-family="JetBrains Mono,ui-monospace,monospace" font-size="15" text-anchor="middle" fill="#EAF6FF">
						<text x="60" y="106">request</text>
						<text x="210" y="106">rules</text>
						<text x="369" y="184">local model</text>
						<text x="520" y="168">gate</text>
						<text x="640" y="106">approve</text>
						<text x="750" y="106">execute</text>
						<text x="846" y="106">journal</text>
						<text x="658" y="36" fill="#FF7A7A">refused, with a reason</text>
					</g>
					<g font-family="JetBrains Mono,ui-monospace,monospace" font-size="13" text-anchor="middle" fill="#8FB3CB">
						<text x="210" y="160">0 tokens</text>
						<text x="369" y="236">~360 local tokens</text>
						<text x="370" y="120">known shape</text>
					</g>
				</svg>
			</div>
			<figcaption>The whole engine as a track plan. Only the siding touches a model, and every route passes the gate.</figcaption>
		</figure>

		<section class="leg" style="--leg:var(--red-text)" id="tax">
			<h2>Price the loop you are replacing</h2>
			<p>A loop's input grows with every turn, because each turn resends everything before it. Move the dials and watch the stack.</p>
		</section>
		<div class="col meter-col"><TokenMeter /></div>

		<section class="leg" style="--leg:var(--cyan)">
			<h2>Close the set</h2>
			<p>Decide what the engine can do, and give every plan one exact form.</p>
		</section>

		<Step n={1} slug="package" leg="cyan" seg="foundation" title="Start a package with no dependencies">
			<p>The engine is one library, one command-line tool, and a test target. There is no agent framework, SDK, or API key.</p>
			<CodeBlock id="setup" />
			<CodeBlock id="package" />
			<p>Add two placeholder files so the package builds from the first step. Step 13 and step 14 replace them.</p>
			<CodeBlock id="stub" />
		</Step>

		<Step n={2} slug="actions" leg="cyan" seg="foundation" title="Close the set of actions">
			<p>An agent that can call anything has to be checked against everything. Start the other way: write down everything the engine may do. An enum has no <code>case other</code>, so the compiler helps you refuse the rest.</p>
			<CodeBlock id="action" />
			<p>Each <code>Step</code> lists the steps it waits for in <code>after</code>, so a plan is a small graph. Four actions are enough to show every idea in this guide. Yours will differ, but the list stays closed.</p>
		</Step>

		<Step n={3} slug="hash" leg="cyan" seg="foundation" title="Give every plan one exact form">
			<p>Approval means nothing if the thing approved can shift. Canonical JSON gives each value exactly one byte sequence: sorted keys and a fixed date format. Hash those bytes and you have a name for the exact plan.</p>
			<CodeBlock id="canonical" />
			<CodeBlock id="build" />
			<p class="side-note"><b>Six bytes is plenty here.</b> Forty-eight bits names plans in one person's folder. If plans cross a trust boundary, keep the full digest and sign it.</p>
		</Step>

		<section class="leg" style="--leg:var(--cursor)">
			<h2>Spend nothing first</h2>
			<p>Two steps that handle known requests with no model at all.</p>
		</section>

		<Step n={4} slug="dates" leg="cursor" seg="tier-0" title="Take the calendar away from the model">
			<p>Code is perfect at calendars, and it is cheap. So the model never works out a date. It copies the user's words, and this file resolves them against a clock that is passed in, which makes every result repeatable.</p>
			<CodeBlock id="when" />
			<p>Notice what <code>"at 3"</code> does: it returns <code>nil</code>. Morning or afternoon is the user's call, so the engine refuses instead of guessing. Also, <code>next friday</code> means the coming Friday here. If your users mean something else, change it in this one place.</p>
		</Step>

		<Step n={5} slug="rules" leg="cursor" seg="tier-0" title="Answer known shapes with no model">
			<p>A request with a known shape does not need a model. Match it, build the plan, and spend nothing. Anything the rules cannot read returns <code>nil</code> and moves on.</p>
			<CodeBlock id="rules" />
			<p>Try it. This box runs a port of that file, and all 108 requests in the parity test gave the same result and hash in Swift.</p>
			<EngineDemo />
			<div class="note bad">
				<p><b>An eager rule is worse than no rule.</b> An early draft of this file read "turn off the lights" as a request to extract tasks from a note called "off the lights". That is why <code>into tasks</code> is required, and why <code>book</code> refuses to match <code>book me</code>. If a pattern is not sure, it should return <code>nil</code>.</p>
			</div>
		</Step>

		<section class="leg" style="--leg:var(--purple)">
			<h2>Let the model speak, on a short lead</h2>
			<p>Some requests need language understanding. The model gets a form, not a tool belt.</p>
		</section>

		<Step n={6} slug="contract" leg="purple" seg="tier-1" title="Write the only thing a model may say">
			<p>The model never sees <code>Action</code>. It fills in a flat form of five fields, and dates stay as words. This file is the bridge from words to types.</p>
			<CodeBlock id="proposal" />
			<p>The <code>none</code> option matters more than it looks. A model with no way to say no will say something else. And note the instruction <em>never work out a date</em>: the form has a place for the user's words, and no place for a calculated one.</p>
		</Step>

		<Step n={7} slug="gemma" leg="purple" seg="tier-1" title="Run a local model under a grammar">
			<p>llama.cpp runs Gemma on the GPU of your Mac. Its <code>--json-schema</code> flag compiles the schema into a grammar, and the sampler can only pick tokens the grammar allows. Install it and fetch the model. The checksum should match.</p>
			<CodeBlock id="llama-install" />
			<CodeBlock id="llama-sum" />
			<CodeBlock id="llama" />
			<p>Temperature 0 picks the most likely token every time, and the seed fixes the rest. Starting a process per request reloads the model on each call, which keeps this file short. A real app would link the library and keep the model in memory.</p>
			<p>Here is what the grammar buys. All 30 held-out requests went to each model, with and without it:</p>
			<div class="scroll">
				<table class="need">
					<thead><tr><th>Replies that fit the schema</th><th>With grammar</th><th>Free text</th></tr></thead>
					<tbody>
						<tr><td>Gemma 3 4B</td><td class="good">30 of 30</td><td>14 of 30</td></tr>
						<tr><td>Gemma 3 1B</td><td class="good">30 of 30</td><td>0 of 30</td></tr>
					</tbody>
				</table>
			</div>
			<div class="note">
				<p><b>A grammar guarantees shape, not truth.</b> Gemma 1B always produced valid JSON, and it still filed nearly everything under the wrong action. Validity is what the grammar gives you. Correctness needs the gate, the approval step, and a test set.</p>
			</div>
		</Step>

		<Step n={8} slug="apple" leg="purple" seg="tier-1" title="Swap in Apple's model">
			<p>Macs and iPhones with Apple Intelligence already carry a model. Foundation Models has the same idea built in: <code>@Generable</code> types and <code>@Guide</code> limits constrain decoding, so this is the same contract with nothing to download.</p>
			<CodeBlock id="apple" />
			<p>Because both sit behind <code>Proposer</code>, nothing else changes. The command line in step 13 uses Gemma when <code>ACT_MODEL</code> is set, and Apple's model otherwise.</p>
			<div class="note">
				<p><b>Compiled, not measured.</b> This file builds with Xcode 27, but Apple Intelligence was off on the test Mac, so every number in this guide comes from Gemma. It also reports no token count, so <code>local</code> reads 0 on this path.</p>
			</div>
		</Step>

		<section class="leg" style="--leg:var(--yellow)">
			<h2>Gate every route</h2>
			<p>Rules and models both produce plans. Neither one is trusted.</p>
		</section>

		<Step n={9} slug="gate" leg="yellow" seg="interlock" title="Build the interlocking">
			<p>This is the machine with no opinions. It checks limits, checks that every dependency exists, and puts the steps in order. Ties keep plan order, so the result never varies. Failures carry a reason a person can act on.</p>
			<CodeBlock id="validator" />
			<p>Now try to get a bad plan past it. These are real messages from the same logic, running in this page.</p>
			<GateDemo />
		</Step>

		<Step n={10} slug="router" leg="yellow" seg="interlock" title="Route the cheapest way first">
			<p>The router is short because the hard decisions already live elsewhere. Rules go first, the model hears only what they could not read, and both routes pass through the same <code>seal</code>.</p>
			<CodeBlock id="engine" />
			<p><code>cloudTokens</code> is a literal 0. That is the point of the design: there is no network code in this package, so no code path could make it anything else. <code>replay</code> rebuilds a plan from a record without touching a model, because the record holds the model's reply.</p>
		</Step>

		<section class="leg" style="--leg:var(--teal)">
			<h2>Act exactly once</h2>
			<p>Side effects are where agents do real damage. Three files make them safe to retry.</p>
		</section>

		<Step n={11} slug="effects" leg="teal" seg="effects" title="Write handlers that are safe to run twice">
			<p>All files live under one root, and a title can never become a path, because <code>slug</code> keeps only letters, digits, and hyphens. <code>../../.ssh/authorized_keys</code> becomes the harmless <code>ssh-authorized-keys</code>.</p>
			<CodeBlock id="workspace" />
			<p>Each handler takes a key and checks the world before it writes. A task carries its key in a hidden marker. An event's file name comes from its key, and its timestamp comes from the plan, not the clock. A note refuses to overwrite different text.</p>
			<CodeBlock id="handlers" />
		</Step>

		<Step n={12} slug="journal" leg="teal" seg="effects" title="Keep a journal, so a crash is boring">
			<p>The executor writes <code>started</code>, performs the effect, then writes <code>done</code>. The dangerous moment is between the last two: the effect happened, but the journal does not know. On the next run the step runs again, the handler finds its own marker, and nothing is duplicated.</p>
			<CodeBlock id="executor" />
			<p>The key is a hash of the step itself. Two identical requests make one task. That is usually what you want from a retry, and if you want a real duplicate, it has to differ in some way.</p>
		</Step>

		<Step n={13} slug="cli" leg="teal" seg="effects" title="Wire up the command line, then run it">
			<p>Replace the placeholder <code>main.swift</code>. <code>plan</code> and <code>run</code> are separate commands on purpose: reading the plan is the approval step, and the hash you pass to <code>run</code> is your signature on those exact bytes.</p>
			<CodeBlock id="main" />
			<p>Add the scoring code now too. Step 15 puts it to work.</p>
			<CodeBlock id="evaluation" />
			<p>Build it. <code>--now</code> pins the clock so your output matches this page. Leave it off for real use, along with <code>ACT_TZ</code>, and your own clock and time zone apply.</p>
			<CodeBlock id="try-setup" />
			<CodeBlock id="try-plan" />
			<CodeBlock id="try-plan-out" />
			<p>Run it twice. The second run does nothing.</p>
			<CodeBlock id="try-run" />
			<CodeBlock id="try-run-out" />
			<p>Now a request no rule can read. Gemma answers in about a second and a half, and loading the model is nearly all of that.</p>
			<CodeBlock id="try-model" />
			<CodeBlock id="try-model-out" />
			<p>The title came out as "about the invoice", which is clumsy but honest, and you can see it before anything runs. Rebuild that plan without a model, then tamper with the saved file:</p>
			<CodeBlock id="try-replay" />
			<CodeBlock id="try-replay-out" />
		</Step>

		<section class="leg" style="--leg:var(--cursor)">
			<h2>Prove it</h2>
			<p>A demo shows the good cases. Tests and a held-out set show the rest.</p>
		</section>

		<Step n={14} slug="tests" leg="cursor" seg="proof" title="Test everything without a model">
			<p>Almost all of this engine is plain code, so almost all of it can be tested without one. Replace the placeholder test file. A canned <code>Proposer</code> stands in where a reply is needed, and a crash is injected at the worst possible moment.</p>
			<CodeBlock id="tests" />
			<CodeBlock id="test-run" />
			<CodeBlock id="test-out" />
		</Step>

		<Step n={15} slug="evals" leg="cursor" seg="proof" title="Score it on requests you never tuned for">
			<p>A test set is one line per request: what should happen, and the date it should land on. <code>act.zip</code> includes two of them, so copy those into your package. A refusal is a right answer when the request is out of scope.</p>
			<CodeBlock id="cases" />
			<p>The prompt was tuned against <code>cases.jsonl</code>. Gemma 4B scored 33 of 40 on the first prompt, 35 after five examples, and 40 after one sentence about colons. That last number is flattering, because those are the questions it studied. So <code>holdout.jsonl</code> was written afterwards and run with no further changes:</p>
			<CodeBlock id="eval-run" />
			<CodeBlock id="eval-out" />
			<div class="scroll">
				<table class="need results">
					<thead><tr><th>30 held-out requests</th><th>Right</th><th>Average time</th><th>Cloud tokens</th></tr></thead>
					<tbody>
						<tr><td>Rules, no model</td><td>12</td><td>0.7 ms</td><td>0</td></tr>
						<tr><td>Rules and Gemma 3 1B</td><td>12</td><td>0.76 s</td><td>0</td></tr>
						<tr><td>Rules and Gemma 3 4B</td><td class="good">26</td><td>1.15 s</td><td>0</td></tr>
					</tbody>
				</table>
			</div>
			<p class="fine">Measured on an Apple M5 Max with 36 GB. Model times are for requests that reached the model, and include loading it. Gemma 4B used about 358 local tokens per request. Thirty hand-written requests is a smoke test, not a benchmark.</p>
			<p>Three things stand out. First, Gemma 1B scored the same as no model at all, so try the smallest model you can, then measure it. Second, the grammar kept every 4B reply well formed, so all four misses are mistakes of meaning, not format. Third, look at this one:</p>
			<div class="note bad">
				<p><b>"Book me a flight to Lisbon on friday" became a calendar event.</b> It is valid, well typed, and passes every check, and it is not what was asked. No validator can catch that, because the plan is legal. This is why a person reads the plan before <code>run</code>, and why side effects stay reversible until they do.</p>
			</div>
			<p>Then improve it the cheap way. Every line in <code>.act/audit.jsonl</code> with a model route is a candidate for a new rule. Promote the common shapes, and token use falls as the engine learns your traffic, with no retraining.</p>
		</Step>

		<section class="leg" style="--leg:var(--red-text)" id="limits">
			<h2>Where this stops working</h2>
			<p>This shape suits a closed set of actions. It is not a replacement for every agent.</p>
		</section>
		<div class="col limits">
			<ul>
				<li><b>Open-ended work still needs a big model.</b> Research, writing, and multi-step reasoning do not fit a form with five fields.</li>
				<li><b>Rules need upkeep.</b> Each pattern is code you own, in one language. Expect to delete some.</li>
				<li><b>The date reader is small on purpose.</b> "The Tuesday after next" gets a refusal, not an answer.</li>
				<li><b>A hash is not a signature.</b> It catches a changed plan. It does not stop someone who can rewrite your audit log.</li>
				<li><b>Replays depend on the record.</b> A reply is repeatable because it was saved, not because a model will say it again.</li>
			</ul>
		</div>
	</main>

	<section class="clearing" aria-labelledby="end">
		<div>
			<h2 id="end">End of the line</h2>
			<p class="say">The rules answered what they could, a local model answered the rest, and no token left the machine. Every signal is green. Go build yours.</p>
		</div>
		<div class="readout" role="img" aria-label="Terminal output: 26 of 30 right, 0 cloud tokens">
			<div><span class="p1">❯</span> act eval holdout.jsonl</div>
			<div class="big">26 of 30 right</div>
			<div class="big go">0 cloud tokens</div>
		</div>
	</section>
	<footer>
		<p>Measured in November 2026 on macOS 26.7 with Swift 6.4, llama.cpp build 9770, and Gemma 3 Q4_K_M, under the <a href="https://ai.google.dev/gemma/terms">Gemma terms</a>. Every Swift file on this page was compiled and tested as the package you can <a href="/blog/downloads/act.zip">download</a>.</p>
		<p>Prices and models change. The arithmetic does not. No em-dashes were harmed in the making of this guide.</p>
		<p><button class="reset" type="button" onclick={() => progress.reset()}>Clear my progress</button></p>
	</footer>
</div>
