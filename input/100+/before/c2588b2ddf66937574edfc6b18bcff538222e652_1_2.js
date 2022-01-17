function (require, exports, module) {
	'use strict';

	var DocumentManager = brackets.getModule("document/DocumentManager");
	var EditorManager   = brackets.getModule("editor/EditorManager");
	var ScriptAgent     = brackets.getModule("LiveDevelopment/Agents/ScriptAgent");

	var Console    = require("Console");
	var Debugger   = require("Debugger");
	var Breakpoint = require("Breakpoint");
	var Parser     = require("Parser");
	var Hover      = require("Hover");

	var $style;
	var traceLineTimeouts = {};
	var tracepointsForUrl = {};

	/** Helper Functions *****************************************************/

	function _editorForURL(url) {
		var doc = DocumentManager.getCurrentDocument();
		if (doc && doc.url === url) {
			return EditorManager.getCurrentFullEditor();
		} else {
			console.log("No editor for url", url);
		}
		return undefined;
	}

	function _editorForLocation(location) {
		var url = location.url;
		if (!url) url = ScriptAgent.scriptWithId(location.scriptId).url;
		return _editorForURL(url);
	}
	
	/** Find this extension's directory relative to the brackets root */
	function _extensionDirForBrowser() {
		var bracketsIndex = window.location.pathname;
		var bracketsDir   = bracketsIndex.substr(0, bracketsIndex.lastIndexOf('/') + 1);
		var extensionDir  = bracketsDir + require.toUrl('./');

		return extensionDir;
	}

	/** Loads a less file as CSS into the document */
	function _loadLessFile(file, dir) {
		// Load the Less code
		$.get(dir + file, function (code) {
			// Parse it
			var parser = new less.Parser({ filename: file, paths: [dir] });
			parser.parse(code, function onParse(err, tree) {
				console.assert(!err, err);
				// Convert it to CSS and append that to the document head
				$("<style>").text(tree.toCSS()).appendTo(window.document.head);
			});
		});
	}

    /** Sets a line class and removes it after a delay */
	function setTemporaryLineClass(editor, line, klass, delay) {
		// Make sure no other line class or previous trace class is in the way
		// Might also happen when the same tracepoint is hit twice quickly
		editor._codeMirror.setLineClass(line);
		// Set the trace class. This triggers an animation in CSS since the <pre> tag is regenerated
		editor._codeMirror.setLineClass(line, "trace");
		// Stop any previous attempts of removing the line class
		window.clearTimeout(traceLineTimeouts[line]);
		// Remove the line class after one second
		// This is necessary because the animation is triggered when the <pre> tag is rewritten
		// This happens over and over again on cursor activity, or when the document is changed, etc.
		traceLineTimeouts[line] = window.setTimeout(function () {
			delete traceLineTimeouts[line];
			editor._codeMirror.setLineClass(line);
		}, delay);
	}

	function addFunctionTracepoints(url, node) {
		var tracepoints = [];

		// Name of the function
		var name  = node.id ? node.id.name : "<anonymous>";
		
		// Now add two tracepoints, one at the beginning, one at the end of the function
		for (var key in node.loc) {
			var loc = node.loc[key];
			var location = {
				url: url,
				// Esprima lines are 1-based
				lineNumber: loc.line - 1,
				// The end tracepoint needs be before }, not after, else it's hit right with the first one
				columnNumber: key === 'end' ? loc.column - 1 : loc.column
			};
			var tracepoint = Debugger.setTracepoint(location);
			tracepoints.push(tracepoint);
			$(tracepoint).on('set', function (event, res) {
				console.log("Tracepoint set for " + name + "() in", url.replace(/^.*\//, ''), "line", res.breakpoint.location.lineNumber);
			});
		}
		
		// Remember the tracepoints
		node.tracepoints = tracepoints;
		if (! tracepointsForUrl[url]) {
			tracepointsForUrl[url] = [];
		}
		tracepointsForUrl[url] = tracepointsForUrl[url].concat(tracepoints);
	}

	function removeFunctionTracepoints(url) {
		// Remove the old tracepoints
		if (tracepointsForUrl[url]) {
			$.each(tracepointsForUrl[url], function (index, tracepoint) {
				tracepoint.remove();
			});
			delete tracepointsForUrl[url];
		}
	}

	function parseDocument(doc) {
		if (! doc || doc.extension !== 'js') { return; }

		removeFunctionTracepoints(doc.url);

		// Loc: store locations as node.loc.(start|end).(line|column)
		var tree  = Parser.parse(doc.getText(), { loc: true });
		var cache = Parser.getCacheForUrl(doc.url);
		
		cache.functions = [];
		var onFunction = function (node) {
			cache.functions.push(node);
			addFunctionTracepoints(doc.url, node);
		};

		cache.variables = {};
		var onVariable = function (node) {
			if (node.type === 'VariableDeclarator') { node = node.id; }
			
			var line   = node.loc.start.line;
			var column = node.loc.start.column;
			
			if (! cache.variables[line]) { cache.variables[line] = {}; }
			cache.variables[line][column] = node.name;
		};

		var handlers = {
			FunctionDeclaration: onFunction,
			FunctionExpression:  onFunction,
			Identifier:          onVariable,
			VariableDeclarator:  onVariable
		};
		
		Parser.walk(tree, handlers);
	}

	/** Event Handlers *******************************************************/
	
	function onLineNumberClick(event) {
		var $elem = $(event.currentTarget);
		var doc = DocumentManager.getCurrentDocument();
		var location = { url: doc.url, lineNumber: $elem.index() };
		Debugger.toggleBreakpoint(location);
	}

	function onSetBreakpoint(event, location) {
		var editor = _editorForLocation(location);
		if (! editor) return;
		editor._codeMirror.setMarker(location.lineNumber, null, "breakpoint");
	}

	function onRemoveBreakpoint(event, location) {
		var editor = _editorForLocation(location);
		if (! editor) return;
		editor._codeMirror.clearMarker(location.lineNumber, null, "breakpoint");
	}

	function onPaused(event, res) {
		var editor = _editorForLocation(res.location);
		if (! editor) { return; }

		if (res.halt) {
			editor.setCursorPos(res.location.lineNumber, res.location.columnNumber);
			editor._codeMirror.setLineClass(res.location.lineNumber, "paused");
		} else {
			setTemporaryLineClass(editor, res.location.lineNumber, "trace", 1000);
		}
	}

	function onResumed(event, res) {
		if (res.halt && res.location) {
			var editor = _editorForLocation(res.location);
			if (! editor) { return; }
			editor._codeMirror.setLineClass(res.location.lineNumber);
		}
	}

	function onCurrentDocumentChange() {
		parseDocument(DocumentManager.getCurrentDocument());
	}

	function onToggleBreakEvents() {
		var flag = !Debugger.breakOnTracepoints();
		Debugger.setBreakOnTracepoints(flag);
		$btnBreakEvents.toggleClass("enabled", flag);
	}

	/** Init Functions *******************************************************/
	
	// init
	var $btnBreakEvents;
	function init() {

		// load styles
		_loadLessFile("debugger.less", _extensionDirForBrowser());

		// init modules
		Debugger.init();
		Console.init();
		Breakpoint.init();
		Parser.init();
		Hover.init();

		// register for debugger events
		var $Debugger = $(Debugger);
		$Debugger.on("setBreakpoint", onSetBreakpoint);
		$Debugger.on("removeBreakpoint", onRemoveBreakpoint);
		$Debugger.on("paused", onPaused);
		$Debugger.on("resumed", onResumed);

		// register for code mirror click events
		$(".CodeMirror-gutter").on("click", "pre", onLineNumberClick);
		
		$btnBreakEvents = $("<a>").text("❚❚").attr({ href: "#", id: "jdiehl-debugger-breakevents" });
		$btnBreakEvents.click(onToggleBreakEvents);
		$btnBreakEvents.insertBefore('#main-toolbar .buttons #toolbar-go-live');

		$(DocumentManager).on("currentDocumentChange", onCurrentDocumentChange);
		setTimeout(onCurrentDocumentChange, 0);
	}

	// unload
	function unload() {
		$(DocumentManager).off("currentDocumentChange", onCurrentDocumentChange);

		Hover.unload();
		Parser.unload();
		Breakpoint.unload();
		Console.unload();
		Debugger.unload();
		$style.remove();
		$(".CodeMirror-gutter").off("click", "pre", onLineNumberClick);
	}
	exports.init = init;
	exports.unload = unload;

	$(init);
});
