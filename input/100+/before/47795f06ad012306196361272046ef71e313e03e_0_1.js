function subscribe(topic /*, context, memory, callback, callback, ..*/) {
			var self = this;
			var length = arguments.length;
			var context = arguments[1];
			var memory = arguments[2];
			var callback = arguments[3];
			var offset;
			var handlers;
			var handler;
			var head;
			var tail;

			// No context or memory was supplied
			if (context instanceof Function) {
				callback = context;
				memory = false;
				context = CONTEXT;
				offset = 1;
			}
			// Only memory was supplied
			else if (context === true || context === false) {
				callback = memory;
				memory = context;
				context = CONTEXT;
				offset = 2;
			}
			// Context was supplied, but not memory
			else if (memory instanceof Function) {
				callback = memory;
				memory = false;
				offset = 2;
			}
			// All arguments were supplied
			else if (callback instanceof Function){
				offset = 3;
			}
			// Something is wrong, return fast
			else {
				return self;
			}

			// Have handlers
			if (topic in HANDLERS) {

				// Get handlers
				handlers = HANDLERS[topic];

				// Create new handler
				handler = {
					"callback" : arguments[offset++],
					"context" : context
				};

				// Get last handler
				tail = TAIL in handlers
					// Have tail, update handlers.tail.next to point to handler
					? handlers[TAIL][NEXT] = handler
					// Have no tail, update handlers.head to point to handler
					: handlers[HEAD] = handler;

				// Iterate handlers from offset
				while (offset < length) {
					// Set last -> last.next -> handler
					tail = tail[NEXT] = {
						"callback" : arguments[offset++],
						"context" : context
					};
				}

				// Set last handler
				handlers[TAIL] = tail;

				// Want memory and have memory
				if (memory && MEMORY in handlers) {
					// Get memory
					memory = handlers[MEMORY];

					// Loop through handlers, optimize for arguments
					if (memory.length > 0 ) while(handler) {
						// Apply handler callback
						handler.callback.apply(handler.context, memory);

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
			}
			// No handlers
			else {
				// Create head and tail
				head = tail = {
					"callback" : arguments[offset++],
					"context" : context
				};

				// Iterate handlers from offset
				while (offset < length) {
					// Set last -> last.next -> handler
					tail = tail[NEXT] = {
						"callback" : arguments[offset++],
						"context" : context
					};
				}

				// Create topic list
				HANDLERS[topic] = {
					"head" : head,
					"tail" : tail
				};
			}

			return self;
		}