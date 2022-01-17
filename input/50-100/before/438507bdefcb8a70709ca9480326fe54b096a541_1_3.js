function( eleWidth ) {
			if( rtl ){
				return ( $( '#right-navigation' ).position().left + $( '#right-navigation' ).width() + 1 )
					< ( $( '#left-navigation' ).position().left - eleWidth );
			} else {
				return ( $( '#left-navigation' ).position().left + $( '#left-navigation' ).width() + 1 )
					< ( $( '#right-navigation' ).position().left - eleWidth );
			}
		}