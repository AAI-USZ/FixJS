function init() {

		// load styles
		_loadLessFile("debugger.less", _extensionDirForBrowser());

		// init modules
		// Context.init();
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
		// Todo: use CodeMirror's onGutterClick
		// Then we would know which editor was clicked (inline or full)
		// Right now this would be buggy, though: https://github.com/adobe/brackets/issues/1251
		$("body").on("click", ".CodeMirror-gutter pre", onLineNumberClick);
		
		$btnBreakEvents = $("<a>").text("❚❚").attr({ href: "#", id: "jdiehl-debugger-breakevents" });
		$btnBreakEvents.click(onToggleBreakEvents);
		$btnBreakEvents.insertBefore('#main-toolbar .buttons #toolbar-go-live');

		$(DocumentManager).on("currentDocumentChange", onCurrentDocumentChange);
		setTimeout(onCurrentDocumentChange, 0);
	}