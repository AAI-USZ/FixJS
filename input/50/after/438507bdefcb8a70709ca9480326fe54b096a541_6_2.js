function () {
				var jqXhr = $(this).data( 'request' );
				// If the delay setting has caused the fetch to have not even happend yet,
				// the jqXHR object will have never been set.
				if ( jqXhr && $.isFunction ( jqXhr.abort ) ) {
					jqXhr.abort();
					$(this).removeData( 'request' );
				}
			}