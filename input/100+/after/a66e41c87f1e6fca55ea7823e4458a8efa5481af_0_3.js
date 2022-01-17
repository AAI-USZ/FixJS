function() {
		config.current = this;

		var running = id( "qunit-testresult" );

		if ( running ) {
			running.innerHTML = "Running: <br/>" + this.name;
		}

		if ( this.async ) {
			QUnit.stop();
		}

		if ( config.notrycatch ) {
			this.callback.call( this.testEnvironment, QUnit.assert );
			return;
		}

		try {
			this.callback.call( this.testEnvironment, QUnit.assert );
		} catch( e ) {
			QUnit.pushFailure( "Died on test #" + (this.assertions.length + 1) + " " + this.stack + ": " + e.message, extractStacktrace( e, 0 ) );
			// else next test will carry the responsibility
			saveGlobal();

			// Restart the tests if they're blocking
			if ( config.blocking ) {
				QUnit.start();
			}
		}
	}