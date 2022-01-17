function sourceFromStacktrace( offset ) {
	try {
		throw new Error();
	} catch ( e ) {
		return extractStacktrace( e, offset );
	}
}