function init() {

		// load styles
		_loadLessFile("debugger.less", _extensionDirForBrowser());

		// init modules
		Debugger.init();
		Console.init();
		Breakpoint.init();
		Parser.init();

		// register for debugger events
		var $Debugger = $(Debugger);
		$Debugger.on("setBreakpoint", onSetBreakpoint);
		$Debugger.on("removeBreakpoint", onRemoveBreakpoint);
		$Debugger.on("paused", onPaused);
		$Debugger.on("resumed", onResumed);
		$Debugger.on("trace", onTrace);

		// register for code mirror click events
		$(".CodeMirror-gutter").on("click", "pre", onLineNumberClick);
		
		$(".CodeMirror-lines")
			.on("mousemove", onLinesMouseMove)
			.on("mouseout", onLinesMouseOut);

		$btnBreakEvents = $("<a>").text("❚❚").attr({ href: "#", id: "jdiehl-debugger-breakevents" });
		$btnBreakEvents.click(onToggleBreakEvents);
		$btnBreakEvents.insertBefore('#main-toolbar .buttons #toolbar-go-live');

		$(DocumentManager).on("currentDocumentChange", onCurrentDocumentChange);
		setTimeout(onCurrentDocumentChange, 0);

		// Yes, there is DocumentManager.getAllOpenDocuments
		// However not all files in the working set are actually "open" for some reason
		// $.each(DocumentManager.getWorkingSet(), function (index, fileEntry) {
		// 	if (! fileEntry.isFile || fileEntry.fullPath.replace(/^.*\./, '') !== 'js') { return; }
		// 	DocumentManager.getDocumentForPath(fileEntry.fullPath).done(function (doc) {
		// 		_setDocInfo(doc);
		// 		parseDocument(doc);
		// 	});
		// });
	}