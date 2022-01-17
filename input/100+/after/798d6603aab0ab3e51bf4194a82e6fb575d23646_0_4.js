function( ) {

		timeout.setup( );

		

		var entries1 = {};

		var entries2 = {};



		function loadEntries1( ) {

			$.ajax( {

				url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0',

				dataType: 'jsonp',

				data: {

					q: 'http://googleblog.blogspot.com/atom.xml',

					num: -1

				},

				success: function( data ) {

					entries1 = data.responseData.feed.entries;

					for ( var i in entries1 ) {

						entries1[ i ].source = 'feed1';

						entries1[ i ].publishedDateRaw = entries1[ i ].publishedDate;

						entries1[ i ].feedUrl = data.responseData.feed.feedUrl;

						entries1[ i ].feedTitle = data.responseData.feed.title;

						entries1[ i ].feedLink = data.responseData.feed.link;

						entries1[ i ].feedDescription = data.responseData.feed.description;

						entries1[ i ].feedAuthor = data.responseData.feed.author;

					}

					loadEntries2( );

				}

			} );

		}



		function loadEntries2( ) {

			$.ajax( {

				url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0',

				dataType: 'jsonp',

				data: {

					q: 'http://blog.jquery.com/feed/',

					num: -1

				},

				success: function( data ) {

					entries2 = data.responseData.feed.entries;

					for ( var i in entries2 ) {

						entries2[ i ].source = 'feed2';

						entries2[ i ].publishedDateRaw = entries2[ i ].publishedDate;

						entries2[ i ].feedUrl = data.responseData.feed.feedUrl;

						entries2[ i ].feedTitle = data.responseData.feed.title;

						entries2[ i ].feedLink = data.responseData.feed.link;

						entries2[ i ].feedDescription = data.responseData.feed.description;

						entries2[ i ].feedAuthor = data.responseData.feed.author;

					}

					loadFeeds( );

				}

			} );

		}



		function loadFeeds( ) {

			$( '#feeds' ).feeds( {

				feeds: {

					'feed1': 'http://googleblog.blogspot.com/atom.xml',

					'feed2': 'http://blog.jquery.com/feed/'

				},

				onComplete: function( entries ) {

					expect( entries1.length + entries2.length );



					var feed1Pointer = 0;

					var feed2Pointer = 0;



					for ( var i in entries ) {

						var entry = entries[ i ];

						

						var expected = null;

						if ( entry.source === 'feed1' ) {

							expected = entries1[ feed1Pointer ];

							feed1Pointer++;

						} else {

							expected = entries2[ feed2Pointer ];

							feed2Pointer++;

						}



						deepEqual( entry, expected, 'correct entry passed to onComplete' );

					}



					timeout.teardown( );

				}

			} );

		}

		

		loadEntries1( );

	}