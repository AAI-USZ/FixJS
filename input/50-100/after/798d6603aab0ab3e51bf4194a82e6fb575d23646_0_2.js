function( ) {

		timeout.setup( );

		$( '#feeds' ).feeds( {

			feeds: {

				'feed': 'http://thisdoesntexits.wow'

			},

			onComplete: function( entries ) {

				equal( 0, entries.length );

				timeout.teardown( );

			}

		} );

	}