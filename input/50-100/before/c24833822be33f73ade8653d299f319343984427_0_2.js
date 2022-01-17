function( prop ) {

					if ( script ) {

						script.onload = script.onreadystatechange = script.onerror = null;
						script.parentNode.removeChild( script );

						for( prop in script ) {
							try {
								script[ prop ] = Null;
								delete script[ prop ];
							} catch( _e_ ) {}
						}

						script = Null;
					}
				}