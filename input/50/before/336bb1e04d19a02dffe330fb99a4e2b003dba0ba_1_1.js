function(data) {
			QUnit.ok(data && data.entries,
				"Checking if the \"onData\" callback was executed after the regular request.");
			callback();
		}