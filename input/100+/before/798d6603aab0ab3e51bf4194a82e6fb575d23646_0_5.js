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

			preprocess: function( feed ) {

				this.foo = 'bar';

				this.title = 'generic';

			},

			onComplete: function( entries ) {

				expect( entries.length * 2 );

				for ( var i in entries ) {

					equal( entries[ i ].foo, 'bar', 'property was added to entry' );

					equal( entries[ i ].title, 'generic', 'entry title was edited' );

				}

				clearTimeout( to );

				start( );

			}

		} );

	}