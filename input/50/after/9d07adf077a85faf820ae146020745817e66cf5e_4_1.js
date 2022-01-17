function( key, defaultValue ) {
							if ( this[key] ) {
								return this[key];
							} else if ( defaultValue ) {
								return defaultValue;
							} else {
								return key;
							}
						}