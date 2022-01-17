function canonicalizeWhitespace(node, offset) {
	// "If node is neither editable nor an editing host, abort these steps."
	if (!isEditable(node) && !isEditingHost(node)) {
		return;
	}

	// "Let start node equal node and let start offset equal offset."
	var startNode = node;
	var startOffset = offset;

	// "Repeat the following steps:"
	while (true) {
		// "If start node has a child in the same editing host with index start
		// offset minus one, set start node to that child, then set start
		// offset to start node's length."
		if (0 <= startOffset - 1
		&& inSameEditingHost(startNode, startNode.childNodes[startOffset - 1])) {
			startNode = startNode.childNodes[startOffset - 1];
			startOffset = getNodeLength(startNode);

		// "Otherwise, if start offset is zero and start node does not follow a
		// line break and start node's parent is in the same editing host, set
		// start offset to start node's index, then set start node to its
		// parent."
		} else if (startOffset == 0
		&& !followsLineBreak(startNode)
		&& inSameEditingHost(startNode, startNode.parentNode)) {
			startOffset = getNodeIndex(startNode);
			startNode = startNode.parentNode;

		// "Otherwise, if start node is a Text node and its parent's resolved
		// value for "white-space" is neither "pre" nor "pre-wrap" and start
		// offset is not zero and the (start offset − 1)st element of start
		// node's data is a space (0x0020) or non-breaking space (0x00A0),
		// subtract one from start offset."
		} else if (startNode.nodeType == $_.Node.TEXT_NODE
		&& $_(["pre", "pre-wrap"]).indexOf($_.getComputedStyle(startNode.parentNode).whiteSpace) == -1
		&& startOffset != 0
		&& /[ \xa0]/.test(startNode.data[startOffset - 1])) {
			startOffset--;

		// "Otherwise, break from this loop."
		} else {
			break;
		}
	}

	// "Let end node equal start node and end offset equal start offset."
	var endNode = startNode;
	var endOffset = startOffset;

	// "Let length equal zero."
	var length = 0;

	// "Let follows space be false."
	var followsSpace = false;

	// "Repeat the following steps:"
	while (true) {
		// "If end node has a child in the same editing host with index end
		// offset, set end node to that child, then set end offset to zero."
		if (endOffset < endNode.childNodes.length
		&& inSameEditingHost(endNode, endNode.childNodes[endOffset])) {
			endNode = endNode.childNodes[endOffset];
			endOffset = 0;

		// "Otherwise, if end offset is end node's length and end node does not
		// precede a line break and end node's parent is in the same editing
		// host, set end offset to one plus end node's index, then set end node
		// to its parent."
		} else if (endOffset == getNodeLength(endNode)
		&& !precedesLineBreak(endNode)
		&& inSameEditingHost(endNode, endNode.parentNode)) {
			endOffset = 1 + getNodeIndex(endNode);
			endNode = endNode.parentNode;

		// "Otherwise, if end node is a Text node and its parent's resolved
		// value for "white-space" is neither "pre" nor "pre-wrap" and end
		// offset is not end node's length and the end offsetth element of
		// end node's data is a space (0x0020) or non-breaking space (0x00A0):"
		} else if (endNode.nodeType == $_.Node.TEXT_NODE
		&& $_(["pre", "pre-wrap"]).indexOf($_.getComputedStyle(endNode.parentNode).whiteSpace) == -1
		&& endOffset != getNodeLength(endNode)
		&& /[ \xa0]/.test(endNode.data[endOffset])) {
			// "If follows space is true and the end offsetth element of end
			// node's data is a space (0x0020), call deleteData(end offset, 1)
			// on end node, then continue this loop from the beginning."
			if (followsSpace
			&& " " == endNode.data[endOffset]) {
				endNode.deleteData(endOffset, 1);
				continue;
			}

			// "Set follows space to true if the end offsetth element of end
			// node's data is a space (0x0020), false otherwise."
			followsSpace = " " == endNode.data[endOffset];

			// "Add one to end offset."
			endOffset++;

			// "Add one to length."
			length++;

		// "Otherwise, break from this loop."
		} else {
			break;
		}
	}

	// "Let replacement whitespace be the canonical space sequence of length
	// length. non-breaking start is true if start offset is zero and start
	// node follows a line break, and false otherwise. non-breaking end is true
	// if end offset is end node's length and end node precedes a line break,
	// and false otherwise."
	var replacementWhitespace = canonicalSpaceSequence(length,
		startOffset == 0 && followsLineBreak(startNode),
		endOffset == getNodeLength(endNode) && precedesLineBreak(endNode));

	// "While (start node, start offset) is before (end node, end offset):"
	while (getPosition(startNode, startOffset, endNode, endOffset) == "before") {
		// "If start node has a child with index start offset, set start node
		// to that child, then set start offset to zero."
		if (startOffset < startNode.childNodes.length) {
			startNode = startNode.childNodes[startOffset];
			startOffset = 0;

		// "Otherwise, if start node is not a Text node or if start offset is
		// start node's length, set start offset to one plus start node's
		// index, then set start node to its parent."
		} else if (startNode.nodeType != $_.Node.TEXT_NODE
		|| startOffset == getNodeLength(startNode)) {
			startOffset = 1 + getNodeIndex(startNode);
			startNode = startNode.parentNode;

		// "Otherwise:"
		} else {
			// "Remove the first element from replacement whitespace, and let
			// element be that element."
			var element = replacementWhitespace[0];
			replacementWhitespace = replacementWhitespace.slice(1);

			// "If element is not the same as the start offsetth element of
			// start node's data:"
			if (element != startNode.data[startOffset]) {
				// "Call insertData(start offset, element) on start node."
				startNode.insertData(startOffset, element);

				// "Call deleteData(start offset + 1, 1) on start node."
				startNode.deleteData(startOffset + 1, 1);
			}

			// "Add one to start offset."
			startOffset++;
		}
	}
}