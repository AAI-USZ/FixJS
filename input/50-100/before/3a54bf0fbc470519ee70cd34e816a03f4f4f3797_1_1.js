function() {
				self.editableValue.queryApi = function( deferred, apiAction ) {
					deferred.reject( 'error', self.errors[0] ).promise();
				};
			}