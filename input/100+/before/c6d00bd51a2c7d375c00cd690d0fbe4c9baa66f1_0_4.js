function() {
		extend(config, {
			stats: { all: 0, bad: 0 },
			moduleStats: { all: 0, bad: 0 },
			started: +new Date,
			updateRate: 1000,
			blocking: false,
			autostart: true,
			autorun: false,
			filter: "",
			queue: [],
			semaphore: 0
		});

		var qunit = id( "qunit" );
		if ( qunit ) {
			qunit.innerHTML =
				'<h1 id="qunit-header">' + escapeInnerText( document.title ) + '</h1>' +
				'<h2 id="qunit-banner"></h2>' +
				'<div id="qunit-testrunner-toolbar"></div>' +
				'<h2 id="qunit-userAgent"></h2>' +
				'<ol id="qunit-tests"></ol>';
		}

		var tests = id( "qunit-tests" ),
			banner = id( "qunit-banner" ),
			result = id( "qunit-testresult" );

		if ( tests ) {
			tests.innerHTML = "";
		}

		if ( banner ) {
			banner.className = "";
		}

		if ( result ) {
			result.parentNode.removeChild( result );
		}

		if ( tests ) {
			result = document.createElement( "p" );
			result.id = "qunit-testresult";
			result.className = "result";
			tests.parentNode.insertBefore( result, tests );
			result.innerHTML = 'Running...<br/>&nbsp;';
		}
	}