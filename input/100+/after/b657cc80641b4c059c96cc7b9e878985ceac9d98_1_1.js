function collapseWhitespace(node, range) {
	// "If node is neither editable nor an editing host, abort these steps."
	if (!isEditable(node) && !isEditingHost(node)) {
		return;
	}

	// if the given node is not a text node, return
	if (!node || node.nodeType !== $_.Node.TEXT_NODE) {
		return;
	}

	// if the node is in a pre or pre-wrap node, return
	if ($_(["pre", "pre-wrap"]).indexOf($_.getComputedStyle(node.parentNode).whiteSpace) != -1) {
		return;
	}

	// if the given node does not contain sequences of at least two consecutive ignorable whitespace characters, return
	if (!/[\t\n\r ]{2,}/.test(node.data)) {
		return;
	}

	var newData = '';
	var correctStart = range.startContainer == node;
	var correctEnd = range.endContainer == node;
	var wsFound = false;

	// iterate through the node data
	for (var i = 0; i < node.data.length; ++i) {
		if (/[\t\n\r ]/.test(node.data.substr(i, 1))) {
			// found a whitespace
			if (!wsFound) {
				// this is the first whitespace in the current sequence
				// add a whitespace to the new data sequence
				newData += ' ';
				// remember that we found a whitespace
				wsFound = true;
			} else {
				// this is not the first whitespace in the sequence, so omit this character
				if (correctStart && newData.length < range.startOffset) {
					range.startOffset--;
				}
				if (correctEnd && newData.length < range.endOffset) {
					range.endOffset--;
				}
			}
		} else {
			newData += node.data.substr(i, 1);
			wsFound = false;
		}
	}

	// set the new data
	node.data = newData;
}