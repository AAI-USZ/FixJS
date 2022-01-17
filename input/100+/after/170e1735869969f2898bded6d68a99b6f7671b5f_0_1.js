function( apiAction ) {
		// we have to build our own deferred since the jqXHR object returned by api.proxy() is just referring to the
		// success of the ajax call, not to the actual success of the API request (which could have failed depending on
		// the return value).
		var deferred = $.Deferred();
		var self = this;

		var waitMsg = $( '<span/>', {
			'class': this.UI_CLASS + '-waitmsg',
			'text': mw.msg( 'wikibase-' + ( apiAction === this.API_ACTION.REMOVE ? 'remove' : 'save' ) + '-inprogress' )
		} )
		.appendTo( this._getToolbarParent() ).hide();

		deferred
		.then( function( response ) {
			// fade out wait text
			waitMsg.fadeOut( 400, function() {
				self._subject.removeClass( self.UI_CLASS + '-waiting' );

				if( apiAction === self.API_ACTION.SAVE || apiAction === self.API_ACTION.SAVE_TO_REMOVE ) {
					var responseVal = self._getValueFromApiResponse( response.item );
					if( responseVal !== null ) {
						// set normalized value from response if supported by API module
						self.setValue( responseVal );
					}

					if( mw.config.get( 'wbItemId' ) === null ) {
						// if the 'save' process will create a new item, trigger the event!
						$( window.wikibase ).triggerHandler( 'newItemCreated', response.item );
					}

					waitMsg.remove();
					self._toolbar._elem.fadeIn( 300 ); // only re-display toolbar if value wasn't removed
				}
			} );
		} )
		.fail( function( textStatus, response ) {
			// remove and show immediately since we need nodes for the tooltip!
			self._subject.removeClass( self.UI_CLASS + '-waiting' );
			waitMsg.remove();
			self.enable(); // re-enabling actions and input box when saving has failed
			self._toolbar._elem.show();
			self._apiCallErr( textStatus, response, apiAction );
		} );

		/**
		 * disabling actions and input box during saving (success will stop edit mode, so no
		 * re-enabling is necessary in that case)
		 */
		this.disable();
		this._toolbar._elem.fadeOut( 200, $.proxy( function() {
			waitMsg.fadeIn( 200 );
			// do the actual API request and trigger jQuery.Deferred stuff:
			this.queryApi( deferred, apiAction );
		}, this ) );
		this._subject.addClass( this.UI_CLASS + '-waiting' );

		// add additional info to promise:
		var promise = deferred.promise();
		promise.promisor = {};
		promise.promisor.apiAction = apiAction;

		return promise;
	}