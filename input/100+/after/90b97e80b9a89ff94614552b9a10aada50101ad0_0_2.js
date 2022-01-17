function( file ) {
			var key = path + file, full;

			track.mark( key );
			fs.stat( key, function( e, stat ) {
				// There shouldn't be any errors, unless the file isn't accessible
				if ( e ) {
					track.error( e );
				}
				// Follow the rabbit hole
				else if ( stat.isDirectory() ) {
					full = key[ key.length - 1 ] == '/' ? key : key + '/';

					if ( options.ignore( full ) ) {
						self.warn( 'Ignoring ' + full );
						return track.mark( key, true );
					}

					self.dir( full, function( e ) {
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
			});
		}