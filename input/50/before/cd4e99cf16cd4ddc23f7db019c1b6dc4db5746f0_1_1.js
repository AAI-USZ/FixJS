function(key) {
			if(!nodeListProto[key])nodeListProto[key] = Array.prototype[key];
		}