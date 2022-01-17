function() {
			if( rtl ) {
				return ( $( '#right-navigation' ).position().left + $( '#right-navigation' ).width() )
					> $( '#left-navigation' ).position().left;
			} else {
				return ( $( '#left-navigation' ).position().left + $( '#left-navigation' ).width() )
					> $( '#right-navigation' ).position().left;
			}
		}