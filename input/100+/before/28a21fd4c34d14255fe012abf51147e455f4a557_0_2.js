function (types, fn, context) { // (String[, Function, Object]) or (Object[, Object])
		var events = this._leaflet_events,
			type, i, len, listeners, j;
		
		if (typeof types === 'object') {
			for (type in types) {
				if (types.hasOwnProperty(type)) {
					this.removeEventListener(type, types[type], context || this);
				}
			}
			
			return this;
		}
		
		types = types.replace(/^\s+|\s+$/g, '').split(/\s+/);

		for (i = 0, len = types.length; i < len; i++) {

			if (this.hasEventListeners(types[i])) {
				listeners = events[types[i]];
				
				for (j = listeners.length - 1; j >= 0; j--) {
					if (
						(!fn || listeners[j].action === fn) &&
						(!context || (listeners[j].context === context))
					) {
						listeners.splice(j, 1);
					}
				}
			}
		}
		
		return this;
	}