function( relatedInterface, event ) {
		if( event.which === $.ui.keyCode.ESCAPE ) {
			this._toolbar.editGroup.btnCancel.doAction();
		}
	}