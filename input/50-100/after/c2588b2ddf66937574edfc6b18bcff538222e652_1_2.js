function unload() {
		$(DocumentManager).off("currentDocumentChange", onCurrentDocumentChange);

		Hover.unload();
		Parser.unload();
		Breakpoint.unload();
		Console.unload();
		Debugger.unload();
		// Context.unload();
		$style.remove();
		$("body").off("click", ".CodeMirror-gutter pre", onLineNumberClick);
	}