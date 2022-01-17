function(key) {
		var val;
		if(key.substring(0, 4) === "gsx:") {
			val = data[key];
			if(typeof val === 'object' && Object.keys(val).length === 0) {
				val = null;
			}
			this[key.substring(4)] = val;
		}
	}