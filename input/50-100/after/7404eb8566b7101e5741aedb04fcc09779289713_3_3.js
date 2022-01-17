function logWithKindPrefix(kind, moduleName, messageFormatArgs) {
	if (!kind.fn) { return; }// do nothing if function is null

	// automatically JSON-ify objects
	var formatArgsArr = Array.prototype.slice.call(messageFormatArgs);
	jsonifyObjectsInArray(formatArgsArr);

	var message = util.format.apply(this, formatArgsArr);

	if (kind.prefixer) {
		message = kind.prefixer(kind, moduleName) + message;
	}

	kind.fn(message);
}