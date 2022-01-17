function onLineNumberClick(event) {
		var $elem = $(event.currentTarget);
		var doc = DocumentManager.getCurrentDocument();
		var location = { url: doc.url, lineNumber: $elem.index() };
		Debugger.toggleBreakpoint(location);
	}