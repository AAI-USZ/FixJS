function done() {
	config.autorun = true;

	// Log the last module results
	if ( config.currentModule ) {
		runLoggingCallbacks( 'moduleDone', QUnit, {
			name: config.currentModule,
			failed: config.moduleStats.bad,
			passed: config.moduleStats.all - config.moduleStats.bad,
			total: config.moduleStats.all
		} );
	}

	var banner = id("qunit-banner"),
		tests = id("qunit-tests"),
		runtime = +new Date() - config.started,
		passed = config.stats.all - config.stats.bad,
		html = [
			'Tests completed in ',
			runtime,
			' milliseconds.<br/>',
			'<span class="passed">',
			passed,
			'</span> tests of <span class="total">',
			config.stats.all,
			'</span> passed, <span class="failed">',
			config.stats.bad,
			'</span> failed.'
		].join('');

	if ( banner ) {
		banner.className = (config.stats.bad ? "qunit-fail" : "qunit-pass");
	}

	if ( tests ) {
		id( "qunit-testresult" ).innerHTML = html;
	}

	if ( config.altertitle && typeof document !== "undefined" && document.title ) {
		// show ✖ for good, ✔ for bad suite result in title
		// use escape sequences in case file gets loaded with non-utf-8-charset
		document.title = [
			(config.stats.bad ? "\u2716" : "\u2714"),
			document.title.replace(/^[\u2714\u2716] /i, "")
		].join(" ");
	}

	// clear own sessionStorage items if all tests passed
	if ( config.reorder && defined.sessionStorage && config.stats.bad === 0 ) {
		for (var key in sessionStorage) {
			if (sessionStorage.hasOwnProperty(key) && key.indexOf("qunit-test-") === 0 ) {
				sessionStorage.removeItem(key);
			}
		}
	}

	runLoggingCallbacks( 'done', QUnit, {
		failed: config.stats.bad,
		passed: passed,
		total: config.stats.all,
		runtime: runtime
	} );
}