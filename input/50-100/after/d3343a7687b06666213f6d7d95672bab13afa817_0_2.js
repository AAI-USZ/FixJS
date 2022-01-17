function (input) {
	if (input === null) {
		return "[object Null]"; // special case
	}
	return Object.prototype.toString.call(input);
}