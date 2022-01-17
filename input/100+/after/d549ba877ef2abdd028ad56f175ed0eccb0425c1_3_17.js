function( range ) {

			// set readonly attributes

			this._nativeSelection.addRange( range );

			// We will correct the range after rangy has processed the native

			// selection range, so that our correction will be the final fix on

			// the range according to the guarentee's that Aloha wants to make

			this._nativeSelection._ranges[ 0 ] = correctRange( range );



			// make sure, the old Aloha selection will be updated (until all implementations use the new AlohaSelection)

			Aloha.Selection.updateSelection();

		}