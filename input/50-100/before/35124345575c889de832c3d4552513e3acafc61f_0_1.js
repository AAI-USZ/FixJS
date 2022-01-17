function( event ) {
			var size = sizes(480, 320, 0, 1),
				w = size.width,
				h = size.height;
				
			$( "#mapiframe" )
				.prop( "width", w )
				.prop( "height", h );
		}