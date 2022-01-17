function fail(message, exception, callback) {
	if ( typeof console !== "undefined" && console.error && console.warn ) {
		console.error(message);
		console.error(exception);
		console.error(exception.stack);
		console.warn(callback.toString());

	} else if ( window.opera && opera.postError ) {
		opera.postError(message, exception, callback.toString);
	}
}