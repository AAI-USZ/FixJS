function (types, fn, context) { // (String, Function[, Object]) or (Object[, Object])
		var events = this._leaflet_events = this._leaflet_events || {},
			type, i, len;
		
		// Types can be a map of types/handlers
		if (typeof types === 'object') {
			for (type in types) {
				if (types.hasOwnProperty(type)) {
					this.addEventListener(type, types[type], fn || this);
				}
			}
			
			return this;
		}
		
		// TODO extract trim into util method
		types = types.replace(/^\s+|\s+$/g, '').split(/\s+/);
		
		for (i = 0, len = types.length; i < len; i++) {
			events[types[i]] = events[types[i]] || [];
			events[types[i]].push({
				action: fn,
				context: context || this
			});
		}
		
		return this;
	}