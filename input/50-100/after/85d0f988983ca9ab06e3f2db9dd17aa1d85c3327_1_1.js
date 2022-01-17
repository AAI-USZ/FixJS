function ( response )
				{
					try {
						// Extract spec from source
						var spec = new Spec( String( specPattern.exec( unescape( String( response ) ) )[ 1 ] ) );
						if ( !spec ) return;

						// Cache spec
						cache.set( id, JSON.stringify( spec.data ) );

						callback( spec );
					} catch ( e ) {
						cache.set( id, "unavailable" );
					}
				}