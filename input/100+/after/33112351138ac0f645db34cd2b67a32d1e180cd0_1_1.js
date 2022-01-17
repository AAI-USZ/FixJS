function(id, offset, line, column, span, color) {
		offset--;
		// For some reason, we're getting the offset from the highlighter
		// as 1-offset, rather than 0-offset.
		var startHandleAndColumn = this.findHandleAndColumn(offset);
		var endHandleAndColumn = this.findHandleAndColumn(parseInt(offset)+parseInt(span));
		
		var stylesheet = document.styleSheets[0]; //this is default.css
		var name = "highlight" + (currentHighlightNumber+'x');//to prevent overwriting with prefixes

		currentHighlightNumber++;

		stylesheet.insertRule("." + name + " { background-color: " + color + ";}", 0);
		
 		this.highlightedAreas.push(
			this.editor.markText(this.handleAndColumnToPos(startHandleAndColumn), 
					this.handleAndColumnToPos(endHandleAndColumn), 
					name));
 		
 		this.resetCursor(parseInt(startHandleAndColumn.handle));
	}