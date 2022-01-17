function( message, source ) {
		var output,
			details = {
				result: false,
				message: message
			};

		message = escapeInnerText(message ) || "error";
		message = "<span class='test-message'>" + message + "</span>";
		output = message;

		if ( source ) {
			details.source = source;
			output += "<table><tr class='test-source'><th>Source: </th><td><pre>" + escapeInnerText( source ) + "</pre></td></tr></table>";
		}

		runLoggingCallbacks( "log", QUnit, details );

		config.current.assertions.push({
			result: false,
			message: output
		});
	}