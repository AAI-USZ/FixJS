function( e, contents ) {
			if ( e ) {
				return callback( e );
			}

			// Remove the posible shebang line for node files
			contents = contents.replace( rshebang, '' );

			// Only pass through linter if the file exists
			if ( contents.length ) {
				self.lint( path, contents, settings, callback );
			}
			else {
				callback();
			}
		}