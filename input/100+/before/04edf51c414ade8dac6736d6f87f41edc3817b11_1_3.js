function (require, exports, module) {
	'use strict';

	var DocumentManager = brackets.getModule("document/DocumentManager");
	var EditorManager   = brackets.getModule("editor/EditorManager");
	var ScriptAgent     = brackets.getModule("LiveDevelopment/Agents/ScriptAgent");

	var Debugger = require("Debugger");
	var Panel    = require("Panel");

	var tabId = "jdiehl-debugger-traces";
	
	var $tab, $events, $tree;

	var _tree = [{
		data: "Root 1",
		state: "closed",
		children: [{
			data: "Child 1",
			children: []
		}, {
			data: "Child 2",
			children: []
		}]
	}, {
		data: "Root 2",
		state: "closed",
		children: []
	}];

	function onPaused(event, pause) {
		var breakpoints = pause.breakpoints;
		for (var i = 0; i < breakpoints.length; i++) {
			var breakpoint = breakpoints[i];
			if (! breakpoint.trace) { continue; }
			var trace = breakpoint.trace[breakpoint.trace.length - 1];
			// Todo: update tree if one of trace's parents is shown
		}
	}

	function _twoDigits(number) {
		return String(100 + number).slice(-2);
	}

	function _formatTime(time) {
		return [time.getHours(), time.getMinutes(), time.getSeconds()].map(_twoDigits).join(":");
	}

	function onEventTrace(e, trace) {
		var summary = _summarizeTrace(trace);
		
		var $event = $('<div class="fresh event">')
			.data('trace', trace)
			.append($('<div class="time">').text(_formatTime(trace.date)))
			.append($('<div class="type">').text(summary.event))
			.prependTo($events)
			.removeClassDelayed("fresh");
	}

	function _summarizeTrace(trace) {
		var summary = {};
		
		summary.frame    = trace.callFrames[0];
		summary.fn       = summary.frame.functionName;
		summary.location = summary.frame.location;
		summary.scriptId = summary.location.scriptId;
		summary.line     = summary.location.lineNumber;
		summary.column   = summary.location.columnNumber;
		summary.url      = ScriptAgent.scriptWithId(summary.scriptId).url;
		summary.file     = summary.url.replace(/^.*\//, '');
		if (trace.event) {
			summary.event = trace.event;
		}

		return summary;
	}

	function _traceChildrenForTree(parent, isRoot) {
		var children = [];

		for (var i = 0; i < parent.children.length; i++) {
			var trace = parent.children[i];
			if (!trace.script()) break;

			var child = {
				data: "[" + trace.locationName() + "] " + trace.functionName(),
				metadata: { trace: trace }
			};
			if (trace.children && trace.children.length > 0) {
				if (isRoot) {
					child.state = "open";
					child.children = _traceChildrenForTree(trace, false);
				} else {
					child.state = "closed";
					child.children = [];
				}
			}
			children.push(child);
		}

		return children;
	}

	function _treeDataProvider(treeNode, callback) {
		var parent = (treeNode === -1) ? { children: [currentEventTrace] } : treeNode.data('trace');
		var children = _traceChildrenForTree(parent, treeNode === -1);
		callback(children);
	}
	
	function setupTree($tree) {
		$tree.children().remove();
		
		if (! currentEventTrace) { return; }

		if (! currentEventTrace.children || currentEventTrace.children.length === 0) {
			$tree.text("Empty");
			return;
		}

		// Mostly taken from Brackets' ProjectManager.js
		$tree.jstree({
			core : { animation: 0 },
			plugins : ["ui", "themes", "json_data"],
			json_data : { data: _treeDataProvider, correct_state: false },
			themes : { theme: "brackets", url: "styles/jsTreeTheme.css", dots: false, icons: false }
		})
		.bind("mousedown.jstree", function (event) {
			event.preventDefault();
			if ($(event.target).is(".jstree-icon")) { return; }
			onTraceSelected($(event.target).closest('li').data('trace'));
		});
		
		// .bind("before.jstree", function (event, data) {
		// 	console.log("before.jstree");
		// })
		// .bind("select_node.jstree", function (event, data) {
		// 	console.log("select_node.jstree");
		// })
		// .bind("reopen.jstree", function (event, data) {
		// 	console.log("reopen.jstree");
		// })
		// .bind("scroll.jstree", function (e) {
		// 	console.log("scroll.jstree");
		// })
		// .bind("loaded.jstree open_node.jstree close_node.jstree", function (event, data) {
		// 	console.log(event.type + ".jstree");
		// })
	}

	function onTraceSelected(trace) {
		if (! trace) { return; }

		var summary = _summarizeTrace(trace);
		var doc = DocumentManager.getCurrentDocument();

		var focus = function () {
			var editor = EditorManager.getCurrentFullEditor();
			editor.setCursorPos(summary.line, summary.column);
			window.setTimeout(editor.focus.bind(editor), 0);
		};

		if (doc && doc.url === summary.url) {
			focus();
			return;
		}
		
		var path = summary.url.replace(/^file:\/\//, '');
		DocumentManager.getDocumentForPath(path).done(function (doc) {
			DocumentManager.setCurrentDocument(doc);
			focus();
		});
	}

	var currentEventTrace;

	function onEventClicked(e) {
		event.preventDefault();
		currentEventTrace = $(e.currentTarget).data('trace');
		setupTree($tree);
	}

	// init
	function init() {
		// configure tab content
		$tab = $('<div class="table-container quiet-scrollbars">').attr('id', tabId);
		$events = $('<div class="events">').on('mousedown', 'div.event', onEventClicked).appendTo($tab);
		$tree = $('<div class="tree quiet-scrollbars">').appendTo($tab);
		Panel.addTab(tabId, "Traces", $tab);

		$(Debugger).on("paused", onPaused);
		$(Debugger).on("eventTrace", onEventTrace);
	}

	function unload() {
	}

	// public methods
	exports.init = init;
	exports.unload = unload;
}