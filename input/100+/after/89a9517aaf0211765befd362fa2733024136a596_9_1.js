function enforce ( $editable, placeHolderListString ) {
		// Check if this editable is configured to enforce lists
		if ( jQuery.inArray( $editable[ 0 ], listEnforcedEditables ) === -1 ) {
			return;
		}

		// Remove all temporary <br>s in the editable, which we may have
		// inserted when we activated this editable and found it empty. These
		// <br>s are needed to make the otherwise emty <li> visible (in IE).
		$editable.find( '.aloha-end-br' ).remove();

		// Check for the presence of at least one non-empty list. We consider
		// a list to be not empty if it has atleast one item whose contents are
		// more than a single (propping) <br> tag.

		var hasList = false;

		$editable.find( 'li' ).each( function(){
			// nb: jQuery text() method returns the text contents of the
			// element without <br>s being rendered.
			if ( jQuery.trim( jQuery( this ).text() ) !== '' ) {
				hasList = true;
				// Stop looking for lists as soon as we find our first
				// non-empty list
				return false;
			}
		} );

		// If we found no non-empty list, then we add our empty dummy list that
		// the user can work with.
		if ( !hasList ) {
			$editable.html( placeHolderListString );
		}

		// Concatinate all top-level lists into the first, before, thereby
		// merging all top-level lists into one.
		var $lists = $editable.find( '>ul,>ol' ),
		    j = $lists.length,
		    i;
		if ( j > 1 ) {
			var $firstList = jQuery( $lists[0] );
			for ( i = 1; i < j; ++i ) {
				$firstList.append( jQuery( $lists[ i ] ).find( '>li' ) );
				jQuery( $lists[ i ] ).remove();
			}
		}

		// Remove all top-level elements which are not lists
		$editable.find( '>*:not(ul,ol)' ).remove();
	}