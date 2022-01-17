function() {
			var ed = this.ed
			var selectedBlocks = ed.selection.getSelectedBlocks();
			return selectedBlocks.length == 0 ? [ ed.dom.getRoot() ] : selectedBlocks;
		}