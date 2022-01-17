function( value ) {
				pValues[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments ) : value;
				deferred.notifyWith( promise, pValues );
			}