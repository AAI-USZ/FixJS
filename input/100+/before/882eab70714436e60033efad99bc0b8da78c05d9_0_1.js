function( assert, index ) {
			if ( ! Queue.objects.length ) {
				console.log( '====OBJECTS NOT FOUND', Queue.modules );
				return false;
			}

			// Looking for specific key in queue object
			if ( MUnit.isString( assert.options.queue ) ) {
				MUnit.each( Queue.objects, function( object, i ) {
					if ( object[ assert.options.queue ] ) {
						Queue.modules[ index ] = null;
						Queue.objects.splice( i, 1 );
						assert.queue = object;
						assert.callback( object, assert );
						found = true;
						return false;
					}
				});
			}
			// Any queue will do
			else {
				Queue.modules[ index ] = null;
				assert.queue = Queue.objects.shift();
				assert.callback( assert.queue, assert );
				found = true;
			}

			// If queue is found for assert object, then mark it
			if ( found && ! assert._closed ) {
				// No limit on expected tests, assume synchronous
				// And if timeout is explicetely null'd out, assume synchronous
				if ( ! assert.options.expect || ! assert.options.timeout ) {
					assert.close();
				}
				// Attach timeout while the module is running
				else {
					assert._timeid = setTimeout(function(){
						if ( ! assert._closed ) {
							assert.close();
						}
					}, assert.options.timeout);
				}
			}
		}