function( ) {

		timeout.setup( );

		$( '#feeds' ).feeds( {

			feeds: {

				'google': 'http://googleblog.blogspot.com/atom.xml'

			},

			max: 3,

			onComplete: function( entries ) {

				equal( entries.length, 3 );

				timeout.teardown( );

			}

		} );

	}