function() {
		config.current = this;
		if ( config.notrycatch ) {
			this.testEnvironment.teardown.call( this.testEnvironment );
			return;
		} else {
			try {
				this.testEnvironment.teardown.call( this.testEnvironment );
			} catch( e ) {
				QUnit.pushFailure( "Teardown failed on " + this.testName + ": " + e.message, extractStacktrace( e, 1 ) );
			}
		}
		checkPollution();
	}