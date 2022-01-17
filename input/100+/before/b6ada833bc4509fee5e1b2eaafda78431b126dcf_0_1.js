function redirectPaste () {
		// store the current range
		pasteRange = Aloha.getSelection().getRangeAt( 0 );
		pasteEditable = Aloha.activeEditable;

		// store the current scroll position
		$pasteDiv.css( {
			top: $window.scrollTop(),
			left: $window.scrollLeft() - 200
		} );
		
		// empty the pasteDiv
		$pasteDiv.contents().remove();
		
		if ( pasteEditable ) {
			// TODO test in IE!
			pasteEditable.obj.blur();
		}
		
		GENTICS.Utils.Dom.setCursorInto( $pasteDiv.get( 0 ) );
		
		$pasteDiv.focus();
	}