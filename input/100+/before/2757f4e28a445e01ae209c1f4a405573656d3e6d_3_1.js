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

			var proxyUrl = mw.getConfig( 'Mw.XmlProxyUrl' );

			if( !proxyUrl ){

				mw.log("Error: mw.KAds : missing kaltura proxy url ( can't load ad ) ");

				return ;

			}

			$.getJSON( proxyUrl + '?url=' + encodeURIComponent( this.getSrc() ) + '&callback=?', function( result ){

				if( result['http_code'] == 'ERROR' || result['http_code'] == 0 ){

					mw.log("Error: loading " + _this.getSrc() );

					callback(false);

					return ;

				}

				// parse the MRSS:

				var xmlDoc =  $.parseXML( result['contents'] );

				_this.$rss = $( xmlDoc );

				callback( _this.$rss );

			});

		}

	}