function() {
			var element = $( this );
			if ( element.is( "[title]" ) ) {
				element
					.data( "tooltip-title", element.attr( "title" ) )
					.attr( "title", "" );
			}
		}