function(block, expected, message) {
		var actual, ok = false;

		if (typeof expected === 'string') {
			message = expected;
			expected = null;
		}

		try {
			block();
		} catch (e) {
			actual = e;
		}

		if (actual) {
			// we don't want to validate thrown error
			if (!expected) {
				ok = true;
			// expected is a regexp
			} else if (QUnit.objectType(expected) === "regexp") {
				ok = expected.test(actual);
			// expected is a constructor
			} else if (actual instanceof expected) {
				ok = true;
			// expected is a validation function which returns true is validation passed
			} else if (expected.call({}, actual) === true) {
				ok = true;
			}
		}

		QUnit.ok(ok, message);
	}