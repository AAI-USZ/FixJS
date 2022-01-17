function(){
			// summary:
			//		Returns the first selected child.
			return array.filter(this.getChildren(), function(w){ return w.selected; })[0];
		}