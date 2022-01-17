function( adUrl, callback ){

		var _this = this;

		mw.log('AdLoader :: load Ad: ', adUrl);

		

		// Make ajax request with fallback to proxy service

		new mw.ajaxProxy({

			url: adUrl,

			success: function( resultXML ) {

				_this.handleResult( resultXML, callback );

			},

			error: function( error ) {

				mw.log("Error: AdLoader failed to load:" + adUrl);

				callback({});				

			}

		});

	}