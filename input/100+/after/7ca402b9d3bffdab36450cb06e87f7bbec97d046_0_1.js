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

		// set the cursor into the paste div
		Aloha.getSelection().removeAllRanges();
		var newRange = Aloha.createRange();
		newRange.setStart($pasteDiv.get( 0 ), 0);
		newRange.setEnd($pasteDiv.get( 0 ), 0);
		Aloha.getSelection().addRange(newRange);

		$pasteDiv.focus();
	}