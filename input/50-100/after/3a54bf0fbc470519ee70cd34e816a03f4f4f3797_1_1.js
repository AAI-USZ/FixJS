function( error ) {
				if ( error === undefined ) {
					error = 0;
				}
				self.editableValue.queryApi = function( deferred, apiAction ) {
					deferred.reject( 'error', self.errors[ error ] ).promise();
				};
			}