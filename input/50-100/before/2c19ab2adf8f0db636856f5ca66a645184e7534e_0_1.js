function() {
				var pairs = {};
				for( var i = 0, key = localStorage.key( 0 ); key !== null; key = localStorage.key( ++i ) ) {
					if( key.split( '.' )[0] === 'Settings' ) {
						pairs[key] = localStorage.getItem( key );
					}
				}
				return pairs;
			}