function( subject ) {
		if( this._subject !== null ) {
			// initializing twice should never happen, have to destroy first!
			this.destroy();
		}
		this._editableValues = [];

		this._subject = $( subject );
		this._subject.addClass( this.UI_CLASS );

		this._initEditToolForValues();
		this._initToolbar();

		// call for first rendering of additional stuff of the view:
		this._onRefreshView( 0 );
	}