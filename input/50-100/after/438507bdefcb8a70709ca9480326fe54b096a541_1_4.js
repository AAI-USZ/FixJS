function () {
			if ( rtl ) {
				return ( $( '#right-navigation' ).position().left + $( '#right-navigation' ).width() )
					> $( '#left-navigation' ).position().left;
			}
			return ( $( '#left-navigation' ).position().left + $( '#left-navigation' ).width() )
				> $( '#right-navigation' ).position().left;
		}