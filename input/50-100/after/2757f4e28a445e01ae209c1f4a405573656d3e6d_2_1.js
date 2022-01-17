function( options ) {
		
		// Check if we have success callback
		if( ! $.isFunction( options.success ) ) {
			mw.log( "mw.ajaxProxy :: Error: missing success callback." );
			return ;
		}
		
		// Check for url
		if( ! options.url ) {
			mw.log( "mw.ajaxProxy :: Error: missing url to proxy." );
		}
		
		// Setup default vars
		var defaults = {
			error: function() {},
			proxyUrl: mw.getConfig( 'Mw.XmlProxyUrl' ),
			proxyType: 'jsonp',
			startWithProxy: false
		};
		
		// Merge options with defaults
		this.options = $.extend({}, defaults, options);
		
		// Make request
		this.ajax();
	}