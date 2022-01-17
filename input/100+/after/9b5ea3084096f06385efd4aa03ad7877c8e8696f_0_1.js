function (obj, types, eventObject) {
				var i, handlers, isEnter, isLeave, numHandlers, n, e;

				for (i = 0; i < types.length; i++) {
					handlers = obj.events[types[i]];
					isEnter = !!~types[i].indexOf("enter");
					isLeave = !!~types[i].indexOf("leave");
					e = eventObject || (~types[i].indexOf("key") ? this.lastKeyboardEventObject : this.lastPointerEventObject);
					e.type = types[i];
					e.bubbles = (isEnter || isLeave) ? false : true;

					if (isEnter && !obj.events.hasEntered) {
						obj.events.hasEntered = true;
					} else if (isLeave && obj.events.hasEntered) {
						obj.events.hasEntered = false;
					}

					if (handlers) {
						numHandlers = handlers.length;
						for (n = 0; n < numHandlers; n++) {
							if (typeof handlers[n] === "function") {
								handlers[n].call(obj, e);
							}
						}

						if (e.stoppingPropagation) {
							e.stoppingPropagation = false;
							return false;
						}
					}
				}

				return true;
			}