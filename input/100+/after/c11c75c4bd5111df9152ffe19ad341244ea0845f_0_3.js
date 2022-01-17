function() {

		// get basic input box

		var inputElement

			= window.wikibase.ui.PropertyEditTool.EditableValue.Interface.prototype._buildInputElement.call( this );



		// extend input element with autocomplete

		if ( this._currentResults !== null ) {

			inputElement.wikibaseAutocomplete( {

				source: $.proxy( function( request, response ) {

					// just matching from the beginning (autocomplete would match anywhere within the string)

					var results = $.grep( this._currentResults, function( result, i ) {

						return (

							result.label.toLowerCase().indexOf( request.term.toLowerCase() ) == 0

								|| result.site.getId().indexOf( request.term.toLowerCase() ) == 0

						);

					} );

					/*

					if some site id is specified exactly, move that site to the top for it will be the one picked

					when leaving the input field

					 */

					var additionallyFiltered = $.grep( results, function( result, i ) {

						return ( request.term == result.site.getId() );

					} );

					if ( additionallyFiltered.length > 0 ) { // remove site from original result set

						for ( var i in results ) {

							if ( results[i].site.getId() == additionallyFiltered[0].site.getId() ) {

								results.splice( i, 1 );

								break;

							}

						}

					}

					// put site with exactly hit site id to beginning of complete result set

					$.merge( additionallyFiltered, results );

					response( additionallyFiltered );

				}, this ),

				close: $.proxy( function( event, ui ) {

					this._onInputRegistered();

				}, this )

			} );

		}



		inputElement.on( 'autocompleteopen', $.proxy( function( event ) {

			this._highlightMatchingCharacters();

			// make sure that when the autocomplete list opens and nothing was considered a valid choice, we just

			// select the first entry as the valid choice (see getResultSetMatch() for details)

			this._onInputRegistered();

		}, this ) );



		/**

		 * the following lines remove the highlight from the auto-complete's first menu item (which

		 * is the fallback item that automatically fills the input box when the keyboard's tab

		 * button is hit as long as the mouse cursor does not hover another item) when the menu is

		 * hovered with the mouse cursor

		 */

		inputElement.data( 'autocomplete' ).menu.element.on(

			'mouseover',

			'li',

			$.proxy( function( event ) {

				// do not remove highlight when the first item is hovered with the mouse cursor

				if (

					event.srcElement !==

						this._inputElem.data( 'autocomplete' ).menu.element.children().first()

						.children('a')[0]

				) {

					this._inputElem.data( 'autocomplete' ).menu.element.children().first()

					.children( 'a' ).removeClass( 'ui-state-hover' );

				}

			}, this )

		);

		// re-highlight first (fallback) item when moving the mouse off the menu

		inputElement.data( 'autocomplete' ).menu.element.on(

			'mouseout',

			$.proxy( function( event ) {

				this._inputElem.data( 'autocomplete' ).menu.element.children().first()

				.children( 'a' ).addClass( 'ui-state-hover' );

			}, this )

		);



		return inputElement;

	}