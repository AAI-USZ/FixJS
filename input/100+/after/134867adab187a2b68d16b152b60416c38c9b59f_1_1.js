function() {
		$( wikibase ).triggerHandler( 'startItemPageEditMode', this );

		var degrade = $.proxy( function() {
			if( !this.preserveEmptyForm ) {
				$( wikibase ).triggerHandler( 'stopItemPageEditMode', this );
				// remove value totally
				this.destroy();
				this._subject.empty().remove();
				if( this.onAfterRemove !== null ) {
					this.onAfterRemove(); // callback
				}
			} else {
				// delete value but keep empty input form
				this._reTransform( true );
				this.startEditing();
				this.removeFocus(); // don't want the focus immediately after removing the value
			}
		}, this );

		if( this.isPending() ) {
			// no API call necessary since value hasn't been stored yet...
			degrade();
			return $.Deferred().resolve().promise(); // ...return new promise nonetheless
		} else {
			var action = this.preserveEmptyForm ? this.API_ACTION.SAVE_TO_REMOVE : this.API_ACTION.REMOVE;

			// store deferred so we can return it when this is called again while still running
			var promise = this.performApiAction( action )
				.then( degrade )
				.promise();

			return promise;
		}
	}