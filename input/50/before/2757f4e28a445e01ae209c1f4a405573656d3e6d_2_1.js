function( jqXHR, textStatus, errorThrown ){
						mw.log( "mw.ajaxProxy :: First cross domain request failed, trying with proxy" );
						_this.proxy();
					}