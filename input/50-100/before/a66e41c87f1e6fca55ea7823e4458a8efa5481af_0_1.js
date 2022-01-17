function() {
		config.current = this;
		try {
			this.testEnvironment.teardown.call(this.testEnvironment);
			checkPollution();
		} catch(e) {
			QUnit.ok( false, "Teardown failed on " + this.testName + ": " + e.message );
		}
	}