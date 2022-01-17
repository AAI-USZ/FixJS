function unload() {
		$(DocumentManager).off("currentDocumentChange", onCurrentDocumentChange);
		
		$(".CodeMirror-lines")
			.off("mousemove", onLinesMouseMove)
			.off("mouseout", onLinesMouseOut);
	}