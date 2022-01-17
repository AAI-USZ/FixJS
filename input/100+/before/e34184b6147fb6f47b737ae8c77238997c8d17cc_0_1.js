function( url ){

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
				});

				return this;
			}