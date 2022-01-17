function( deferred, apiAction ) {
		var api = new mw.Api();
		var apiCall = this.getApiCallParams( apiAction );
		api.post( apiCall, {
			ok: function( response ) {
				deferred.resolve( response );
			},
			err: function( textStatus, response ) {
				deferred.reject( textStatus, response );
			}
		} );
	}