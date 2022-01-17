function( ) {

		var to = setTimeout( function( ) {

			ok( false, 'Timed out' );

			start( );

		}, 10000 );

		

		$( '#qunit-fixture' ).append( '<div id="feeds" />' );

		$.ajax( {

			url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0',

			dataType: 'jsonp',

			data: {

				q: 'http://googleblog.blogspot.com/atom.xml',

				num: 1

			},

			success: function( data ) {

				clearTimeout( to );

				

				var properties = [ 'feedUrl', 'title', 'link', 'description', 'author' ];

				for ( var i in properties ) {

					if ( typeof data.responseData.feed[ properties[ i ] ] === 'undefined' ) {

						ok( false, 'Propery ' + properties[ i ] + ' is not defined' );

						start( );

						return;

					}

				}

				

				var feedData = {

					feedUrl: data.responseData.feed.feedUrl,

					feedTitle: data.responseData.feed.title,

					feedLink: data.responseData.feed.link,

					feedDescription: data.responseData.feed.description,

					feedAuthor: data.responseData.feed.author

				};

				

				$( '#feeds' ).feeds( {

					feeds: {

						'google': 'http://googleblog.blogspot.com/atom.xml'

					},

					max: 1,

					onComplete: function( entries ) {

						if ( typeof entries[ 0 ] === 'undefined' ) {

							ok( false, 'No entries loaded' );

							start( );

						}



						expect( feedData.length );

						for ( var i in feedData ) {

							equal( entries[ 0 ][ i ], feedData[ i ], 'property ' + i + ' was appended to entry' );

						}

						

						start( );

					}

				} );

			}

		} );

	}