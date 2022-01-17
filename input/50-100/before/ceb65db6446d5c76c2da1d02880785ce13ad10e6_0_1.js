function( context, args ) {
					if ( !cancelled && !fired && !firing ) {
						// make sure args are available (#8421)
						args = args || [];
						firing = 1;
						try {
							while( callbacks[ 0 ] ) {
								callbacks.shift().apply( context, args );
							}
						}
						catch(e) {
							// damn you IE <= 7
						}
						finally {
							fired = [ context, args ];
							firing = 0;
						}
					}
					return this;
				}