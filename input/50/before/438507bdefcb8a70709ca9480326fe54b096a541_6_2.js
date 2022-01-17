function() {
				var request = $(this).data( 'request' );
				// If the delay setting has caused the fetch to have not even happend yet, the request object will
				// have never been set
				if ( request && $.isFunction( request.abort ) ) {
					request.abort();
					$(this).removeData( 'request' );
				}
			}