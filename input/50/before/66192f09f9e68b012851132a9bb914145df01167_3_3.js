function (name) {
			var callback;
			if (parentName === "") {
				callback = options[name];
			} else if (callback = options[parentName]) {
				callback = callback[name]
			}
			return callback;
		}