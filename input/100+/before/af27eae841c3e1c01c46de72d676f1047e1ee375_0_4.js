function sourceFromStacktrace(offset) {
	offset = offset || 3;
	try {
		throw new Error();
	} catch ( e ) {
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
			// TODO sourceURL points at the 'throw new Error' line above, useless
			//return e.sourceURL + ":" + e.line;
		}
	}
}