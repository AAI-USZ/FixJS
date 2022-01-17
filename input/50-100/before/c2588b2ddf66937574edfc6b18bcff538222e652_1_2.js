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