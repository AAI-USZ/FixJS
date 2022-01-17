function( options ) {
		// Setup default error callback
		if( ! $.isFunction( options.error ) ) {
			options.error = function() {};
		}
		
		this.options = options;
		this.ajax();
	}