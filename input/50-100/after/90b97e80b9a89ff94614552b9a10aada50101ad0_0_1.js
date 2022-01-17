function( e, contents ) {
							if ( e ) {
								track.error( e );
							}
							else {
								try {
									self._ignore[ key ] = Nodelint.Depends.JSON5.parse( contents );
								}
								catch ( jsonError ) {
									self._ignore[ key ] = {};
									self.error( 'Unable to parse lintignore file ' + key );
								}

								track.mark( key, true );
							}
						}