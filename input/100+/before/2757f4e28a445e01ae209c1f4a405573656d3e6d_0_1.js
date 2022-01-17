function( adUrl, callback ){

		var _this = this;

		mw.log('AdLoader :: load Ad: ', adUrl);

		// See if we should even try to request via xhr:

		if ( !('withCredentials' in new XMLHttpRequest()) && !(typeof XDomainRequest !== "undefined")){

			_this.loadFromProxy( adUrl, callback );

			return ;

		}

		// First try to directly load the ad url:

		try {

			$.ajax({

				url: adUrl,

				success: function( data ) {

					_this.handleResult( data, callback );

				},

				error: function( jqXHR, textStatus, errorThrown ){

					// try to load the file with the proxy:

					_this.loadFromProxy( adUrl, callback );

				}

			});

		} catch ( e ){

			mw.log( "AdLodaer :: first cross domain request failed, trying with proxy" );

		}

	}