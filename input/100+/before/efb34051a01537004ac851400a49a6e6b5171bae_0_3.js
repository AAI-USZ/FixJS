function publish(topic /*, arg, arg, ..*/) {
			var handlers;
			var handler;

			// Have handlers
			if (topic in HANDLERS) {
				// Get handlers
				handlers = HANDLERS[topic];

				// Remember arguments
				handlers[MEMORY] = arguments;

				// Get first handler
				handler = handlers[HEAD];

				// Loop through handlers, optimize for arguments
				if (arguments.length > 0) while(handler) {
					// Apply handler callback
					handler.callback.apply(handler.context, arguments);

					// Update handler
					handler = handler[NEXT];
				}
				// Loop through handlers, optimize for no arguments
				else while(handler) {
					// Call handler callback
					handler.callback.call(handler.context);

					// Update handler
					handler = handler[NEXT];
				}
			}
			// No handlers
			else if (arguments.length > 0){
				// Create handlers and store with topic
				HANDLERS[topic] = handlers = {};

				// Remember arguments
				handlers[MEMORY] = arguments;
			}

			return this;
		}