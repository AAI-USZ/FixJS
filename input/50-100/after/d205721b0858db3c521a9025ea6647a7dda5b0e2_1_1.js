function( subject ) {
		if( this._subject !== null ) {
			// initializing twice should never happen, have to destroy first!
			this.destroy();
		}
		this._subject = $( subject );

		// make sure the value is normalized when initialized:
		this.setValue( this.getValue() );

		// disable interface when editing is restricted
		$( wikibase ).on(
			'restrictItemPageActions',
			$.proxy(
				function( event ) {
					this.disable();
				}, this
			)
		);

	}