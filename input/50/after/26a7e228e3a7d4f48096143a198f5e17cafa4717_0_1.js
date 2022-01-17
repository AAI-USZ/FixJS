function onCurrentDocumentChange() {
		removePopup();
		$(".CodeMirror-lines")
			.on("mousemove", onLinesMouseMove)
			.on("mouseout", onLinesMouseOut);
	}