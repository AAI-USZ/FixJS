function() {
		if ( this._isOpen ) {
			return;
		}

		if (document.activeElement) {
			this.triggerEl = $( document.activeElement )
		}

		var hasFocus,
			options = this.options,
			uiDialog = this.uiDialog;

		this._size();
		this._position( options.position );
		uiDialog.show( options.show );
		this.overlay = options.modal ? new $.ui.dialog.overlay( this ) : null;
		this.moveToTop( true );

		// prevent tabbing out of modal dialogs
		if ( options.modal ) {
			this._on( uiDialog, { keydown: function( event ) {
				if ( event.keyCode !== $.ui.keyCode.TAB ) {
					return;
				}

				var tabbables = $( ":tabbable", uiDialog ),
					first = tabbables.filter( ":first" ),
					last  = tabbables.filter( ":last" );

				if ( event.target === last[0] && !event.shiftKey ) {
					first.focus( 1 );
					return false;
				} else if ( event.target === first[0] && event.shiftKey ) {
					last.focus( 1 );
					return false;
				}
			}});
		}

		// set focus to the first tabbable element in the content area or the first button
		// if there are no tabbable elements, set focus on the dialog itself
		hasFocus = this.element.find( ":tabbable" );
		if ( !hasFocus.length ) {
			hasFocus = this.uiDialogButtonPane.find( ":tabbable" );
			if ( !hasFocus.length ) {
				hasFocus = uiDialog;
			}
		}
		hasFocus.eq( 0 ).focus();

		this._isOpen = true;
		this._trigger( "open" );

		return this;
	}