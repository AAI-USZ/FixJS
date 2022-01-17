function( e, contents ) {
							if ( e ) {
								track.error( e );
							}
							else {
								try {
									self._ignore[ key ] = Nodelint.Depends.JSON5.parse( contents );
									track.mark( key, true );
								}
								catch ( jsonError ) {
									track.error( jsonError );
								}
							}
						}