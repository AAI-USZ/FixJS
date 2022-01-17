function (require, exports, module) {
	'use strict';

	var DocumentManager = brackets.getModule("document/DocumentManager");
	var EditorManager   = brackets.getModule("editor/EditorManager");
	var Inspector       = brackets.getModule("LiveDevelopment/Inspector/Inspector");
	var ScriptAgent     = brackets.getModule("LiveDevelopment/Agents/ScriptAgent");
	var GotoAgent       = brackets.getModule("LiveDevelopment/Agents/GotoAgent");

	var Parser = require("Parser");

	var hover = { cursor: null, token: null };
	var $popup;
	var tabWidth = 2;
	
	/** Helper Functions *****************************************************/
	
	function describeValue(value, level) {
		level = level || 0;

		if (value.value === null)       { return "null"; }
		if (value.type === "undefined") { return "undefined"; }
		if (value.type === "number")    { return value.value; }
		if (value.type === "string")    { return JSON.stringify(value.value); }
		if (value.type === "function")  { return value.description; }
		if (value.type === "object")    { return describeObject(value, level); }
		if (value.description)          { return value.description; }
		
		// Pretty print
		return JSON.stringify(value, undefined, tabWidth);
	}

	function describeObject(info, level) {
		if (! info.value) { return info.description; }

		var i, indentUnit = "", indent = "";
		for (i = 0; i < tabWidth; i++) { indentUnit += " "; }
		for (i = 0; i < level;    i++) { indent     += indentUnit; }

		var content = [];
		for (var key in info.value) {
			var line = indent + indentUnit;
			// Object key
			if (info.subtype !== 'array') { line += key + ": "; }
			line += describeValue(info.value[key], level + 1);
			content.push(line);
		}
		content = content.join(",\n");
		
		var b = info.subtype === 'array' ? ["[", "]"] : ["{", "}"];
		content = b[0] + (content.length > 1 ? "\n" + content + "\n" + indent : content) + b[1];
		
		return content;
	}

	function removePopup() {
		if ($popup) {
			$popup.remove();
			$popup = null;
		}
	}

	function showValue(value, line, fromCol, toCol, cmLinesNode, cm) {
		removePopup();
		
		// Create the popup with an ID for CSS
		var $popup = $("<div>").attr("id", "jdiehl-debugger-variable-value");
		// Make the text movable independent of the rest (the arrow) by wrapping it in another div
		var $text  = $("<div>").text(value).appendTo($popup);
		// Append the popup to a node compatible with "local" coordinates as used below
		$("> div:last", cmLinesNode).append($popup);

		// Prevent a weird effect when a variable is in the first column and the cursor is left of it
		if (toCol === 0) { toCol = 1; }
		// Get the pixel coordinates of the left and right end of the token
		var left   = cm.charCoords({ line: line, ch: fromCol }, "local");
		var right  = cm.charCoords({ line: line, ch: toCol   }, "local");
		// Right shift to the middle of the token
		left.x += Math.round((right.x - left.x) / 2);
		// Left shift so that the middle of the text is at the middle of the token
		left.x -= Math.round($popup.outerWidth() / 2);
		// Position the popup
		$popup.css({ left: left.x, top: left.y });

		// Minimum left coordinate, negative so the arrow does not overlap the rounded corner
		var minLeft = -8;
		// Shift the text part of the popup to the right if it is cut off
		if (left.x < minLeft) {
			// Setting margin-right = -1 * margin-left keeps left: 50% intact (for the arrow)
			$text.css({ 'margin-left': minLeft - left.x, 'margin-right': - (minLeft - left.x) });
		}
		
		return $popup;
	}
	
	function resolveVariableInTracepoint(variable, tracepoint) {
		var noGlobal = function (scope) { return scope.type !== "global"; };

		var result = new $.Deferred();

		var trace = tracepoint.trace[tracepoint.trace.length - 1];
		if (! trace || trace.callFrames.length === 0) { return result.reject(); }
		var callFrameIndex = 0;
		trace.resolveCallFrame(callFrameIndex, noGlobal).done(function () {
			var scopeChain = trace.callFrames[callFrameIndex].scopeChain;
			for (var i = 0; i < scopeChain.length; i++) {
				var vars = scopeChain[i].resolved;
				if (vars && vars[variable]) {
					return resolveVariable(vars[variable]).done(result.resolve);
				}
			}
			result.reject();
		});

		return result.promise();
	}

	function resolveVariable(value, cache) {
		if (! cache) { cache = {}; }
		
		var result = new $.Deferred();
		
		if (! value.objectId) {
			result.resolve(value);
		}
		else if (cache[value.objectId]) {
			result.resolve(cache[value.objectId]);
		}
		else {
			cache[value.objectId] = value;
			if (value.type === "function") {
				Inspector.Debugger.getFunctionDetails(value.objectId, function (res) {
					value.details = res.details;
					result.resolve(value);
				});
			}
			else {
				Inspector.Runtime.getProperties(value.objectId, true, function (res) {
					var pending = [];
					var resolved = value.value = {};
					for (var i in res.result) {
						var info = res.result[i];
						if (! info.enumerable) { continue; }
						resolved[info.name] = info.value;
						pending.push(resolveVariable(info.value));
					}

					$.when.apply(null, pending).done(function () {
						result.resolve(value);
					});
				});
			}
		}

		return result.promise();
	}

	function findWrappingFunction(functions, cursor, token) {
		var fn;
		
		for (var i = 0; i < functions.length; i++) {
			var candidate    = functions[i];
			var start        = candidate.loc.start, end = candidate.loc.end;
			var startsBefore = start.line - 1 < cursor.line || (start.line - 1 === cursor.line && start.column < token.start);
			var endsAfter    = end.line - 1 > cursor.line || (end.line - 1 === cursor.line && end.column > token.end);

			// Assumption: any later function that surrounds the variable
			// is inside any previous surrounding function => just replace fn
			if (startsBefore && endsAfter) { fn = candidate; }
		}

		return fn;
	}

	/** Event Handlers *******************************************************/
	
	function onLinesMouseMove(event) {
		onPixelHover({ x: event.clientX, y: event.clientY }, event.target);
	}
	
	function onLinesMouseOut() {
		onPixelHover(null);
	}

	function onPixelHover(pixel, node) {
		var cm     = EditorManager.getCurrentFullEditor()._codeMirror;

		var cursor = pixel ? cm.coordsChar({ x: pixel.x + 4, y: pixel.y }) : null;

		// Same cursor position hovered as before: abort
		if (hover.cursor &&
			cursor &&
			cursor.ch   === hover.cursor.ch &&
			cursor.line === hover.cursor.line
		) { return; }

		hover.cursor = cursor;
		onCursorHover(cursor, node, cm);
	}

	function onCursorHover(cursor, cmLinesNode, cm) {
		var token = cursor ? cm.getTokenAt(cursor) : null;

		// Tokens don't include line information
		if (token) { token.line = cursor.line; }

		// Same token hovered as before: abort
		if (hover.token &&
			token &&
			token.string    === hover.token.string &&
			token.className === hover.token.className &&
			token.start     === hover.token.start &&
			token.end       === hover.token.end &&
			token.line      === hover.token.line
		) { return; }

		hover.token = token;
		onTokenHover(token, cursor, cmLinesNode, cm);
	}

	function onTokenHover(token, cursor, cmLinesNode, cm) {
		// Close the popup
		removePopup();

		// No token hovered? We're done
		if (! token) { return; }

		// Get the functions and variables of the current document or abort
		var url       = DocumentManager.getCurrentDocument().url;
		var details   = Parser.getCacheForUrl(url);
		var variables = details.variables;
		var functions = details.functions;
		if (! variables || ! functions) { return; }

		// Find the variable for this token, else abort
		// CodeMirror lines are 0-based, Esprima lines are 1-based
		var line     = cursor.line + 1;
		var column   = token.start;
		var variable = variables[line] ? variables[line][column] : null;
		if (! variable) { return; }

		// Find the function surrounding the variable, else abort
		var fn = findWrappingFunction(functions, cursor, token);
		if (! fn) { return; }

		var resolveBefore = resolveVariableInTracepoint(variable, fn.tracepoints[0]);
		var resolveAfter  = resolveVariableInTracepoint(variable, fn.tracepoints[1]);
		$.when(resolveBefore, resolveAfter).done(function (before, after) {
			if (after.details && after.details.location) {
				token.location = after.details.location;
			} else if (before.details && before.details.location) {
				token.location = before.details.location;
			}
			
			before = describeValue(before);
			after  = describeValue(after);
			if (before !== after) {
				before += " ↦ " + after;
			}

			$popup = showValue(before, cursor.line, token.start, token.end, cmLinesNode, cm);
		});
	}

	function onLinesClick(event) {
		var hot = event.metaKey || event.ctrlKey;
		if (! hot || ! hover.token || ! hover.token.location) { return; }
		var location = hover.token.location;
		
		var url = ScriptAgent.scriptWithId(location.scriptId).url;
		GotoAgent.open(url, { line: location.lineNumber, ch: location.columnNumber });
		
		event.preventDefault();
		return false;
	}

	function onCurrentDocumentChange() {
		removePopup();
		$(".CodeMirror-lines")
			.on("mousemove", onLinesMouseMove)
			.on("mouseout", onLinesMouseOut)
			.on("click", onLinesClick);
	}

	/** Init Functions *******************************************************/
	
	// init
	function init() {
		// register for debugger events

		$(DocumentManager).on("currentDocumentChange", onCurrentDocumentChange);
		setTimeout(onCurrentDocumentChange, 0);
	}

	// unload
	function unload() {
		$(DocumentManager).off("currentDocumentChange", onCurrentDocumentChange);
		
		$(".CodeMirror-lines")
			.off("mousemove", onLinesMouseMove)
			.off("mouseout", onLinesMouseOut)
			.off("click", onLinesClick);
	}

	exports.init = init;
	exports.unload = unload;
}