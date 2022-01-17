function( entries ) {

				expect( entries.length * 2 );

				for ( var i in entries ) {

					equal( entries[ i ].foo, 'bar', 'property was added to entry' );

					equal( entries[ i ].title, 'generic', 'entry title was edited' );

				}

				clearTimeout( to );

				start( );

			}