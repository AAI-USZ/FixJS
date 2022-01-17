function( e, stat ) {
				// There shouldn't be any errors, unless the file isn't accessible
				if ( e ) {
					track.error( e );
				}
				// Follow the rabbit hole
				else if ( stat.isDirectory() ) {
					if ( options.ignore( key ) ) {
						self.warn( 'Ignoring ' + key );
						return track.mark( key, true );
					}

					self.dir( key + '/', function( e ) {
						if ( e ) {
							track.error( e );
						}
						else {
							track.mark( key, true );
						}
					});
				}
				// Render each file (will handle ignores internally)
				else {
					self.render( key, options, function( e ) {
						if ( e ) {
							track.error( e );
						}
						else {
							track.mark( key, true );
						}
					});
				}
			}