function() {
		if( this.isInEditMode() ) {
			return false;
		}
		this._isInEditMode = true;
		this._subject.addClass( this.UI_CLASS + '-ineditmode' );

		$.each( this._interfaces, function( index, elem ) {
			elem.startEditing();
		} );

		/**
		 * only propagate start of edit mode (disabling other actions) when editable value is not
		 * disabled itself; this refers to initially having multiple empty values whose edit modes
		 * are started instantly when loading the page
		 */
		if ( !this._toolbar.isDisabled() ) {
			$( wikibase ).triggerHandler( 'startItemPageEditMode', this );
		}

		return true;
	}