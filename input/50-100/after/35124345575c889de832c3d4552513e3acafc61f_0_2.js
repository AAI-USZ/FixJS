function( event ) {
			$("#mapiframe")
				.prop( "width", 0 )
				.prop( "height", 0 );
			$( "#mapiframe" ).contents().find( "#map_canvas" ).css( { "width": 0, "height" : 0 } );
		}