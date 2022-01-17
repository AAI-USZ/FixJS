function( relatedInterface ) {
		if( ! relatedInterface.isInEditMode() ) {
			return;
		}

		var value = this.getValue();
		var isInvalid = !this.validate( value );

		// can't save if invalid input (except it is empty, in that case save == remove) OR same as before
		var disableSave = ( isInvalid && !this.isEmpty() ) || this.valueCompare( this.getInitialValue(), value );

		// can't cancel if empty before except the edit is pending (then it will be removed)
		var disableCancel = !this.isPending() && this.valueCompare( this.getInitialValue(), null );

		this._toolbar.editGroup.btnSave.setDisabled( disableSave );
		this._toolbar.editGroup.btnCancel.setDisabled( disableCancel );

		/**
		 * propagade stopping of edit mode (enabling other actions) when all editable value actions
		 * are disabled; this happens for empty values whose edit modes are triggered directly
		 * during page loading
		 */
		if ( !this.isPending() ) {
			if ( disableSave && disableCancel ) {
				$( wikibase ).triggerHandler( 'stopItemPageEditMode', this );
			} else if ( this.valueCompare( this.getInitialValue(), null ) ) {
				$( wikibase ).triggerHandler( 'startItemPageEditMode', this );
			}
		}

	}