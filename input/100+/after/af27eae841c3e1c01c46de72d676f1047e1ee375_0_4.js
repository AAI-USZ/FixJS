function extractStacktrace( e, offset ) {
	offset = offset || 3;
	if (e.stacktrace) {
		// Opera
		return e.stacktrace.split("\n")[offset + 3];
	} else if (e.stack) {
		// Firefox, Chrome
		var stack = e.stack.split("\n");
		if (/^error$/i.test(stack[0])) {
			stack.shift();
		}
		return stack[offset];
	} else if (e.sourceURL) {
		// Safari, PhantomJS
		// hopefully one day Safari provides actual stacktraces
		// exclude useless self-reference for generated Error objects
		if ( /qunit.js$/.test( e.sourceURL ) ) {
			return;
		}
		// for actual exceptions, this is useful
		return e.sourceURL + ":" + e.line;
	}
}