function (condition, code, message) {

		if (condition) {
			throw {
				code: code,
				msg: message,
				toString: function () {
					return name + ' error: ' + message;
				}
			};
		}
	}