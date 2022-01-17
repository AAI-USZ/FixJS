function( ) {

		timeout.setup( );

		$( '#feeds' ).feeds( {

			feeds: {

				'google': 'http://googleblog.blogspot.com/atom.xml'

			},

			onComplete: function( entries ) {

				equal( this, $( '#feeds' )[ 0 ] );

				timeout.teardown( );

			}

		} );

	}