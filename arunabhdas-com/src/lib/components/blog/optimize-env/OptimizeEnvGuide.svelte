<script lang="ts">
	/**
	 * How to Optimize Dev Env for Maximum Dev Productivity
	 * The fourth guide in the WezTerm window, set on a lake before sunrise: flat water,
	 * and nothing in the way of the stroke. Every value was read back from the Mac it
	 * describes, and the audit output on the page is that Mac's real output.
	 */
	import { onMount, setContext } from 'svelte';
	import CodeBlock from '../guide/CodeBlock.svelte';
	import Step from '../guide/Step.svelte';
	import StepTabs from '../guide/StepTabs.svelte';
	import Wall from '../guide/Wall.svelte';
	import { GUIDE_KEY, GuideProgress } from '../guide/progress.svelte';
	import DockDemo from './DockDemo.svelte';
	import ResolutionDemo from './ResolutionDemo.svelte';
	import SettingsPane, { type Row } from './SettingsPane.svelte';
	import blocks from './code-blocks.json';
	import '../guide/guide-base.css';
	import './optimize.css';
	import '../guide/guide-end.css';

	const tabs = [
		'scale',
		'monitor',
		'steady',
		'pointer',
		'gestures',
		'keys',
		'voice',
		'dock',
		'stage',
		'windows',
		'look',
		'menubar',
		'search',
		'quiet',
		'sound'
	];

	const progress = new GuideProgress('optimize-env:done');
	setContext(GUIDE_KEY, { progress, blocks, path: '~/tune' });

	onMount(() => progress.load());

	const FIRST_GUIDE = '/blog/how-to-setup-dream-swe-dev-environment-on-macos';

	const advancedRows: Row[] = [
		{ label: 'Show resolutions as list', kind: 'toggle', on: true, key: true },
		{
			label: 'Allow your pointer and keyboard to move between any nearby Mac or iPad',
			kind: 'toggle',
			on: true,
			key: true
		},
		{
			label: 'Push through the edge of a display to connect a nearby Mac or iPad',
			kind: 'toggle',
			on: true
		},
		{ label: 'Automatically reconnect to any nearby Mac or iPad', kind: 'toggle', on: true }
	];

	const steadyRows: Row[] = [
		{ label: 'Automatically adjust brightness', kind: 'toggle', on: false, key: true },
		{ label: 'True Tone', kind: 'toggle', on: false, key: true },
		{ label: 'Preset', kind: 'value', value: 'Apple XDR Display (P3-1600 nits)' },
		{ label: 'Refresh rate', kind: 'value', value: 'ProMotion' }
	];

	const pointerRows: Row[] = [
		{ label: 'Tracking speed', kind: 'slider', at: 1, ends: ['Slow', 'Fast'], says: 'Fastest', key: true },
		{ label: 'Click', kind: 'slider', at: 0, ends: ['Light', 'Firm'], says: 'Light', key: true },
		{ label: 'Force Click and haptic feedback', kind: 'toggle', on: true },
		{ label: 'Look up & data detectors', kind: 'value', value: 'Off', key: true },
		{ label: 'Secondary click', kind: 'value', value: 'Click or Tap with Two Fingers' },
		{ label: 'Tap to click', hint: 'Tap with one finger', kind: 'toggle', on: true, key: true }
	];

	const gestureRows: Row[] = [
		{ label: 'Swipe between pages', kind: 'value', value: 'Scroll Left or Right with Two Fingers' },
		{
			label: 'Swipe between full-screen applications',
			kind: 'value',
			value: 'Swipe Left or Right with Four Fingers',
			key: true
		},
		{ label: 'Notification Center', hint: 'Swipe left from the right edge with two fingers', kind: 'toggle', on: true },
		{ label: 'Mission Control', kind: 'value', value: 'Swipe Up with Four Fingers', key: true },
		{ label: 'App Exposé', kind: 'value', value: 'Off' },
		{ label: 'Show Desktop', hint: 'Spread with thumb and three fingers', kind: 'toggle', on: true }
	];

	const keyRows: Row[] = [
		{
			label: 'Key repeat rate',
			kind: 'slider',
			at: 0.14,
			ends: ['Off', 'Fast'],
			says: 'Parked near Slow',
			key: true
		},
		{ label: 'Delay until repeat', kind: 'slider', at: 1, ends: ['Long', 'Short'], says: 'Shortest', key: true },
		{ label: 'Adjust keyboard brightness in low light', kind: 'toggle', on: true },
		{ label: 'Turn keyboard backlight off after inactivity', kind: 'value', value: 'Never' },
		{ label: 'Press 🌐 key to', kind: 'value', value: 'Show Emoji & Symbols' }
	];

	const voiceRows: Row[] = [
		{ label: 'Dictation', kind: 'toggle', on: true, key: true },
		{ label: 'Microphone source', kind: 'value', value: 'MacBook Pro Microphone' },
		{ label: 'Shortcut', kind: 'value', value: 'Press Either Command Key Twice', key: true },
		{ label: 'Auto-punctuation', kind: 'toggle', on: true }
	];

	const dockRows: Row[] = [
		{ label: 'Size', kind: 'slider', at: 0, ends: ['Small', 'Large'], says: 'Smallest', key: true },
		{ label: 'Magnification', kind: 'slider', at: 1, ends: ['Off', 'Large'], says: 'Largest', key: true },
		{ label: 'Dock position on screen', kind: 'value', value: 'Bottom' },
		{ label: 'Automatically hide and show the Dock', kind: 'toggle', on: false, key: true },
		{ label: 'Show indicators for open applications', kind: 'toggle', on: true },
		{ label: 'Show suggested and recent apps in Dock', kind: 'toggle', on: true }
	];

	const stageRows: Row[] = [
		{ label: 'Stage Manager', kind: 'toggle', on: true, key: true },
		{ label: 'Show recent apps in Stage Manager', kind: 'toggle', on: true },
		{ label: 'Show windows from an application', kind: 'value', value: 'All at Once', key: true },
		{ label: 'Click wallpaper to show desktop', kind: 'value', value: 'Always' },
		{ label: 'Show items', kind: 'value', value: 'On Desktop and in Stage Manager' },
		{ label: 'Show Widgets', kind: 'value', value: 'On Desktop and in Stage Manager' }
	];

	const windowRows: Row[] = [
		{ label: 'Prefer tabs when opening documents', kind: 'value', value: 'Never', key: true },
		{ label: 'Ask to keep changes when closing documents', kind: 'toggle', on: false },
		{ label: 'Close windows when quitting an application', kind: 'toggle', on: true, key: true },
		{ label: 'Tiled windows have margins', kind: 'toggle', on: false, key: true },
		{ label: 'Window title bar double-click action', kind: 'value', value: 'Zoom' },
		{ label: 'Default web browser', kind: 'value', value: 'Google Chrome' }
	];

	const lookRows: Row[] = [
		{ label: 'Appearance', kind: 'value', value: 'Dark', key: true },
		{ label: 'Liquid Glass', kind: 'value', value: 'Clear' },
		{ label: 'Color', kind: 'value', value: 'Multicolor' },
		{ label: 'Tint window background with wallpaper color', kind: 'toggle', on: true },
		{ label: 'Show scroll bars', kind: 'value', value: 'When scrolling', key: true },
		{ label: 'Click in the scroll bar to', kind: 'value', value: 'Jump to the next page' }
	];

	const menuRows: Row[] = [
		{ label: 'Automatically hide and show the menu bar', kind: 'value', value: 'In Full Screen Only', key: true },
		{ label: 'Show menu bar background', kind: 'toggle', on: true },
		{ label: 'Recent documents, applications, and servers', kind: 'value', value: '10' }
	];

	const searchRows: Row[] = [
		{ label: 'Show Related Content', kind: 'toggle', on: false, key: true },
		{ label: 'Help Apple Improve Search', kind: 'toggle', on: false, key: true },
		{ label: 'Results from Apps', kind: 'value', value: 'On for every app' }
	];

	const quietRows: Row[] = [
		{ label: 'Show previews', kind: 'value', value: 'When Unlocked' },
		{ label: 'Show notifications when display is sleeping', kind: 'toggle', on: false },
		{ label: 'Show notifications when screen is locked', kind: 'toggle', on: false, key: true },
		{
			label: 'Show notifications when mirroring or sharing the display',
			kind: 'value',
			value: 'Notifications Off',
			key: true
		},
		{ label: 'Allow notifications from iPhone', kind: 'value', value: 'Off', key: true }
	];

	const soundRows: Row[] = [
		{ label: 'Output', kind: 'value', value: 'The monitor, over USB', key: true },
		{ label: 'Input', kind: 'value', value: 'The monitor, over USB', key: true },
		{ label: 'Play sound effects through', kind: 'value', value: 'The monitor' },
		{ label: 'Alert sound', kind: 'value', value: 'Boop' },
		{ label: 'Play user interface sound effects', kind: 'toggle', on: true },
		{ label: 'Play feedback when volume is changed', kind: 'toggle', on: false, key: true }
	];
</script>

<div class="blog-guide optimize-env">
	<a class="skip" href="#guide">Skip to the guide</a>
	<Wall />

	<StepTabs {progress} {tabs} />

	<header class="hero">
		<div class="shellline" aria-hidden="true">
			<div class="r1"><span class="f">╭─</span><span class="pth">~/macos-env-setup/<b>tune</b></span><span class="br">main</span><span class="fill"></span><span class="f">─╮</span></div>
			<div class="r2"><span class="f">╰─❯</span><span><span class="typed">zsh audit.zsh</span><span class="blk"></span></span></div>
		</div>
		<div>
			<h1><span>How to Optimize</span><span>Dev Env for</span><span>Maximum Dev</span><span>Productivity</span></h1>
			<p class="lede">Fifteen stops in System Settings that give a Mac more room, a faster pointer, and fewer interruptions. Nothing to install. Every value is the one on my own machine, with a script at the end to check yours against it.</p>
			<p class="byline"><a class="start" href="#guide">Push off</a><span>By <a href="https://medium.com/@arunabhdas">Arunabh Das</a></span></p>
		</div>
	</header>

	<main class="window" id="guide">
		<div class="intro">
			<div>
				<h2>The tools are built. Now tune the machine.</h2>
				<p>The <a href={FIRST_GUIDE}>first guide in this series</a> installed the tools: a terminal, a shell, an editor, and a herd of agents. This one tunes the Mac underneath them. It is fifteen visits to System Settings, and each one removes a wait, a reach, or an interruption.</p>
				<p>Think of crossing a lake before sunrise. On flat water every stroke carries. Most of what slows a working day is chop: a pointer that takes three swipes, a window that opened as a tab, a banner that slid in while you were sharing your screen.</p>
				<p class="creed">Flatten the water first. Then paddle.</p>
				<dl class="dest">
					<dt>room</dt><dd>1.85 times the desktop, on the same two screens</dd>
					<dt>pointer</dt><dd>Edge to edge in one swipe, and a click that takes no force</dd>
					<dt>keys</dt><dd>A key repeat one notch faster than the slider allows</dd>
					<dt>voice</dt><dd>Dictation on a double tap of Command, for talking to agents</dd>
					<dt>windows</dt><dd>A 16-point Dock, Stage Manager, and no surprise tabs</dd>
					<dt>attention</dt><dd>Nothing lights up while you present or step away</dd>
				</dl>
			</div>
			<div>
				<h2>Four rules for the crossing</h2>
				<ol class="rules">
					<li><b>Spend pixels on room.</b> A Retina panel has more pixels than it needs to look sharp. Trade a little sharpness you will not miss for space you will use all day.</li>
					<li><b>Move less.</b> Fastest pointer, lightest click, shortest delay. Each decision should cost your hands as little as it can.</li>
					<li><b>Nothing changes on its own.</b> Brightness, color, and window layout stay where you put them.</li>
					<li><b>Quiet by default.</b> A notification has to earn the screen. Most do not.</li>
				</ol>
				<p>These are my settings, read off a 16-inch MacBook Pro and a 4K monitor on macOS 26. Your eyes and hands are not mine, so where a setting is a matter of eyesight or taste, the step says so. In each settings panel below, a green bar marks the rows that step is about.</p>
				<p>Tick each step as you finish it. Your progress stays in this browser, and the tab bar keeps count.</p>
			</div>
		</div>

		<section class="leg" style="--leg:var(--cyan)">
			<h2>Make more room</h2>
			<p>Three steps, all in Displays. This is the biggest win in the guide, and it costs nothing.</p>
		</section>

		<Step n={1} slug="scale" leg="cyan" seg="displays" title="Trade sharpness you can't see for room you can">
			<p>A 16-inch MacBook Pro has a 3456 × 2234 panel. Out of the box, macOS draws a 1728 × 1117 desktop on it: exactly two pixels per point each way. Text is as sharp as the panel can make it, and you get the workspace of a much smaller laptop.</p>
			<p>Open <b>System Settings, Displays</b>, select the built-in display, and pick <b>2056 × 1329</b>. If you see thumbnails where the numbers should be, click <b>Advanced</b> and turn on <b>Show resolutions as list</b> first.</p>
			<figure class="plate wide">
				<ResolutionDemo />
				<figcaption>The glass never changes size. What changes is how many points macOS lays across it. Columns assume the 15-point JetBrains Mono from the first guide, which is 9 points to a character, and a full pane is 100 columns.</figcaption>
			</figure>
			<p>That is 42 percent more desktop on the same screen. macOS draws the picture at 4112 × 2658 and scales it down to the panel, so edges stay smooth. Text also gets smaller, to about 84 percent of its default size.</p>
			<p class="note"><b>Your eyes decide.</b> If you catch yourself leaning toward the screen, go back to the default. A resolution you squint at costs more than the room it gives. Settings also warns that "Using a scaled resolution may affect performance." That is the price of drawing the larger picture first.</p>
			<p>Check what you ended up with. This prints each screen in points:</p>
			<CodeBlock id="screens-check" />
			<CodeBlock id="screens-out" />
		</Step>

		<Step n={2} slug="monitor" leg="cyan" seg="displays" title="Run the 4K monitor at 2880 × 1620">
			<p>The same trade pays better on an external monitor, because its default wastes more. A 3840 × 2160 panel starts out showing a 1920 × 1080 desktop. That is very sharp and very cramped.</p>
			<p>Select the monitor in <b>Displays</b> and pick <b>2880 × 1620</b>. Use the demo in step 1 to see the other choices: switch it to the external display.</p>
			<div class="scroll">
			<table class="need">
				<thead><tr><th>Display</th><th>Default</th><th>Mine</th><th>Room</th><th>Text size</th></tr></thead>
				<tbody>
					<tr><td>Built-in, 16-inch</td><td class="num">1728 × 1117</td><td class="num">2056 × 1329</td><td class="good">1.42×</td><td class="num">84%</td></tr>
					<tr><td>External, 4K</td><td class="num">1920 × 1080</td><td class="num">2880 × 1620</td><td class="good">2.25×</td><td class="num">67%</td></tr>
					<tr><td>Both together</td><td class="num">4.0 million points</td><td class="num">7.4 million points</td><td class="good">1.85×</td><td></td></tr>
				</tbody>
			</table>
			</div>
			<p>You can see the scaling happen. For the monitor, macOS reports the picture it draws and the size it looks like:</p>
			<CodeBlock id="backing-check" />
			<CodeBlock id="backing-out" />
			<p class="note"><b>Two thirds is a real cut.</b> Text on the monitor is now 67 percent of its default size. That works because a monitor is large and sits farther back than a laptop. If yours is small or close, try 2560 × 1440 first, which is 1.78 times the default room.</p>
			<p>Two more things in the same pane. Keep the laptop as <b>Main display</b> and set the monitor to <b>Extended display</b>, never mirrored, since mirroring shows one desktop twice. Then open <b>Advanced</b>:</p>
			<figure class="plate">
				<SettingsPane title="Displays › Advanced" rows={advancedRows} />
				<figcaption>The three switches under "Link to Mac or iPad" are Universal Control. Push the pointer through the edge of a display and it carries on to a nearby Mac or iPad signed in to your account, with your keyboard following.</figcaption>
			</figure>
			<p class="side-note"><b>Want it scripted?</b> Settings keeps resolutions out of reach of <code>defaults</code>. The <code>displayplacer</code> tool can set them. Arrange things by hand once, and <code>displayplacer list</code> prints the command that restores that exact layout.</p>
			<CodeBlock id="displayplacer" />
		</Step>

		<Step n={3} slug="steady" leg="cyan" seg="displays" title="Stop the picture from changing under you">
			<p>Two features adjust the screen while you work: one follows the light in the room, the other shifts white toward the color of that light. Both are pleasant for reading and unhelpful when you are judging a color, a contrast ratio, or a screenshot.</p>
			<p>In <b>Displays</b>, with the built-in display selected, turn off <b>Automatically adjust brightness</b> and <b>True Tone</b>. Leave the preset and refresh rate where they are. Then select the monitor and turn off its <b>Automatically adjust brightness</b> too.</p>
			<figure class="plate">
				<SettingsPane title="Displays › Built-in Display" rows={steadyRows} />
				<figcaption>Brightness is now a thing you set, with the keys or the Display item in the menu bar. It stays put.</figcaption>
			</figure>
			<div class="note">
				<p><b>The cost is real.</b> Settings puts a warning under the switch: "Energy usage may be higher when your display does not automatically adjust. Display and battery performance may also be reduced over time when this is turned off." Plugged in at a desk, I take that trade. If you live on battery, you may not want to.</p>
			</div>
		</Step>

		<section class="leg" style="--leg:var(--green)">
			<h2>Keep your hands still</h2>
			<p>Four steps for the trackpad, the keys, and your voice.</p>
		</section>

		<Step n={4} slug="pointer" leg="green" seg="trackpad" title="Cross the desk in one swipe">
			<p>You just made the desktop 1.85 times larger. The pointer now has farther to go, and at the stock speed that means lifting and re-placing your finger to get from one screen to the other.</p>
			<p>Open <b>Trackpad, Point &amp; Click</b>. Drag <b>Tracking speed</b> all the way to Fast and <b>Click</b> all the way to Light. Turn on <b>Tap to click</b>, and set <b>Look up &amp; data detectors</b> to Off.</p>
			<figure class="plate">
				<SettingsPane title="Trackpad › Point & Click" rows={pointerRows} />
				<figcaption>Both sliders sit at an end stop. Force Click stays on, so Quick Look with a firm press still works in Finder.</figcaption>
			</figure>
			<ul>
				<li><b>Light click</b> is the least force the trackpad will accept. You click thousands of times a day.</li>
				<li><b>Tap to click</b> removes the press altogether for most of them.</li>
				<li><b>Look up off</b> stops a slightly firm press on a word from opening the dictionary over your code.</li>
			</ul>
			<p class="note"><b>Give it two days.</b> The fastest tracking speed overshoots at first. Your hand adapts, and after that the slower setting feels like dragging the pointer through sand.</p>
			<p>The same settings from a terminal. Trackpad keys are read at login, so log out and back in after writing them.</p>
			<CodeBlock id="trackpad-write" />
		</Step>

		<Step n={5} slug="gestures" leg="green" seg="trackpad" title="Drag with three fingers, switch with four">
			<p>Dragging is the slowest thing a trackpad does. You press, hold the press, move, and hope you do not let go halfway. Three-finger drag removes the press: rest three fingers on a title bar or a selection, move, and it comes with you.</p>
			<p>This one lives in a different place. Open <b>Accessibility, Pointer Control, Trackpad Options</b>, turn on <b>Use trackpad for dragging</b>, and set the dragging style to <b>Three Finger Drag</b>.</p>
			<p>Three fingers are now taken, so macOS moves its own swipes to four. <b>Trackpad, More Gestures</b> shows the result:</p>
			<figure class="plate">
				<SettingsPane title="Trackpad › More Gestures" rows={gestureRows} />
			</figure>
			<p>That leaves one job per finger count, which is easy to remember:</p>
			<figure class="plate wide">
				<ul class="fingers">
					<li><span class="tips" aria-hidden="true"><i></i></span><b>One finger</b><span>Tap to click. No press.</span></li>
					<li><span class="tips" aria-hidden="true"><i></i><i></i></span><b>Two fingers</b><span>Scroll. Tap for a right click. Swipe sideways to go back or forward. Pinch to zoom.</span></li>
					<li class="on"><span class="tips" aria-hidden="true"><i></i><i></i><i></i></span><b>Three fingers</b><span>Drag windows, selections, and files.</span></li>
					<li class="on"><span class="tips" aria-hidden="true"><i></i><i></i><i></i><i></i></span><b>Four fingers</b><span>Up for Mission Control. Sideways for the next full-screen app or Space.</span></li>
					<li><span class="tips" aria-hidden="true"><i class="thumb"></i><i></i><i></i><i></i></span><b>Thumb and three</b><span>Spread to show the desktop.</span></li>
				</ul>
				<figcaption>Under <b>Scroll &amp; Zoom</b>, all four switches stay on: natural scrolling, pinch to zoom, smart zoom, and rotate.</figcaption>
			</figure>
			<p>From a terminal, the same change looks like this. Of everything in this guide, these are the keys macOS is most likely to ignore until the next login, so confirm them in Settings.</p>
			<CodeBlock id="gestures-write" />
		</Step>

		<Step n={6} slug="keys" leg="green" seg="keyboard" title="Push key repeat past the slider">
			<p>The first guide set key repeat to the fastest value System Settings offers. There is one more notch, and Settings cannot reach it.</p>
			<p>In <b>Keyboard</b>, drag <b>Delay until repeat</b> to Short. Then set the repeat rate from a terminal:</p>
			<CodeBlock id="keys-write" />
			<p>Both values count in 15 millisecond ticks. The slider stops at 2. A value of 1 repeats twice as fast.</p>
			<div class="scroll">
			<table class="need">
				<thead><tr><th>Setup</th><th>Delay</th><th>Then every</th><th>Held for one second</th></tr></thead>
				<tbody>
					<tr><td>Stock macOS</td><td class="num">375 ms</td><td class="num">90 ms</td><td class="num">8 characters</td></tr>
					<tr><td>Fastest in Settings</td><td class="num">225 ms</td><td class="num">30 ms</td><td class="num">27 characters</td></tr>
					<tr><td>This step</td><td class="num">225 ms</td><td class="num">15 ms</td><td class="good">53 characters</td></tr>
				</tbody>
			</table>
			</div>
			<p>The <a href={`${FIRST_GUIDE}#s12`}>first guide has a demo</a> you can hold down to feel the first two rows. This step is the third.</p>
			<figure class="plate">
				<SettingsPane title="Keyboard" rows={keyRows} />
				<figcaption>The slider has no notch for 1, so on my Mac it parks near Slow. It is wrong. Do not drag it to fix it, or you will write a slower value over the fast one.</figcaption>
			</figure>
			<p>Trust the number, not the picture:</p>
			<CodeBlock id="keys-check" />
			<CodeBlock id="keys-out" />
			<p>Log out and back in for the new rate to apply. The third line of the write turns off the accent popup that appears when you hold a letter, because that popup is what stops <kbd>j</kbd> from repeating in some apps. The rest of the pane is small comforts: the 🌐 key opens emoji and symbols, and the backlight never times out in a dark room.</p>
		</Step>

		<Step n={7} slug="voice" leg="green" seg="keyboard" title="Talk to your agents">
			<p>A prompt for a coding agent is a paragraph, not a command. Most people can say a paragraph faster than they can type it, and they include more context when they do.</p>
			<p>Scroll down in <b>Keyboard</b> to <b>Dictation</b>. Turn it on, set the shortcut to <b>Press Either Command Key Twice</b>, and leave <b>Auto-punctuation</b> on.</p>
			<figure class="plate">
				<SettingsPane title="Keyboard › Dictation" rows={voiceRows} />
				<figcaption>The microphone is pinned to the laptop's own. Dictation then works the same at the desk and on the couch, whatever is plugged in.</figcaption>
			</figure>
			<p>Now double-tap <kbd>Cmd</kbd> in any text field: a terminal pane, an editor, a chat box. Speak, then press the shortcut again or <kbd>Esc</kbd> to stop. Both thumbs already rest next to a Command key, so the shortcut costs nothing.</p>
			<p class="note"><b>Read the fine print.</b> The pane says: "Dictation processes many voice inputs on your Mac. Information will be sent to Apple in some cases." If you work under an NDA, open "About Ask Siri, Dictation &amp; Privacy" before you turn this on.</p>
			<p>One pane up, in <b>Apple Intelligence &amp; Siri</b>, Siri is off and Apple Intelligence is not turned on. My assistants live in the terminal, so the system one stays out of the menu bar and off the microphone.</p>
		</Step>

		<section class="leg" style="--leg:var(--purple)">
			<h2>Arrange the room</h2>
			<p>Four steps for the Dock, your windows, and the look of the place.</p>
		</section>

		<Step n={8} slug="dock" leg="purple" seg="dock" title="Shrink the Dock to a sliver that grows when you reach">
			<p>The usual advice is to hide the Dock. That saves space, and it costs a pause every time you want it back. You also lose the row of dots that tells you what is running.</p>
			<p>I do the opposite. In <b>Desktop &amp; Dock</b>, drag <b>Size</b> all the way to Small and <b>Magnification</b> all the way to Large, and leave <b>Automatically hide and show the Dock</b> off.</p>
			<figure class="plate wide">
				<DockDemo />
				<figcaption>Move the pointer across it. At rest the icons are 16 points, small enough to ignore. Under the pointer they grow toward 128, large enough to hit without aiming.</figcaption>
			</figure>
			<figure class="plate">
				<SettingsPane title="Desktop & Dock › Dock" rows={dockRows} />
			</figure>
			<p>The Dock is always there and always in the same place, and it takes a strip of the screen about as thin as the menu bar.</p>
			<CodeBlock id="dock-write" />
		</Step>

		<Step n={9} slug="stage" leg="purple" seg="windows" title="Let Stage Manager hold what you are not using">
			<p>With this much room, the problem stops being space and becomes clutter. Stage Manager keeps the app you are working in at the center and parks everything else in a strip down the left edge. One click swaps them.</p>
			<figure class="plate wide">
				<div class="stagefig" role="img" aria-label="A desktop with two terminal windows grouped in the center and four other apps parked in a strip on the left">
					<div class="strip"><span>Browser</span><span>Simulator</span><span>Notes</span><span>Chat</span></div>
					<div class="centre">
						<div class="w w1"><b>Terminal: agents</b><span class="g">●</span> claude working<br><span class="d">Edit</span> internal/health.go<br><span class="d">Bash</span> go test ./...</div>
						<div class="w w2"><b>Terminal: editor</b><span class="p">func</span> <span class="c">main</span>() &#123;<br>&nbsp;&nbsp;mux := http.NewServeMux()<br>&#125;</div>
					</div>
				</div>
				<figcaption>"All at Once" is the setting that matters. Click an app in the strip and every one of its windows comes forward together, so two terminals stay a pair.</figcaption>
			</figure>
			<p>In <b>Desktop &amp; Dock</b>, under <b>Desktop &amp; Stage Manager</b>:</p>
			<figure class="plate">
				<SettingsPane title="Desktop & Dock › Stage Manager" rows={stageRows} />
			</figure>
			<p class="note"><b>This one divides people.</b> Stage Manager changes how you switch between apps, and some never take to it. Give it a week. If it still feels like being managed, turn it off and keep everything else in this guide.</p>
			<CodeBlock id="stage-write" />
		</Step>

		<Step n={10} slug="windows" leg="purple" seg="windows" title="Make windows predictable">
			<p>Further down the same pane is a short <b>Windows</b> section. Each row answers the question "where did my window go?" before you have to ask it.</p>
			<figure class="plate">
				<SettingsPane title="Desktop & Dock › Windows" rows={windowRows} />
			</figure>
			<ul>
				<li><b>Never prefer tabs.</b> A new document is a new window, and a window is something Stage Manager, Mission Control, and <kbd>Cmd</kbd> <kbd>`</kbd> can all see. A tab is hidden inside one.</li>
				<li><b>Close windows when quitting.</b> In the pane's own words, "open documents and windows will not be restored when you re-open an application." Every app starts clean.</li>
				<li><b>No margins on tiled windows.</b> Two windows tiled side by side meet edge to edge, with no strip of wallpaper between them.</li>
				<li><b>Default browser.</b> Pick the one whose developer tools you live in, so links clicked in the terminal open there. Mine is Chrome.</li>
			</ul>
			<CodeBlock id="windows-write" />
		</Step>

		<Step n={11} slug="look" leg="purple" seg="appearance" title="Pick the look once">
			<p>Rule three again: nothing changes on its own. In <b>Appearance</b>, choose <b>Dark</b>, not Auto, so the whole interface does not flip at sunset while you are halfway through a diff.</p>
			<figure class="plate">
				<SettingsPane title="Appearance" rows={lookRows} />
				<figcaption>Scroll bars appear only while you scroll, so they never cover the last column of a narrow pane.</figcaption>
			</figure>
			<p>Then open <b>Wallpaper</b>. Choose something dark and still, and turn on <b>Show on all Spaces</b>. Mine is Sequoia Night. The terminal from the first guide is 80 percent opaque, so the wallpaper is always faintly behind your code. A dark, low-contrast picture keeps the text readable, and the same picture everywhere means switching Spaces never flashes.</p>
			<CodeBlock id="look-write" />
		</Step>

		<section class="leg" style="--leg:var(--yellow)">
			<h2>Guard your attention</h2>
			<p>The last four steps mostly turn things off.</p>
		</section>

		<Step n={12} slug="menubar" leg="yellow" seg="menu bar" title="Keep the menu bar for things that change">
			<p>The menu bar is the one strip of screen you see all day. In the <b>Menu Bar</b> pane, every control gets one of three answers.</p>
			<figure class="plate wide">
				<div class="mbar">
					<div class="always"><b>Always there</b><ul><li>Clock</li><li>Spotlight</li><li>Wi-Fi</li><li>Bluetooth</li><li>Battery</li><li>AirDrop</li><li>Screen Mirroring</li><li>Display</li><li>Sound</li></ul></div>
					<div class="active"><b>Only when active</b><ul><li>Focus</li><li>Now Playing</li><li>Timer</li></ul></div>
					<div class="never"><b>Off</b><ul><li>Siri</li><li>Fast User Switching</li><li>Text Input</li><li>Time Machine</li><li>Keyboard Brightness</li><li>Weather</li></ul></div>
				</div>
				<figcaption>Status you check stays. Status that only matters while it is happening shows up only then. Everything else is one click away in Control Center.</figcaption>
			</figure>
			<figure class="plate">
				<SettingsPane title="Menu Bar" rows={menuRows} />
				<figcaption>The bar hides only in full screen. On the desktop it stays put, because a clock that slides away is a clock you have to go looking for.</figcaption>
			</figure>
			<p>Scroll to <b>Allow in the Menu Bar</b>. It lists every app that has asked for a slot. Mine is the working set: WezTerm, Docker, JetBrains Toolbox, Claude, ChatGPT, Cursor, Antigravity, Loom, Screen Studio, Vysor, and Zoom. Switch off any you never click. Know what the switch does first: "Turning off a menu bar item will prevent it from ever appearing in the menu bar."</p>
		</Step>

		<Step n={13} slug="search" leg="yellow" seg="spotlight" title="Keep search about your own Mac">
			<p>Spotlight should find your apps and your files. In the <b>Spotlight</b> pane, two switches add something else, and both are off.</p>
			<figure class="plate">
				<SettingsPane title="Spotlight" rows={searchRows} />
			</figure>
			<ul>
				<li><b>Show Related Content</b> is described as "Allow content from Apple partners to be shown when searching or when looking up text or objects and photos."</li>
				<li><b>Help Apple Improve Search</b> works by "allowing Apple to store your Safari, Siri, Spotlight, Lookup, and #images search queries."</li>
			</ul>
			<p>Under <b>Results from Apps</b>, leave on the apps you want to search inside. I leave them all on. The list is cheap to trim later, when a result you never want keeps showing up first.</p>
		</Step>

		<Step n={14} slug="quiet" leg="yellow" seg="notifications" title="Let nothing interrupt a screen share">
			<p>A banner that slides in while you are presenting is the one mistake on this page you cannot take back. In <b>Notifications</b>, the top section decides when anything is allowed to appear at all.</p>
			<figure class="plate">
				<SettingsPane title="Notifications › Notification Center" rows={quietRows} />
			</figure>
			<ul>
				<li><b>Mirroring or sharing: off.</b> Demos, calls, and screen recordings stay clean without you remembering to turn on a Focus first.</li>
				<li><b>Locked or asleep: off.</b> Nothing readable sits on the screen while you are away from the desk.</li>
				<li><b>iPhone notifications: off.</b> The phone already buzzes. The Mac does not need to say it again.</li>
			</ul>
			<p>Then walk down <b>Application Notifications</b> and give each app the least it needs. On mine, the IDEs, Docker, and Claude keep their banners, because a finished build or a waiting agent is worth a glance. Arc and ChatGPT are down to badges and sounds. Books is off.</p>
		</Step>

		<Step n={15} slug="sound" leg="yellow" seg="sound" title="One cable for sound, in and out">
			<p>The monitor connects with a single cable, and its speakers and microphone come along as a USB audio device. In <b>Sound</b>, point output, input, and sound effects at it.</p>
			<figure class="plate">
				<SettingsPane title="Sound" rows={soundRows} />
				<figcaption>Unplug the cable and macOS falls back to the laptop's own speakers and microphone. Plug it in again and the desk setup returns.</figcaption>
			</figure>
			<p>The one switch I turn off is <b>Play feedback when volume is changed</b>. Turning the volume down in a quiet room should not make a noise. Interface sounds stay on, since an alert sound is how you learn a command failed while you were looking at the other screen.</p>
		</Step>

		<section class="leg" style="--leg:var(--cursor)" id="check">
			<h2>Check the whole crossing</h2>
			<p>One script reads every value this guide can read. It changes nothing.</p>
		</section>
		<div class="col" style="margin-top:1em">
			<p>Save this as <code>audit.zsh</code>, next to the dotfiles from the first guide, and run it with <code>zsh audit.zsh</code>. A green tick means your Mac matches mine. A yellow mark is not an error. It shows your value, and you decide whether that is a difference you want.</p>
			<CodeBlock id="audit" />
			<p>This is what it prints on the machine this guide was written from:</p>
			<CodeBlock id="audit-out" />
			<p>And here is every write from the steps above in one file, for the next Mac.</p>
			<CodeBlock id="tune" />
			<div class="note">
				<p><b>Treat tune.zsh as a starting point.</b> Every value in it was read back from this Mac, key by key. I have not run it on a factory-fresh machine, because mine is already set. macOS reads the trackpad keys only at login and sometimes ignores them, so let <code>audit.zsh</code> and System Settings tell you what took. Any line can be undone with <code>defaults delete</code>, for example <code>defaults delete -g KeyRepeat</code>.</p>
			</div>
			<h4>What no script reaches</h4>
			<p>Display resolutions, True Tone, the menu bar, Spotlight, notifications, Dictation, and the sound devices all live where <code>defaults</code> cannot safely write. That is steps 1 to 3, 7, and 12 to 15. On a new Mac they take about ten minutes by hand, with this page open beside System Settings.</p>
		</div>
	</main>

	<section class="clearing" aria-labelledby="end">
		<div>
			<h2 id="end">The far shore</h2>
			<p class="say">Sunrise, flat water, and a machine that stays out of your way. You bought the room and the quiet. Now spend them on something.</p>
		</div>
		<div class="readout" role="img" aria-label="Terminal output: 1.85 times the room, 15 milliseconds a key">
			<div><span class="p1">❯</span> zsh audit.zsh</div>
			<div class="big">1.85× the room</div>
			<div class="big go2">15 ms a key</div>
		</div>
	</section>
	<footer>
		<div class="colophon">
		<p>Settings read in November 2026 from a 16-inch MacBook Pro with an M5 Max, running macOS 26.7, beside a 4K LG UltraFine. The command output on this page is that machine's own. This guide follows <a href={FIRST_GUIDE}>How to Setup Dream SWE Dev Environment on macOS</a>, by <a href="https://medium.com/@arunabhdas">Arunabh Das</a>. More on <a href="https://github.com/arunabhdas">GitHub</a>.</p>
		<p>Apple renames a settings pane most years. No em-dashes were harmed in the making of this guide.</p>
		<p><button class="reset" type="button" onclick={() => progress.reset()}>Clear my progress</button></p>
		</div>
	</footer>
</div>
