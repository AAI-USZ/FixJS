function installCore (x) {
		function getOverTextMarker (cnt, font, forecolor, backcolor) {
			var result = '';
			var canvas = cnt.appendChild(document.createElement('canvas'));
			try {
				canvas.height = lineHeight;
				var ctx = canvas.getContext('2d');
				ctx.font = font;
				canvas.width = ctx.measureText('~').width;
				ctx.fillStyle = backcolor;
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				ctx.fillStyle = forecolor;
				ctx.textBaseline = 'top';
				ctx.textAlign = 'left';
				ctx.fillText('~', 0, 0);
				result = canvas.toDataURL('image/png');
			}
			finally {
				canvas.parentNode.removeChild(canvas);
			}
			return result;
		}

		// hack for opera: ensure repaint
		if (window.opera) {
			window.scrollBy(0, 1);
			window.scrollBy(0, -1);
		}

		/*
		 * DOM structure:
		 *
		 * style#wasavi_global_styles [style sheet]
		 *
		 * div#wasavi_container
		 *   |
		 *   + div#wasavi_editor [main editor screen] [POSITIONING TARGET]
		 *   |
		 *   + div#wasavi_footer [POSITIONING TARGET]
		 *   |   |
		 *   |   + div#wasavi_footer_modeline
		 *   |   |   |
		 *   |   |   + table#wasavi_footer_modeline_table
		 *   |   |       |
		 *   |   |       + tbody
		 *   |   |         |
		 *   |   |         + tr
		 *   |   |             |
		 *   |   |             + td#wasavi_footer_file_indicator [file name indicator]
		 *   |   |             |
		 *   |   |             + td#wasavi_footer_prefix_indicator [prefix input indicator]
		 *   |   |
		 *   |   + div#wasavi_footer_alter
		 *   |       |
		 *   |       + table#wasavi_footer_alter_table
		 *   |           |
		 *   |           + tbody
		 *   |             |
		 *   |             + tr
		 *   |                 |
		 *   |                 + td#wasavi_footer_input_indicator [header indicator]
		 *   |                 |
		 *   |                 + td#wasavi_footer_input_container
		 *   |                     |
		 *   |                     + input#wasavi_footer_input [line input editor]
		 *   |
		 *   + div#wasavi_console_container [POSITIONING TARGET]
		 *   |   |
		 *   |   + textarea#wasavi_console
		 *   |
		 *   + div#wasavi_multiline_scaler
		 *   |
		 *   + span#wasavi_singleline_scaler
		 *   |
		 *   + div#wasavi_console_scaler
		 *   |
		 *   + div#wasavi_command_cursor [normal mode cursor]
		 *   |   |
		 *   |   + span#wasavi_command_cursor_inner
		 *   |
		 *   + textarea#wasavi_edit_cursor [edit mode cursor]
		 *   |
		 *   + div#wasavi_cover [cover element]
		 *
		 */

		// container
		var cnt = $(CONTAINER_ID);
		if (!cnt) throw new Error('wasavi container not found');

		//
		var n = new Date;
		var hue = config.vars.modelinehue < 0 ?
			Math.floor((n.getHours() * 3600 + n.getMinutes() * 60 + n.getSeconds()) / 240) :
			config.vars.modelinehue;
		var hsl = 'hsl(' + [hue, '100%', '33%'].join(',') + ')';
		var modeLineGradient = 'linear-gradient(top, ' + hsl + ' 0%,#000 100%);';
		var borderStyles = 'border:none;';
		var paddingStyle = 'padding:0;';
		var fontStyle = 'font:' + x.fontStyle + ';';
		var boxSizingPrefix = IS_GECKO ? '-moz-' : '';

		// scale line height
		var scaler = document.body.appendChild(document.createElement('span'));
		style(scaler, {
			font: x.fontStyle,
			textDecoration:'none',
			textShadow:'none',
			letterSpacing: '100%',
			whiteSpace:'pre',
			lineHeight:1
		});
		scaler.textContent = '0';
		lineHeight = scaler.offsetHeight;
		charWidth = scaler.offsetWidth;

		scaler.parentNode.removeChild(scaler);

		// over text marker
		var otm = getOverTextMarker(cnt, x.fontStyle, '#000', '#fff');

		// style
		var styleElement = $('wasavi_global_styles');
		styleElement.appendChild(document.createTextNode([
			'body { visibility:visible; }',
			'#wasavi_container {',
			'  background-color:transparent;',
			'  line-height:1;',
			'  text-align:left;',
			'  text-indent:0;',
			'  text-decoration:none;',
			'  text-shadow:none;',
			'}',
			'#wasavi_editor {',
			'  display:block;',
			'  margin:0;',
			paddingStyle,
			borderStyles,
			'  ' + boxSizingPrefix + 'box-sizing:border-box;',
			fontStyle,
			'  background:#fff url(' + otm + ') left top repeat-y;',
			'  background-origin:content-box;',
			'  overflow-x:hidden;',
			'  overflow-y:scroll;',
			'  counter-reset:n;',
			'}',
			'#wasavi_multiline_scaler {',
			'  position:fixed;',
			'  overflow:scroll;',
			paddingStyle,
			borderStyles,
			'  ' + boxSizingPrefix + 'box-sizing:border-box;',
			fontStyle,
			'  text-decoration:none;',
			'  text-shadow:none;',
			'  left:0px;',
			'  bottom:0px;',
			'  white-space:pre-wrap;',
			'  overflow-x:auto;',
			'  overflow-y:scroll;',
			'  visibility:hidden;',
			'  background-color:white;',
			'}',
			'#wasavi_singleline_scaler {',
			'  position:fixed;',
			'  margin:0;',
			'  padding:0;',
			fontStyle,
			'  text-decoration:none;',
			'  text-shadow:none;',
			'  white-space:pre;',
			'  color:#fff;',
			'  background-color:#000;',
			'  left:0px;',
			'  top:0px;',
			'  visibility:hidden',
			'}',
			'#wasavi_console_scaler {',
			'  position:fixed;',
			'  padding:0;',
			'  border:none;',
			'  font-family:' + fontFamily + ';',
			'  font-size:10pt;',
			'  left:0;',
			'  top:0;',
			'  white-space:pre-wrap;',
			'  overflow-x:auto;',
			'  color:#fff;',
			'  background-color:#000;',
			'  line-height:1;',
			'  visibility:hidden',
			'}',
			'#wasavi_editor > div {',
			'  margin:0;',
			'  padding:0;',
			'  min-height:' + lineHeight + 'px;',
			'  white-space:pre-wrap;',
			'  background-color:#fff;',
			'  color:#000;',
			'}',
			'#wasavi_editor > div:nth-child(odd) {',
			'  background-color:rgb(248,248,248);',
			'}',
			'#wasavi_editor > div > span.wasavi_em {',
			'  color:highlighttext;',
			'  background-color:highlight;',
			'}',
			'#wasavi_editor > div > span.wasavi_composition {',
			'  color:#ffffee;',
			'  background-color:#ffffee;',
			'}',
			'#wasavi_editor.n > div:before {',
			'  display:block;',
			'  float:left;',
			'  margin:0;',
			'  padding:0 ' + charWidth + 'px 0 0;',
			'  text-align:right;',
			'  color:#c00;',
			'  background-color:#fff;',
			fontStyle,
			'  counter-increment:n;',
			'  content:counter(n);',
			'}',
			(function () {
				var result = [];
				for (var i = 1; i <= LINE_NUMBER_MAX_WIDTH; i++) {
					result.push(
						'#wasavi_editor.n' + i + ' > div:before {' +
						'min-width:' + (LINE_NUMBER_MARGIN_LEFT + charWidth * i) + 'px;' +
						'margin-left:-' + (LINE_NUMBER_MARGIN_LEFT + charWidth * (i + 1)) + 'px;' +
						'}'
					);
					result.push(
						'#wasavi_editor.n' + i + ' > div {' +
						'margin-left:' + (LINE_NUMBER_MARGIN_LEFT + charWidth * (i + 1)) + 'px;' +
						'}'
					);
				}
				return result.join('\n');
			})(),
			'#wasavi_footer {',
			'  color:#fff;',
			window.chrome ? '  background:-webkit-' + modeLineGradient : '',
			window.opera  ? '  background:-o-'      + modeLineGradient : '',
			IS_GECKO	  ? '  background:-moz-'    + modeLineGradient : '',
			//'  background:' + modeLineGradient,
			'  padding:2px 2px 1px 2px;',
			'  font-family:' + fontFamily + ';',
			'  font-size:10pt;',
			'  line-height:1;',
			'  overflow:hidden;',
			'  ' + boxSizingPrefix + 'box-sizing:content-box;',
			'}',
			'#wasavi_footer_modeline {',
			'  ' + boxSizingPrefix + 'box-sizing:border-box;',
			'}',
			'#wasavi_footer_alter {',
			'  ' + boxSizingPrefix + 'box-sizing:border-box;',
			'}',
			'#wasavi_footer_modeline_table,#wasavi_footer_alter_table {',
			'  padding:0;',
			'  margin:0;',
			'  border-collapse:collapse;',
			'  border:none;',
			'  background-color:transparent',
			'}',
			'#wasavi_footer_modeline>table td,#wasavi_footer_alter>table td {',
			'  border:none;',
			'  padding:0;',
			'  line-height:1;',
			'  white-space:pre;',
			'}',
			'#wasavi_footer_file_indicator {',
			'  padding:0;',
			'  line-height:1;',
			'  text-align:left;',
			'}',
			'#wasavi_footer_prefix_indicator {',
			'  width:1px;',
			'  padding:0;',
			'  line-height:1;',
			'  text-align:right;',
			'}',
			'#wasavi_footer_input_indicator {',
			'  width:1px;',
			'  padding:0;',
			'  line-height:1;',
			'  background-color:rgba(0,0,0,0.5)',
			'}',
			'#wasavi_footer_input_container {',
			'  padding:0;',
			'  background-color:transparent',
			'}',
			'#wasavi_footer_input {',
			'  display:block;',
			'  margin:0;',
			'  padding:0;',
			'  border:none;',
			'  outline:none;',
			'  color:#fff;',
			'  background-color:rgba(0,0,0,0.5);',
			'  font-family:' + fontFamily + ';',
			'  font-size:10pt;',
			'  line-height:1;',
			'  width:100%',
			'}',
			'#wasavi_console_container {',
			'  visibility:hidden;',
			'  position:absolute;',
			'  margin:0;',
			'  padding:6px;',
			'  ' + boxSizingPrefix + 'box-sizing:border-box;',
			'  border:none;',
			'  border-radius:8px;',
			'  background-color:rgba(0,0,0,0.8);',
			'}',
			'#wasavi_console {',
			'  margin:0;',
			'  padding:0;',
			'  border:none;',
			'  outline:none;',
			'  color:#fff;',
			'  background-color:transparent;',
			'  width:100%;',
			'  font-family:' + fontFamily + ';',
			'  font-size:10pt;',
			'  overflow-y:hidden;',
			'  white-space:pre-wrap;',
			'  resize:none;',
			'  line-height:1;',
			'}',
			'#wasavi_command_cursor {',
			'  position:absolute;',
			'  margin:0;',
			'  padding:0;',
			fontStyle,
			'  text-decoration:none;',
			'  text-shadow:none;',
			'  color:#fff;',
			'  background-color:#000;',
			'  left:0px;',
			'  top:0px;',
			'}',
			'#wasavi_command_cursor_inner {',
			'  margin:0;',
			'  padding:0;',
			'  white-space:pre',
			'}',
			'#wasavi_edit_cursor {',
			'  position:absolute;',
			'  display:none;',
			'  margin:0;',
			'  padding:0;',
			'  ' + boxSizingPrefix + 'box-sizing:border-box;',
			'  border:none;',
			'  background-color:transparent;',
			fontStyle,
			'  text-decoration:none;',
			'  text-shadow:none;',
			'  overflow-y:hidden;',
			'  resize:none;',
			'  outline:none;',
			//'  background-color:rgba(192, 0, 0, 0.5);',
			'}',
			'#wasavi_cover {',
			'  position:fixed;',
			'  left:0; top:0; right:0; bottom:0;',
			'  background-color:rgba(0,0,0,0.0)',
			'}',
			'#wasavi_cover.dim {',
			window.chrome ? '  -webkit-transition:background-color 0.5s linear 0s;' : '',
			window.opera  ? '       -o-transition:background-color 0.5s linear 0s;' : '',
			IS_GECKO	  ? '     -moz-transition:background-color 0.5s linear 0s;' : '',
			'  background-color:rgba(0,0,0,0.25);',
			'}',
			'#wasavi_focus_holder {',
			'  position:fixed;',
			'  border:none;',
			'  outline:none;',
			'  resize:none;',
			'  padding:0;',
			'  left:-1px;',
			'  top:0px;',
			'  width:32px;',
			'  height:32px;',
			'  background-color:transparent;',
			'  ime-mode:disabled;',
			'}'
		].join('')));

		// focus holder
		var focusHolder = document.createElement('textarea');
		document.body.insertBefore(focusHolder, document.body.firstChild);
		focusHolder.id = 'wasavi_focus_holder';

		// editor
		var editor = new Editor($(EDITOR_CORE_ID));

		// caret position scaler
		var caretdiv = $('wasavi_multiline_scaler');

		// text length scaler
		var textspan = $('wasavi_singleline_scaler');
		textspan.textContent = '#';

		// console scaler
		var conscaler = $('wasavi_console_scaler');
		conscaler.textContent = '#';

		// footer container
		var footer = $('wasavi_footer');

		// footer (default indicator)
		var footerDefault = $('wasavi_footer_modeline');
		$('wasavi_footer_file_indicator').textContent = '#';
		//footerDefault.textContent = '#';

		// footer (alter: line input)
		var footerAlter = $('wasavi_footer_alter');

		// footer alter contents
		var footerAlterTable = $('wasavi_footer_alter_table');
		var footerAlterRow = footerAlterTable.getElementsByTagName('tr')[0];

		// footer alter contents: indicator
		var footerIndicator = $('wasavi_footer_input_indicator');
		footerIndicator.textContent = '/';

		// footer alter contents: line input container
		var footerLineInputContainer = $('wasavi_footer_input_container');

		// footer alter contents: line input
		var footerInput = $('wasavi_footer_input');

		// console window
		var conwincnt = $('wasavi_console_container');
		var conwin = $('wasavi_console');
		conscaler.style.width = conwin.offsetWidth + 'px';

		// command cursor
		var cc = $('wasavi_command_cursor');
		var ccInner = $('wasavi_command_cursor_inner');
		ccInner.style.height = lineHeight + 'px';

		// textarea for insert mode
		var ec = $('wasavi_edit_cursor');

		// fix height
		if (footerDefault.offsetHeight < footerAlter.offsetHeight) {
			footerDefault.style.height = footerAlter.offsetHeight + 'px';
		}
		else if (footerAlter.offsetHeight < footerDefault.offsetHeight ) {
			footerAlter.style.height = footerDefault.offsetHeight + 'px';
		}
		footerAlter.style.display = 'none';

		/*
		 * visual settings
		 */

		setTabStop(config.vars.tabstop);
		setGeometory(x);

		/*
		 * initialize variables
		 */

		targetElement = x;
		fileName = '';
		preferredNewline = '\n';
		terminated = false;
		writeOnTermination = true;
		state = 'normal';
		runLevel = 0;
		strokeCount = 0;
		inputModeStack = [];
		inputMode = 'command';
		inputModeSub = '';
		prefixInput = new PrefixInput;
		idealWidthPixels = -1;
		backlog = new Backlog(conwincnt, conwin, conscaler);
		isTextDirty = false;
		isEditCompleted = false;
		isVerticalMotion = false;
		isReadonlyWarned = false;
		isSmoothScrollRequested = false;
		isSimpleCommandUpdateRequested = false;
		isJumpBaseUpdateRequested = false;
		lastSimpleCommand = '';
		lastHorzFindCommand = {direction:0, letter:'', stopBefore:false};
		lastRegexFindCommand = new RegexFinderInfo;
		lastSubstituteInfo = {};
		lastMessage = '';
		requestedState = {};

		editor.value = x.value || '';
		editor.selectionStart = x.selectionStart || 0;
		editor.selectionEnd = x.selectionEnd || 0;

		marks = new Marks(editor);
		cursor = new CursorUI(editor, cc, ec);
		scroller = new Scroller(editor, cursor, footerDefault);
		editLogger = new EditLogger(editor, config.vars.undolevels);
		exCommandExecutor = new ExCommandExecutor(editor, true);
		config.setData(x.readOnly ? 'readonly' : 'noreadonly');

		refreshIdealWidthPixels(editor);
		showMessage(getFileIoResultInfo(editor, x.value.length, true));

		x.value = undefined;

		/*
		 * execute exrc
		 */

		isInteractive = false;
		var result = executeExCommand(editor, exrc, true);
		typeof result == 'string' && showMessage(result, true);
		cursor.ensureVisible();
		cursor.update({type:inputMode, focused:true, visible:true});

		/*
		 * set up channels
		 */

		if (extensionChannel) {
			extensionChannel.postMessage({
				type:'notify-to-parent',
				parentTabId:x.parentTabId,
				payload:{type:'wasavi-initialized', height:cnt.offsetHeight}
			});
			extensionChannel.setMessageListener(handleExtensionChannelMessage);
		}

		/*
		 * set up event handlers
		 */

		setupEventHandlers(true);

		/*
		 * notify wasavi started to document
		 */

		var ev = document.createEvent('Event');
		ev.initEvent(
			'wasavi' + (extensionChannel ? '_extension' : '') + '_start',
			true, false);
		document.dispatchEvent(ev);
	}