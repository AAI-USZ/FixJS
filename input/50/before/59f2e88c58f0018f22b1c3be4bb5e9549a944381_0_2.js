function() {
			var element = $( this );
			if ( element.data( "tooltip-title" ) ) {
				element.attr( "title", element.data( "tooltip-title" ) );
			}
		}