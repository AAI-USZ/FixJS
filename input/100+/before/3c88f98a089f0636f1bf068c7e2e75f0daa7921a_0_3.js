function fireCallbacks() {
			each(_t.callbacks, function(c) { c(_t); });
			_t.callbacks = [];
		}