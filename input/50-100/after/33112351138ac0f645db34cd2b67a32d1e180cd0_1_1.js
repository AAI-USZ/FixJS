function(li) {
		var currLine = this.editor.getCursor(false).line;
		
 		if(li != currLine) this.editor.setCursor(li);
 		//if the line doesn't change, refocus doesn't happen, 
 		//so if they're the same change it twice
 		else {
 			this.editor.setCursor(li + 1);
 			this.editor.setCursor(li);
 		}

	}