function() {
			this.prepareCommonInputs();
			
			var outer = this;
			this.tagPalette.decideMaxHeight = function() {
      	return outer.textarea.height() + 50;
      };
			
			_class.addToolBar(this.textarea, false);
		}