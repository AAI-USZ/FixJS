function initSanitize () {
		var 
			filter = [ 'restricted', 'basic', 'relaxed' ],
			config = Aloha.defaults.supports; // @TODO: needs to be implemented into all plugins
		
		// @TODO think about Aloha.settings.contentHandler.sanitize name/options
		if ( Aloha.settings.contentHandler.sanitize && jQuery.inArray(Aloha.settings.contentHandler.sanitize, filter) > -1 ) {
			config = Aloha.defaults.sanitize[Aloha.settings.contentHandler.sanitize];
		} else {
			// use relaxed filter by default
			config = Aloha.defaults.sanitize.relaxed;
		}
		
		// @TODO move to Aloha.settings.contentHandler.sanitize.allows ?
		if ( Aloha.settings.contentHandler.allows ) {
			config = Aloha.settings.contentHandler.allows;
		}

		// add a filter to stop cleaning elements with contentEditable "false"
		config.filters = [function( elem ) {
			return elem.contentEditable != "false";
		}];

		sanitize = new Sanitize( config );
	}