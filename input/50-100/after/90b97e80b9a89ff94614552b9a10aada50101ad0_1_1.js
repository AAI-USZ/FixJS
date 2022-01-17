function( path ) {
					return ( object.isDirectory && path.indexOf( object.match ) === 0 ) ||
						( object.isString && path == object.match ) ||
						( object.isRegExp && object.match.exec( path ) ) ||
						( object.isFunction && object.match( path, object, self, self.nodelint ) );
				}