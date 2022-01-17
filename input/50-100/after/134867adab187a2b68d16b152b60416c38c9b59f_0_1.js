function( disable ) {
		if( disable ) {
			this._subject.addClass( this.UI_CLASS + '-disabled' );
			if( this.isInEditMode() ) {
				this._disableInputElement();
			}
		} else {
			this._subject.removeClass( this.UI_CLASS + '-disabled' );
			if( this.isInEditMode() ) {
				this._enableInputElement();
			}
		}
		return true;
	}