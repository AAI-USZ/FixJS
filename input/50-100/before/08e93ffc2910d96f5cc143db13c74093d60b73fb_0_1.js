function( e, contents ) {
			if ( e ) {
				return callback( e );
			}

			self.lint( path, contents.replace( rshebang, '' ), settings, callback );
		}