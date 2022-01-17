function Q(nameOrArray, qType) {
		var self = this;
		this.qType = !!qType && qType instanceof Function ? qType : Q;

		// Private variables, the handlers and actual queue array
		var eventHandlers = {};
		var queue = nameOrArray instanceof Array ? nameOrArray : [];
		var handler = undefined;
		var handlerBusy = false;
		var closeAfterHandler = false;

		// Privileged methods

		// `on` registers event handlers
		this.on = function on(eventName, handler) {
			if(!eventHandlers) eventHandlers = {};
			eventHandlers[eventName] = eventHandlers[eventName] instanceof Array ? eventHandlers[eventName] : [];
			eventHandlers[eventName].push(handler);
			return this;
		};

		// `fire` executes the event handlers, passing along whatever arguments given to it
		// minus the event name indicator, of course. If any handler returns false, it indicates
		// so, indiating to the method firing the event to cancel.
		this.fire = function fire(eventName) {
			var newArgs = Array.prototype.slice.call(arguments, 1);
			if(!eventHandlers) {
				return false;
			} else if(eventHandlers[eventName]) {
				return eventHandlers[eventName].every(function(handler) {
					if(handler instanceof Function) {
						return handler.apply(self, newArgs) !== false;
					}
					return true;
				});
			} else {
				return true;
			}
		};

		// `clear` clears all event handlers from the specified event
		this.clear = function clear(eventName) {
			eventHandlers[eventName] = [];
		};

		// `setHandler` defines the special function to call to process the queue
		// assumed to be ready initially, when called marked busy, call provided callback to
		// mark ready again. `each` is a synonym
		this.each = this.setHandler = function setHandler(handlerFunc) {
			handler = handlerFunc;
			setTimeout(handlerCallback, 0);
			return this;
		};

		// The `handlerCallback` is provided to the handler along with the dequeued value.
		// If there is more work to be done, it continues, otherwise is marks the handler
		// as ready for when the data next arrives
		var handlerCallback = function handlerCallback() {
			handlerBusy = false;
			if(queue && queue.length > 0) {
				var value = queue[0];
				if(self.fire('pull', value) && handler instanceof Function) {
					handlerBusy = true;
					setTimeout(handler.bind(self, queue.shift(), handlerCallback), 0);
				}
			} else if(handler instanceof Function && !!self) {
				self.fire('empty');
				if(closeAfterHandler) self.close();
			}
		};

		// Inserts a specified value into the queue, if allowed by the event handlers, and
		// calls the special handler function, if it's ready.
		this.push = function push(value) {
			var values = Array.prototype.slice.call(arguments, 0);
			if(this.fire('push', values)) {
				Array.prototype.push.apply(queue, values);
				setTimeout(handlerCallback, 0);
			}
			return this;
		};

		// Signals that the queue is being destroyed and then, if allowed, destroys it
		this.close = function close() {
			if(handlerBusy) {
				closeAfterHandler = true;
			} else if(this.fire('close')) {
				this.clear('close');
				this.on('close', function() { return false; });
				function flushQueue() {
					if(queue && queue.length > 0 && handler instanceof Function) {
						var value = queue[0];
						if(this.fire('pull', value)) {
							setTimeout(handler.bind(this, queue.shift(), flushQueue), 0);
						}
					} else {
						setTimeout(function() {
							if(handler instanceof Function) {
								handler('close');
							}
							eventHandlers = undefined;
							queue = undefined;
							handler = undefined;
							self = undefined;
							delete this;
						}, 0);
					}
				}
				setTimeout(flushQueue.bind(this), 0);
			}
		};

		// Ignore all of this and replace with a custom handler object (that still gets the
		// prototypal methods, and *must* implement these special public methods)
		if(qType && qType instanceof Function) {
			this = new qType(nameOrArray);
		}

		// Start processing the queue after the next JS event loop cycle and return the queue
		// object to the remaining code.
		setTimeout(handlerCallback, 0);
		if(queue.length > 0) this.closeOnEmpty();
		return this;
	}