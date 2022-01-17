function(data) {
			QUnit.ok(data && data.result === "error",
				"Checking if the \"onError\" callback was executed when the search query was defined incorrectly.");
			callback();
		}