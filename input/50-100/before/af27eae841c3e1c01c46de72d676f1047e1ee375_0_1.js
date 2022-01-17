function() {
		config.current = this;
		if ( config.notrycatch ) {
			this.testEnvironment.teardown.call(this.testEnvironment);
			return;
		} else {
			try {
				this.testEnvironment.teardown.call(this.testEnvironment);
			} catch(e) {
				QUnit.ok( false, "Teardown failed on " + this.testName + ": " + e.message );
			}
		}
		checkPollution();
	}