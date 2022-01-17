function (condition, code, message) {

		if (condition) {
			throw {
				code: code,
				msg: name + ' error: ' + message
			};
		}
	}