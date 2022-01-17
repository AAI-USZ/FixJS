function( jqXHR, textStatus, errorThrown ){
						mw.log( "mw.ajaxProxy :: Error: cross domain request failed, trying with proxy" );
						_this.proxy();
					}