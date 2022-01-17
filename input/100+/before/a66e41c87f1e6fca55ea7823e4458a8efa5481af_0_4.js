function(a, msg) {
		a = !!a;
		var details = {
			result: a,
			message: msg
		};
		msg = escapeInnerText(msg);
		runLoggingCallbacks( 'log', QUnit, details );
		config.current.assertions.push({
			result: a,
			message: msg
		});
	}