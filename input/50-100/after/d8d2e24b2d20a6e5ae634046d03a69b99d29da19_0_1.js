function (url, options) { // (String, Object)

		var params = L.Util.extend({}, this.options), i;

		this._url = url;

		for (i in options) {
			if (!this.options.hasOwnProperty(i)) {
				params[i] = options[i];
			}
		}

		L.Util.setOptions(this, params);
	}