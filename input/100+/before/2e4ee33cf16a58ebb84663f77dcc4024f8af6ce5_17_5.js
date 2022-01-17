function(a, msg) {
		QUnit.log(a, msg);

		config.assertions.push({
			result: !!a,
			message: msg
		});
	}