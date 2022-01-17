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

			

			new mw.ajaxProxy({

				url: _this.getSrc(),

				success: function( resultXML ) {

					_this.captions = _this.getCaptions( resultXML );

					_this.loaded = true;

					mw.log("mw.TextSource :: loaded from " +  _this.getSrc() + " Found: " + _this.captions.length + ' captions' );

					callback();					

				},

				error: function() {

					mw.log("Error: TextSource Error with http response");

					_this.loaded = true;

					callback();

				}

			});

		}