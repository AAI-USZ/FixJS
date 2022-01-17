function( result, msg ) {
		if ( !config.current ) {
			throw new Error( "ok() assertion outside test context, was " + sourceFromStacktrace(2) );
		}
		result = !!result;

		var source,
			details = {
				result: result,
				message: msg
			};

		msg = escapeInnerText( msg || (result ? "okay" : "failed" ) );
		msg = "<span class='test-message'>" + msg + "</span>";

		if ( !result ) {
			source = sourceFromStacktrace( 2 );
			if ( source ) {
				details.source = source;
				msg += "<table><tr class='test-source'><th>Source: </th><td><pre>" + escapeInnerText( source ) + "</pre></td></tr></table>";
			}
		}
		runLoggingCallbacks( "log", QUnit, details );
		config.current.assertions.push({
			result: result,
			message: msg
		});
	}