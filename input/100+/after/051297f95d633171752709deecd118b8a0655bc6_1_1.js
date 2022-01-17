function( event ) {

			this._highlightMatchingCharacters();

			// make sure that when the autocomplete list opens and nothing was considered a valid choice, we just

			// select the first entry as the valid choice (see getResultSetMatch() for details)

			this._onInputRegistered();

		}