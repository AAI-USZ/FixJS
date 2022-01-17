function(key) {
		var val;
		val = data[key];
		if(key.substring(0, 4) === "gsx:") {
			if(typeof val === 'object' && Object.keys(val).length === 0) {
				val = null;
			}
			if (key == "gsx:") {
				this[key.substring(0, 3)] = val;
			} else {
				this[key.substring(4)] = val;
			}
		} else {
			if (key == "id") {
				this[key] = val;
			} else if (val['#']) {
				this[key] = val['#'];
			}
		}
	}