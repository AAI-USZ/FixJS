function(id, offset, line, column, span, color) {
		offset--;
		// For some reason, we're getting the offset from the highlighter
		// as 1-offset, rather than 0-offset.
		var startHandleAndColumn = this.findHandleAndColumn(offset);
		var endHandleAndColumn = this.findHandleAndColumn(offset+span);
		
		//change this!
		//to test: myEditor.defn.highlight('', 6, 10, 1, 20)
		/*this.editor.setSelection(
				this.handleAndColumnToPos(startHandleAndColumn),
				this.handleAndColumnToPos(endHandleAndColumn))*/
		
		var stylesheet = document.styleSheets[0]; //this is default.css
		var name = "highlight" + currentHighlightNumber;//+ color
		currentHighlightNumber++;

		//LOOK INTO IE/CHROME business


		stylesheet.insertRule("." + name + " { background-color: " + color + ";}", 0);
		
		//figure out how to use color input to change css
 		this.highlightedAreas.push(
			this.editor.markText(this.handleAndColumnToPos(startHandleAndColumn), 
					this.handleAndColumnToPos(endHandleAndColumn), 
					name));
		
		
	}