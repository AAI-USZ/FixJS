function( callback ) {

			var _this = this;

			mw.log("TextSource:: load src "+ _this.getSrc() );



			// Setup up a callback ( in case it was not defined )

			if( !callback ){

				callback = function(){ return ; };

			}



			// Check if the captions have already been loaded:

			if( this.loaded ){

				return callback();

			}



			// Try to load src via XHR source

			if( !this.getSrc() ) {

				mw.log( "Error: TextSource no source url for text track");

				return callback();

			}

			try {

				$.ajax({

					url: _this.getSrc(),

					success: function( data ) {

						_this.captions = _this.getCaptions( data );

						_this.loaded = true;

						mw.log("mw.TextSource :: loaded from " +  _this.getSrc() + " Found: " + _this.captions.length + ' captions' );

						callback();

					},

					error: function( jqXHR, textStatus, errorThrown ){

						// try to load the file with the proxy:

						_this.loadViaProxy( function(){

							callback();

							_this.loaded = true;

						});

					}

				});

			} catch ( e ){

				mw.log( "TimedText source:: first cross domain request failed, trying via proxy" );

			}

		}