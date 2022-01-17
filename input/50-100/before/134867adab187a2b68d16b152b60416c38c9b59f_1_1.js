function() {
		if( this.isInEditMode() ) {
			return false;
		}
		this._isInEditMode = true;
		this._subject.addClass( this.UI_CLASS + '-ineditmode' );

		$.each( this._interfaces, function( index, elem ) {
			elem.startEditing();
		} );

		return true;
	}