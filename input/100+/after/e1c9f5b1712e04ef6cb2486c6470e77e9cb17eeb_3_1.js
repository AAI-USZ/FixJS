function (Aloha,
			 Plugin,
			 jQuery,
			 ContentHandlerManager,
			 WordContentHandler,
			 GenericContentHandler, 
			 OembedContentHandler,
			 SanitizeContentHandler,
			 BlockelementContentHandler) {
	'use strict';

	/**
	 * Register the plugin with unique name
	 */
	var ContentHandlerPlugin = Plugin.create('contenthandler', {
		settings : {},
		dependencies : [],
		init : function () {
			var that = this,
				handler, cc,
				contentHandler = [ 'word', 'generic', 'sanitize', 'blockelement' ], //  'oembed' deactivated
				i, j = contentHandler.length;

			// Register available content handler
			for (i = 0; i < j; i++) {
				handler = contentHandler[i];
				cc = handler.charAt(0).toUpperCase() + handler.slice(1);
				ContentHandlerManager
					.register(handler, eval(cc + 'ContentHandler'));
			}
		}
	});

	return ContentHandlerPlugin;
}