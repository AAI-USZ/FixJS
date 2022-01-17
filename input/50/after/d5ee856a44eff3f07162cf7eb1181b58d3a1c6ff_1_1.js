function( value ) {
				args[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments ) : value;
				if ( !( --count ) ) {
					deferred.resolveWith( deferred, args );
				}
			}