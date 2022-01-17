function( data ) {
							if ( $.isArray( data ) && 1 in data ) {
								$this.suggestions( 'suggestions', data[1] );
							}
						}