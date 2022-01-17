function() {
		if ( this.model.canUndo() ) {
		
			util.removeClass(
				this.ui.buttons.buttons.undo.node,
				'disabled'
			)

		} else {

			util.addClass(
				this.ui.buttons.buttons.undo.node,
				'disabled'
			)
		}

		if ( this.model.canRedo() ) {
		
			util.removeClass(
				this.ui.buttons.buttons.redo.node,
				'disabled'
			)
		} else {

			util.addClass(
				this.ui.buttons.buttons.redo.node,
				'disabled'
			)
		}
		
		if ( this.model.length == 0 ) {
		
			util.addClass(
				this.ui.buttons.buttons.clear.node,
				'disabled'
			)
		} else {
			util.removeClass(
				this.ui.buttons.buttons.clear.node,
				'disabled'
			)
		}
	}