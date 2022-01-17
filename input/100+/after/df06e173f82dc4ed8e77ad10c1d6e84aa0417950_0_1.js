function( useProxy ) {
			var _this = this;
			
			if( _this.options.startWithProxy ) {
				_this.proxy();
				return ;
			}
			
			var ajaxOptions = {
				success: function( result ) { 
					_this.handleResult( result ); 
				}
			};
			
			if( useProxy ) {
				ajaxOptions.url = _this.options.proxyUrl + encodeURIComponent( _this.options.url );
				ajaxOptions.error = function() { 
					mw.log( "mw.ajaxProxy :: Error: request failed with proxy." );
					_this.options.error();
				};
			} else {
				ajaxOptions.url = _this.options.url;
				ajaxOptions.error = function( jqXHR, textStatus, errorThrown ){
					mw.log( "mw.ajaxProxy :: Error: cross domain request failed, trying with proxy" );
					_this.proxy();
				};
			}
			
			// make the request
			try {
				$.ajax( ajaxOptions );
			} catch ( e ){
				// do nothing
			}
		}