function (args, resolve) {
		var result;
		if (this.failed) {
			return resolve(this.promise);
		} else {
			try {
				result = ext.call(this.value, args[0], args[1], args[2]);
			} catch (e) {
				return resolve(e);
			}
			return resolve(result);
		}
	}