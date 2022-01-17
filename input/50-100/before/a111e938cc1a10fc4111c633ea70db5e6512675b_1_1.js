function (actual, expected, place) {
	if (actual !== expected) {
		throw Error("assert fail: " + place + "\n" +
			actual + " !== " + expected);
	}
}