function() {
				var pairs = {},
					key;
				for( var i = 0; i < localStorage.length; ++i ) {
					key = localStorage.key( i );
					if( key.split( '.' )[0] === 'Settings' ) {
						pairs[key] = localStorage.getItem( key );
					}
				}
				return pairs;
			}