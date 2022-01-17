function(line) {
		var currLine = this.editor.getCursor(false).line;
 		if(line != currLine) this.editor.setCursor(line);
 		else {
 			this.editor.setCursor(line + 1);
 			this.editor.setCursor(line);
 		}

	}