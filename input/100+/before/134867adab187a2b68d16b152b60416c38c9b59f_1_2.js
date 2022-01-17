function( save ) {
		// create promise which will ONLY be returned in case nothing is saved AND not pending
		var promise = $.Deferred().resolve().promise();
		promise.promisor = {};
		promise.promisor.apiAction = this.API_ACTION.NONE;

		if( !this.isInEditMode() ) {
			return promise;
		}

		if ( !save ) {
			this._reTransform( false );
			if( this.isPending() ) { // cancel pending edit...
				promise = this.remove(); // not yet existing value, no state to go back to -> do not trigger 'afterStopEditing' here!
			} else { // cancel...
				return promise;
			}
		} else {
			promise = this.save(); // save... (will call all the API stuff)
		}

		var wasPending = ( typeof promise.promisor.wasPending !== 'undefined' )
				? promise.promisor.wasPending
				: this.isPending();
		// store deferred so we can return it when this is called again while still running
		return promise
		.done(
			$.proxy( function() {
				$( this ).triggerHandler( 'afterStopEditing', [ save, wasPending ] );
			}, this )
		);

	}