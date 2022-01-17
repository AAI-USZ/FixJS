function hasAdd(name, test, now, force){
		// summary:
		//		Adds a feature test.
		//
		// name: String
		//		The name of the test.
		//
		// test: Function
		//		The function that tests for a feature.
		//
		// now: Boolean?
		//		If true, runs the test immediately.
		//
		// force: Boolean?
		//		If true, forces the test to override an existing test.

		if (hasCache[name] === void 0 || force) {
			hasCache[name] = test;
		}
		return now && has(name);
	}