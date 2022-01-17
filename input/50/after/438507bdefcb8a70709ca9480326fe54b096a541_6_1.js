function ( data ) {
							if ( $.isArray( data ) && data.length ) {
								$el.suggestions( 'suggestions', data[1] );
							}
						}