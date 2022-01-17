function( url, retryDelay ){

				var self = this
					;

				url = url || self.options.url;

				// just deal with json for now...
				require([ 'plugins/json!'+url ], function( data ){

					if ( self.options.filter ){

						data = self.options.filter( data );
					}

					self.add( data );

					self.emit('fetch');

				}, function(){
					// error callback
					retryTimeout = ~~retryTimeout + 1;

					setTimeout(function(){

						self.fetch( url, retryTimeout );
						// grow the delay every time it tries
					}, Math.pow(2,retryTimeout)*1000);
				});

				return this;
			}