function(evt) {
		var lineNumber = parseInt(this.id.substr("offset_line_".length));
		toggleBreakpoint(lineNumber);
	}