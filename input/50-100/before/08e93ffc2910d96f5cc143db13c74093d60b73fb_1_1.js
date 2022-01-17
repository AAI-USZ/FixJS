function( value ) {
			if ( ! value.message ) {
				throw new Error( linter + " didn't return a message for a '" + type + "', bad formatting" );
			}
			else if ( ! value.line ) {
				throw new Error( linter + " didn't return a line number for a '" + type + "', bad formatting" );
			}
			else if ( ! value.character ) {
				throw new Error( linter + " didn't return a character number for a '" + type + "', bad formatting" );
			}

			// Force path addition
			if ( ! value.path ) {
				value.path = path;
			}
		}