function (key, value){
		me._keys[key] = {
			value: value
		}
		try {
			me._performSubstitutions.call(me);
		} catch (error) {
			if (cb) {
				cb(error);
				cb = null;
			}
		}
	}