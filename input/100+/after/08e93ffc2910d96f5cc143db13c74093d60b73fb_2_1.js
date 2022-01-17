function( object ) {
			if ( ! object ) {
				throw "Undefined Rule For '" + name + "' in " + root;
			}
			else if ( ! Nodelint.isObject( object ) ) {
				object = { match: object };
			}
			else if ( ! object.match || ! object[ name ] ) {
				throw "Invalid Rule For '" + name + "' in " + root;
			}

			// If string matching, prefix the entry to the root directory,
			// and see if it should be converted to regex
			var match = object.match;
			if ( Nodelint.isString( match ) ) {
				match = Nodelint.normalizePath( root + '/' + match );

				// Attach a global identifier to the end of directories
				// to force regex conversion
				if ( match[ match.length - 1 ] ) {
					match += '*';
				}

				// If path has a global match '*' character, then regex it
				if ( match.indexOf( '*' ) !== -1 ) {
					match = Nodelint.regexPath( match );
				}

				// Reassign changes
				object.match = match;
			}

			// Normalize
			object = Nodelint.extend( true, {}, object, {
				priority: object.priority || 0.5,
				added: object.added || Date.now(),
				isString: Nodelint.isString( object.match ),
				isRegExp: Nodelint.isRegExp( object.match ),
				isFunction: Nodelint.isFunction( object.match ),
				isMatch: function( path ) {
					return ( object.isString && path == object.match ) ||
						( object.isRegExp && object.match.exec( path ) ) ||
						( object.isFunction && object.match( path, object, self, self.nodelint ) );
				}
			});

			// Re-add object
			list.push( object );
		}