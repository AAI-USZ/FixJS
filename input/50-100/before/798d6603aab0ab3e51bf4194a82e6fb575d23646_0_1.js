function( ) {

		var to = setTimeout( function( ) {

			ok( false, 'Timed out' );

			start( );

		}, 10000 );



		$( '#qunit-fixture' ).append( '<div id="feeds" />' );

		$( '#feeds' ).feeds( {

			feeds: {

				'google': 'http://googleblog.blogspot.com/atom.xml'

			},

			onComplete: function( entries ) {

				ok( true );

				clearTimeout( to );

				start( );

			}

		} );

	}