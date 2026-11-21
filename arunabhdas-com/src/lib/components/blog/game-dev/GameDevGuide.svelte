<script lang="ts">
	/**
	 * How to Setup Game Dev Environment on Mac
	 * The fifth guide in the WezTerm window, set on a launch pad the night before a launch:
	 * an engine, the one compiler that fits it, and a checklist read aloud before anything
	 * is lit. Version numbers come from Epic's requirements page. The command output on
	 * the page is from the Mac it was written on.
	 */
	import { onMount, setContext } from 'svelte';
	import CodeBlock from '../guide/CodeBlock.svelte';
	import Step from '../guide/Step.svelte';
	import StepTabs from '../guide/StepTabs.svelte';
	import Wall from '../guide/Wall.svelte';
	import { GUIDE_KEY, GuideProgress } from '../guide/progress.svelte';
	import XcodeCheck from './XcodeCheck.svelte';
	import XcodeScope from './XcodeScope.svelte';
	import blocks from './code-blocks.json';
	import '../guide/guide-base.css';
	import './gamedev.css';
	import '../guide/guide-end.css';

	const tabs = [
		'mac',
		'xcodes',
		'launcher',
		'engine',
		'options',
		'xcode',
		'select',
		'metal',
		'launch',
		'trouble'
	];

	const progress = new GuideProgress('game-dev-mac:done');
	setContext(GUIDE_KEY, { progress, blocks, path: '~/gamedev' });

	onMount(() => progress.load());

	const FIRST_GUIDE = '/blog/how-to-setup-dream-swe-dev-environment-on-macos';
	const EPIC_REQUIREMENTS =
		'https://dev.epicgames.com/documentation/en-us/unreal-engine/macos-development-requirements-for-unreal-engine';
	const EPIC_INSTALL =
		'https://dev.epicgames.com/documentation/en-us/unreal-engine/install-unreal-engine';
	const FORUM_CRASH =
		'https://forums.unrealengine.com/t/ue-5-8-preview-on-macos-xcode-26-5-is-crashing/2722969';
	const FORUM_SDK =
		'https://forums.unrealengine.com/t/unreal-engine-5-6-1-also-5-8-will-not-work-on-macos-26-0-xcode-26-0/2681509';
	const FORUM_STALL =
		'https://forums.unrealengine.com/t/unreal-engine-5-6-5-7-fails-to-start-on-apple-m5-macos-26/2720365';

	const options = [
		{ label: 'Core Components', hint: 'The engine and the editor', value: 'Required' },
		{ label: 'Starter Content', hint: 'A few meshes and materials to build a test scene with', value: 'Keep' },
		{ label: 'Templates and Feature Packs', hint: 'The starting points the project browser offers', value: 'Keep' },
		{ label: 'Engine Source', hint: 'Only if you want to read engine code in your editor', value: 'Your call' },
		{ label: 'Editor symbols for debugging', hint: 'Only for debugging a crash inside the engine itself', value: 'Skip', key: true },
		{ label: 'Target Platforms', hint: 'Android, iOS, Linux, TVOS', value: 'Skip all', key: true }
	];
</script>

<div class="blog-guide game-dev">
	<a class="skip" href="#guide">Skip to the guide</a>
	<Wall />

	<StepTabs {progress} {tabs} />

	<header class="hero">
		<div class="shellline" aria-hidden="true">
			<div class="r1"><span class="f">╭─</span><span class="pth">~/gamedev/<b>unreal</b></span><span class="br">main</span><span class="fill"></span><span class="f">─╮</span></div>
			<div class="r2"><span class="f">╰─❯</span><span><span class="typed">zsh preflight.zsh</span><span class="blk"></span></span></div>
		</div>
		<div>
			<h1><span>How to Setup</span><span>Game Dev</span><span>Environment</span><span>on Mac</span></h1>
			<p class="lede">Ten steps to Unreal Engine 5.8 on a Mac: the launcher, the engine, the one Xcode Epic recommends for it, and the Metal toolchain. A script at the end reads it all back and changes nothing.</p>
			<p class="byline"><a class="start" href="#guide">Start the countdown</a><span>By <a href="https://medium.com/@arunabhdas">Arunabh Das</a></span></p>
		</div>
	</header>

	<main class="window" id="guide">
		<div class="intro">
			<div>
				<h2>An engine is picky about its compiler</h2>
				<p>The <a href={FIRST_GUIDE}>first guide in this series</a> built a Mac for writing software. This one adds what a game needs on top of it: Unreal Engine, and the Apple tools the engine uses to compile C++ and shaders.</p>
				<p>Most of it is clicking Install and waiting. The part that goes wrong is the match. Unreal Engine 5.8 was built against one range of Xcode versions, and a Mac that is kept up to date is usually past the end of that range. Mine was.</p>
				<p class="creed">The newest Xcode is the wrong Xcode.</p>
				<dl class="dest">
					<dt>launcher</dt><dd>The Epic Games Launcher, signed in</dd>
					<dt>engine</dt><dd>Unreal Engine 5.8 in <code>/Users/Shared/Epic Games</code></dd>
					<dt>compiler</dt><dd>Xcode 26.1.1, beside the Xcode you already use</dd>
					<dt>shaders</dt><dd>The Metal toolchain that belongs to that Xcode</dd>
					<dt>check</dt><dd>One script that tells you what is still missing</dd>
				</dl>
			</div>
			<div>
				<h2>Four rules for the countdown</h2>
				<ol class="rules">
					<li><b>Match the list, not the calendar.</b> Install the versions Epic names for this engine, even when newer ones exist.</li>
					<li><b>Install beside, never over.</b> The second Xcode sits next to the first. Nothing you already build changes.</li>
					<li><b>Smallest install first.</b> Every platform and symbol file you skip today can be added later from the same dialog.</li>
					<li><b>Read before you light.</b> A script should tell you what is missing. The editor's way of telling you is a crash.</li>
				</ol>
				<p>Everything here is for Unreal Engine 5.8 on Apple Silicon. If the launcher offers you a newer engine, the method holds and the version numbers do not: read them off <a href={EPIC_REQUIREMENTS}>Epic's requirements page</a> first.</p>
				<p>Tick each step as you finish it. Your progress stays in this browser, and the tab bar keeps count.</p>
			</div>
		</div>

		<section class="leg" style="--leg:var(--cyan)">
			<h2>Read the pad</h2>
			<p>Two steps that install nothing. They tell you what you are starting with.</p>
		</section>

		<Step n={1} slug="mac" leg="cyan" seg="preflight" title="Hold your Mac up against Epic's list">
			<p>Five lines tell you whether this Mac is one the engine was made for.</p>
			<CodeBlock id="mac-check" />
			<p>On mine they print:</p>
			<CodeBlock id="mac-out" />
			<p>This is what Epic asks for, from its requirements page for 5.8:</p>
			<div class="scroll">
			<table class="need">
				<thead><tr><th></th><th>Minimum</th><th>Recommended</th></tr></thead>
				<tbody>
					<tr><td>Processor</td><td>M1 or M2, depending on the rendering features you use</td><td>M3</td></tr>
					<tr><td>Memory</td><td class="num">16 GB</td><td class="num">32 GB or more</td></tr>
					<tr><td>macOS</td><td class="num">Sonoma 14.5</td><td class="num">Sequoia 15, latest</td></tr>
					<tr><td>Graphics</td><td colspan="2">A Metal 1.2 compatible graphics card</td></tr>
				</tbody>
			</table>
			</div>
			<p>Epic gives no figure for disk space. The install dialog in step 5 shows the size of what you ticked. Add an Xcode and the caches the editor builds on its first start, and I would not begin with less than 100 GB free. That number is my margin, not Epic's.</p>
			<div class="note">
				<p><b>Look at the macOS row.</b> Epic's list stops at Sequoia 15, and my Mac runs macOS 26.7. That does not mean the engine will not run. It means Epic has not said that it will. Step 10 collects what people on Epic's own forum report about macOS 26, so you know what to try if the editor does not open.</p>
			</div>
		</Step>

		<Step n={2} slug="xcodes" leg="cyan" seg="preflight" title="Find out which Xcode you have">
			<p>The engine compiles C++ and shaders with Apple's tools, and it asks whichever Xcode is active. Find out which one that is:</p>
			<CodeBlock id="xcode-which" />
			<CodeBlock id="xcode-which-out" />
			<p>If it answers that <code>xcodebuild</code> requires Xcode, you have only the Command Line Tools from the first guide, and step 6 gives you your first Xcode. If it prints a version, look it up here:</p>
			<figure class="plate wide">
				<XcodeCheck />
				<figcaption>Epic's range for Unreal Engine 5.8, read in November 2026. Minimum 26.0, recommended 26.1.1, and one version called out by name as incompatible.</figcaption>
			</figure>
			<p>I had two Xcodes installed, 26.5 and 27.0, and neither is on the list. That is the normal state of a Mac used for app development: Apple ships a new Xcode several times a year, and each engine release is tested against the ones that existed when it shipped.</p>
			<p class="side-note"><b>Why not just try the newer one?</b> You can, and it may work. But when something fails later, you will not know whether it is your code, the engine, or the compiler. Using the recommended version takes that question away.</p>
		</Step>

		<section class="leg" style="--leg:var(--green)">
			<h2>Bring the engine</h2>
			<p>Three steps in the Epic Games Launcher. The download is the long part, so start it before the Xcode steps and let it run.</p>
		</section>

		<Step n={3} slug="launcher" leg="green" seg="engine" title="Install the Epic Games Launcher">
			<p>Unreal Engine does not come from Homebrew or the App Store. Epic's launcher downloads it, updates it, and repairs it.</p>
			<ul>
				<li>Go to <a href="https://www.unrealengine.com/download">unrealengine.com/download</a> and click <b>Download Launcher</b>.</li>
				<li>Open the <code>.dmg</code> and drag <b>Epic Games Launcher</b> into Applications.</li>
				<li>Open it and sign in. An Epic account is free, and you cannot download the engine without one.</li>
			</ul>
			<p class="note"><b>It is also a game store.</b> The launcher opens on the store. The engine lives under <b>Unreal Engine</b> in the left sidebar, which is the only part of it this guide uses.</p>
		</Step>

		<Step n={4} slug="engine" leg="green" seg="engine" title="Add an engine slot and pick 5.8">
			<p>In the launcher, click <b>Unreal Engine</b> in the left sidebar, then the <b>Library</b> tab at the top.</p>
			<figure class="plate">
				<div class="lib" role="img" aria-label="The Library tab: a heading that reads Engine Versions with a plus button beside it, and one engine slot showing version 5.8 with an Install button">
					<p class="lib-head"><b>ENGINE VERSIONS</b><span class="plus">+</span></p>
					<div class="tile">
						<span class="mark-u">U</span>
						<span class="ver">5.8.x <i>▾</i></span>
						<span class="btn">Install</span>
					</div>
				</div>
				<figcaption>A sketch of the Library tab, not a screenshot. The plus adds a slot. The version number on the slot is a menu.</figcaption>
			</figure>
			<ul>
				<li>Click the <b>+</b> next to <b>ENGINE VERSIONS</b>. A new slot appears.</li>
				<li>Click the version number on the slot and pick the newest <b>5.8</b> release.</li>
				<li>Click <b>Install</b>.</li>
				<li>Accept the <b>Unreal Engine Pricing options</b> dialog, then tick the box for the license agreement and accept that too. Both are short. Read them.</li>
			</ul>
			<p>If the menu offers something newer than 5.8, the slot will default to it. Rule one applies: take the version you have a matching Xcode for.</p>
		</Step>

		<Step n={5} slug="options" leg="green" seg="engine" title="Keep the location, trim the options">
			<p>The next dialog is <b>Choose install location</b>. Leave the location alone. On a Mac the engine goes to <code>/Users/Shared/Epic Games/UE_5.8</code>, and every tutorial, script, and forum answer you meet later will assume it is there.</p>
			<p>Then click <b>Options</b>, before Install. This is where the size is decided.</p>
			<figure class="plate">
				<div class="pane">
					<p class="ptitle"><span aria-hidden="true"><i></i><i></i><i></i></span>Unreal Engine Installation Options</p>
					<dl>
						{#each options as option}
							<div class="prow" class:key={option.key}>
								<dt>{option.label}<small>{option.hint}</small></dt>
								<dd><span class="val">{option.value}</span></dd>
							</div>
						{/each}
					</dl>
				</div>
				<figcaption>The dialog as text, with what I would do in each row. The green bar marks the two that save the most. The real dialog shows the storage your selection needs.</figcaption>
			</figure>
			<ul>
				<li><b>Target Platforms</b> are for building your game for another kind of device. Each one needs its own SDK before it is any use, so add them on the day you need them.</li>
				<li><b>Editor symbols for debugging</b> are a large download that only matters when you are chasing a crash inside the engine.</li>
			</ul>
			<p>Click <b>Apply</b>, then <b>Install</b>. The slot shows progress, and you can pause it. When it finishes:</p>
			<CodeBlock id="engine-check" />
			<p class="note ok"><b>You should see</b> <code>UE_5.8</code> in the list. Do not press Launch yet. The engine has no compiler to call.</p>
			<p class="side-note"><b>Changed your mind?</b> The small arrow beside Launch on the slot opens a menu with <b>Options</b> in it. The same dialog comes back, and ticking a box downloads only that part.</p>
		</Step>

		<section class="leg" style="--leg:var(--purple)">
			<h2>Bring the compiler</h2>
			<p>Three steps for Xcode. You can do them while the engine downloads.</p>
		</section>

		<Step n={6} slug="xcode" leg="purple" seg="xcode" title="Put Xcode 26.1.1 beside the one you have">
			<p>The App Store carries only the newest Xcode, and installing it replaces the one you had. For a specific version, go to Apple's developer downloads instead.</p>
			<ul>
				<li>Open <a href="https://developer.apple.com/download/all">developer.apple.com/download/all</a> and sign in with your Apple Account. The free account is enough.</li>
				<li>Search for <b>Xcode 26.1.1</b> and download the <code>.xip</code> file.</li>
				<li>Double-click the <code>.xip</code>. It expands into <code>Xcode.app</code> next to it, which takes a few minutes.</li>
			</ul>
			<p>Now move it somewhere with the version in its name. Two apps called <code>Xcode.app</code> cannot share a folder, and a name with a number in it tells you which one you are looking at.</p>
			<CodeBlock id="xcode-move" />
			<p class="side-note"><b>Any folder works.</b> I keep each Xcode in its own folder under <code>~/Developer/Xcode</code>. <code>/Applications/Xcode_26.1.1.app</code> is just as good. If you choose a different place, change the path in the next step to match.</p>
			<p class="note"><b>Do not open it by double-clicking yet.</b> The first launch wants to install extra components and asks for your password. Step 7 does that from the terminal, where you can see what happens.</p>
		</Step>

		<Step n={7} slug="select" leg="purple" seg="xcode" title="Decide who sees the new Xcode">
			<p>With two Xcodes on the Mac, something has to say which one a build uses. There are two ways to say it, and they reach different things.</p>
			<figure class="plate wide">
				<XcodeScope />
				<figcaption>Press each one. <code>DEVELOPER_DIR</code> is an environment variable, so it reaches only the terminal that set it and whatever that terminal starts. <code>xcode-select -s</code> changes the answer for the whole Mac.</figcaption>
			</figure>
			<p>If Unreal is the only reason this Mac has Xcode, switch the whole Mac and stop thinking about it:</p>
			<CodeBlock id="xcode-system" />
			<p>If other work on this Mac needs the newer Xcode, leave the default alone and set the variable in the terminal you use for the game. Add the same line to <code>~/.zshrc</code> only if you want it in every terminal.</p>
			<CodeBlock id="xcode-env" />
			<p>Whichever you chose, run the <code>export</code> line in this terminal now, because the next command reads it. Then let the new Xcode finish its own setup. This installs its extra packages and accepts its license in one go:</p>
			<CodeBlock id="xcode-first" />
			<p class="note ok"><b>You should see</b> <code>Xcode 26.1.1</code> on the first line of the last command.</p>
			<p class="note"><b>Why the long path after sudo?</b> <code>sudo</code> starts commands with a clean environment and does not pass <code>DEVELOPER_DIR</code> along. A plain <code>sudo xcodebuild</code> would quietly set up your default Xcode instead. Calling the copy of <code>xcodebuild</code> inside the new app leaves no doubt about which Xcode is being set up.</p>
		</Step>

		<Step n={8} slug="metal" leg="purple" seg="xcode" title="Download the Metal toolchain">
			<p>Metal is Apple's graphics system, and the engine compiles every shader for it. Since Xcode 26, the Metal compiler is no longer inside Xcode. It is a separate download, and each Xcode has its own. On my Mac, Xcode 26.5 had one and Xcode 27.0 did not.</p>
			<p>In the same terminal, so that it lands in the right Xcode:</p>
			<CodeBlock id="metal-get" />
			<p>Then ask the compiler for its version. It is the first thing Epic's staff asked for in a forum thread about a Metal failure, so it is worth knowing.</p>
			<CodeBlock id="metal-check" />
			<p>Without the toolchain, it fails like this. This is the real message from my Xcode 27.0:</p>
			<CodeBlock id="metal-missing" />
			<p>With it, the first line names a version. This is from my Xcode 26.5, so your numbers will differ:</p>
			<CodeBlock id="metal-ok" />
			<p class="side-note"><b>Prefer a window?</b> The same download is in Xcode under <b>Settings, Components</b>. Open the 26.1.1 app to get there, not your other one.</p>
		</Step>

		<section class="leg" style="--leg:var(--yellow)">
			<h2>Light it</h2>
			<p>Two steps: the first start, and what to do if it does not go.</p>
		</section>

		<Step n={9} slug="launch" leg="yellow" seg="ignition" title="Start the editor once">
			<p>How you start it follows from step 7.</p>
			<ul>
				<li><b>You switched the whole Mac.</b> Press <b>Launch</b> on the engine slot in the launcher.</li>
				<li><b>You set the variable in one terminal.</b> Start the editor from that terminal, so it inherits the variable:</li>
			</ul>
			<CodeBlock id="editor-run" />
			<p>Be patient with the first start. The editor compiles shaders before it shows anything useful, and the percentage on the splash screen can sit still for a long while. Later starts read from a cache and are much faster.</p>
			<p>When the project browser opens, make a project from any template. Choose <b>C++</b> rather than Blueprint if you want to prove the compiler as well: the editor will build the project's code with the Xcode you just installed before it opens the level.</p>
			<p class="note"><b>The Launch button and the variable.</b> An editor started from the launcher uses the Mac's default Xcode, whatever your terminal says. If you chose the variable in step 7, the terminal is your launch button.</p>
		</Step>

		<Step n={10} slug="trouble" leg="yellow" seg="ignition" title="If it does not start">
			<p>Work down this list in order. Each item is cheaper than the next.</p>
			<h4>Run the check</h4>
			<p>The script in the next section reads everything this guide set up. Most failures at this point are a missing Metal toolchain or the wrong Xcode being active, and it names both.</p>
			<h4>Let the launcher repair the engine</h4>
			<p>In the <b>Library</b> tab, open the menu on the engine slot and choose <b>Verify</b>. It checks every file and downloads again only what is missing or damaged.</p>
			<h4>Read what others found on macOS 26</h4>
			<p>These come from Epic's developer forum. I am passing them on, not vouching for them. They are other people's reports, and some of them disagree with each other.</p>
			<div class="scroll">
			<table class="need reports">
				<thead><tr><th>What happens</th><th>What was reported</th></tr></thead>
				<tbody>
					<tr>
						<td>The editor crashes as it opens, on macOS 26.5 or later</td>
						<td>One poster traced it to a change in macOS 26.5 that the engine's Metal shader converter did not expect. Starting with <code class="arg">-BindlessOff</code> got the editor open, at some cost in rendering speed. Posters disagree on whether the 5.8 release fixed it. <a href={FORUM_CRASH}>Thread</a></td>
					</tr>
					<tr>
						<td>The build tools reject your Xcode</td>
						<td>The engine keeps the Xcode versions it accepts in <code>Engine/Config/Apple/Apple_SDK.json</code>. In one case, Epic staff fixed a failure on macOS 26.0 by pointing to the newest copy of that file in Epic's source. Installing an Xcode inside the range, as step 6 did, needs no edits. <a href={FORUM_SDK}>Thread</a></td>
					</tr>
					<tr>
						<td>The start stalls at a low percentage</td>
						<td>An M5 owner got past it by allowing Unreal and the launcher in their antivirus software, then starting once with <code class="arg">-DisableAllPlugins</code>. That was engine 5.6 and 5.7. <a href={FORUM_STALL}>Thread</a></td>
					</tr>
				</tbody>
			</table>
			</div>
			<p>The two launch arguments go after the editor's path:</p>
			<CodeBlock id="trouble-args" />
			<p class="note"><b>Check the dates.</b> I read those threads in November 2026. Engines get hotfixes and macOS gets updates, so read the last few posts of each thread before you try anything from it.</p>
		</Step>

		<section class="leg" style="--leg:var(--cursor)" id="check">
			<h2>Check the whole pad</h2>
			<p>One script reads everything the ten steps set up. It changes nothing.</p>
		</section>
		<div class="col" style="margin-top:1em">
			<p>Save this as <code>preflight.zsh</code> and run it with <code>zsh preflight.zsh</code>, in the terminal you will build from. It follows <code>DEVELOPER_DIR</code>, so it reports on the Xcode that terminal would really use.</p>
			<CodeBlock id="preflight" />
			<p>This is what it printed on my Mac before step 3, with Xcode 27.0 active and no engine yet:</p>
			<CodeBlock id="preflight-out" />
			<p>A green tick means the row meets Epic's list. A yellow mark means the value is outside the list without being ruled out, and you decide. A red cross is something the steps above fix.</p>
			<p>After step 8, the engine, Xcode, and Metal rows should be green. On a Mac newer than Epic's list, the macOS row stays yellow, and that is the honest answer.</p>
			<h4>When the engine updates</h4>
			<p>The launcher will offer hotfixes for 5.8, and those are safe to take. A new engine version is different. It brings a new row on <a href={EPIC_REQUIREMENTS}>Epic's requirements page</a> and usually a new Xcode. Add it as a second slot, install its Xcode beside the others, and update the version numbers in the script.</p>
		</div>
	</main>

	<section class="clearing" aria-labelledby="end">
		<div>
			<h2 id="end">Go for launch</h2>
			<p class="say">Morning on the pad. The engine is in place, the compiler fits it, and the checklist has been read. The countdown is behind you. Go and make the game.</p>
		</div>
		<div class="readout" role="img" aria-label="Terminal output: Unreal Engine 5.8 with Xcode 26.1.1">
			<div><span class="p1">❯</span> zsh preflight.zsh</div>
			<div class="big">UE 5.8</div>
			<div class="big go2">Xcode 26.1.1</div>
		</div>
	</section>
	<footer>
		<div class="colophon">
		<p>Version numbers read in November 2026 from Epic's <a href={EPIC_REQUIREMENTS}>macOS requirements</a> and <a href={EPIC_INSTALL}>install</a> pages, for Unreal Engine 5.8. The command output on this page is from a 16-inch MacBook Pro with an M5 Max, running macOS 26.7. Forum reports belong to the people who posted them. This guide follows <a href={FIRST_GUIDE}>How to Setup Dream SWE Dev Environment on macOS</a>, by <a href="https://medium.com/@arunabhdas">Arunabh Das</a>. More on <a href="https://github.com/arunabhdas">GitHub</a>.</p>
		<p>Unreal Engine is a trademark of Epic Games, and Xcode and Metal are trademarks of Apple. No em-dashes were harmed in the making of this guide.</p>
		<p><button class="reset" type="button" onclick={() => progress.reset()}>Clear my progress</button></p>
		</div>
	</footer>
</div>
