function( path ) {
					return ( object.isString && path == object.match ) ||
						( object.isRegExp && object.match.exec( path ) ) ||
						( object.isFunction && object.match( path, object, self, self.nodelint ) );
				}