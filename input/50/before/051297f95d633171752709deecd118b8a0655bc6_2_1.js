function( relatedInterface, event ) {
		if( event.which == 27 ) { // ESC key
			this._toolbar.editGroup.btnCancel.doAction();
		}
	}