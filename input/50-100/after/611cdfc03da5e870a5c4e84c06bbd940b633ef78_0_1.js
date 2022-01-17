function () {
			var contentHandlers = {
					'word': WordContentHandler,
					'generic': GenericContentHandler,
					'sanitize': SanitizeContentHandler,
					'blockelement': BlockelementContentHandler
					//  'oembed' deactivated
				},
				handlerName;

			// Register available content handler
			for (handlerName in contentHandlers) {
				if (contentHandlers.hasOwnProperty(handlerName)) {
					ContentHandlerManager.register(handlerName, contentHandlers[handlerName]);
				}
			}
		}