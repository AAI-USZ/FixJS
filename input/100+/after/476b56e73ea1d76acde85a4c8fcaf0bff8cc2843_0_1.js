function unsubscribe(topic /*, context, callback, callback, ..*/) {
			var length = arguments.length;
			var context = arguments[1];
			var callback = arguments[2];
			var offset;
			var handlers;
			var handler;
			var head;
			var previous = null;

			// No context or memory was supplied
			if (context instanceof Function) {
				callback = context;
				context = CONTEXT;
				offset = 1;
			}
			// All arguments were supplied
			else if (callback instanceof Function){
				offset = 2;
			}
			// Something is wrong, return fast
			else {
				return self;
			}

			unsubscribe: {
				// Fast fail if we don't have subscribers
				if (!(topic in HANDLERS)) {
					break unsubscribe;
				}

				// Get handlers
				handlers = HANDLERS[topic];

				// Get head
				head = handlers[HEAD];

				// Loop over remaining arguments
				while (offset < length) {
					// Store callback
					callback = arguments[offset++];

					// Get first handler
					handler = previous = head;

					// Loop through handlers
					do {
						// Check if this handler should be unlinked
						if (handler.callback === callback && handler.context === context) {
							// Is this the first handler
							if (handler === head) {
								// Re-link head and previous, then
								// continue
								head = previous = handler[NEXT];
								continue;
							}

							// Unlink current handler, then continue
							previous[NEXT] = handler[NEXT];
							continue;
						}

						// Update previous pointer
						previous = handler;
					} while (handler = handler[NEXT]);
				}

				// Update head and tail
				if (head && previous) {
					handlers[HEAD] = head;
					handlers[TAIL] = previous;
				}
				else {
					delete handlers[HEAD];
					delete handlers[TAIL];
				}
			}

			return this;
		}