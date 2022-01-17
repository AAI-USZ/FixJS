function( callback ){

		var _this = this;

		// check if we already have the $rss loaded

		if( this.$rss ){

			callback( this.$rss );

			return ;

		}

		// Check if we have the source pre-loaded:

		if( this.getSrcPayLoad() ) {

			var xmlDoc =  $.parseXML( this.getSrcPayLoad() );

			this.$rss = $( xmlDoc );

			callback( _this.$rss );

			return ;

		}





		// Show an error if a cross domain request:

		if( mw.isLocalDomain( this.getSrc() ) ) {

			// Note this only works with local sources

			$.get( mw.absoluteUrl( this.getSrc() ), function( data ){

				// jQuery already converts data into xmlDoc so the following is not needed:

				// var xmlDoc =  $.parseXML( data );

				_this.$rss = $( data );

				callback( _this.$rss );

			});

		} else {

			new mw.ajaxProxy({

				url: _this.getSrc(),

				success: function( resultXML ) {

					_this.$rss = $( resultXML );

					callback( _this.$rss );				

				},

				error: function() {

					mw.log("Error: loading " + _this.getSrc() );

					callback(false);

					return ;					

				},

				startWithProxy: true

			});

		}

	}