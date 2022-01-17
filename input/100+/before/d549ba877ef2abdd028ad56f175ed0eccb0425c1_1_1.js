function getStyleLength(node) {
	if (!node) {
		return 0;
	} else if (!node.style) {
		return 0;
	}

	// some browsers support .length on styles
	if (typeof node.style.length !== 'undefined') {
		return node.style.length;
	} else {
		// others don't, so we will count
		var styleLength = 0;
		for (var s in node.style) {
			if (node.style[s]) {
				styleLength++;
			}
		}

		return styleLength;
	}
}