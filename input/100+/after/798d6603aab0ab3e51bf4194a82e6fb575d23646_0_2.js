function( feed ) {

						entries[ entryCounter ].source = this.source;

						entries[ entryCounter ].publishedDateRaw = this.publishedDateRaw;

						entries[ entryCounter ].feedUrl = data.responseData.feed.feedUrl;

						entries[ entryCounter ].feedTitle = data.responseData.feed.title;

						entries[ entryCounter ].feedLink = data.responseData.feed.link;

						entries[ entryCounter ].feedDescription = data.responseData.feed.description;

						entries[ entryCounter ].feedAuthor = data.responseData.feed.author;

						

						deepEqual( this, entries[ entryCounter ] );

						entryCounter++;



						if ( entryCounter === entries.length ) {

							timeout.teardown( );

						}

					}