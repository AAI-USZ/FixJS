function blockExtend(range) {
	// "Let start node, start offset, end node, and end offset be the start
	// and end nodes and offsets of the range."
	var startNode = range.startContainer;
	var startOffset = range.startOffset;
	var endNode = range.endContainer;
	var endOffset = range.endOffset;

	// "If some ancestor container of start node is an li, set start offset to
	// the index of the last such li in tree order, and set start node to that
	// li's parent."
	var liAncestors = $_( getAncestors(startNode).concat(startNode) )
		.filter(function(ancestor) { return isHtmlElement(ancestor, "li") })
		.slice(-1);
	if (liAncestors.length) {
		startOffset = getNodeIndex(liAncestors[0]);
		startNode = liAncestors[0].parentNode;
	}

	// "If (start node, start offset) is not a block start point, repeat the
	// following steps:"
	if (!isBlockStartPoint(startNode, startOffset)) do {
		// "If start offset is zero, set it to start node's index, then set
		// start node to its parent."
		if (startOffset == 0) {
			startOffset = getNodeIndex(startNode);
			startNode = startNode.parentNode;

		// "Otherwise, subtract one from start offset."
		} else {
			startOffset--;
		}

		// "If (start node, start offset) is a block boundary point, break from
		// this loop."
	} while (!isBlockBoundaryPoint(startNode, startOffset));

	// "While start offset is zero and start node's parent is not null, set
	// start offset to start node's index, then set start node to its parent."
	while (startOffset == 0
	&& startNode.parentNode) {
		startOffset = getNodeIndex(startNode);
		startNode = startNode.parentNode;
	}

	// "If some ancestor container of end node is an li, set end offset to one
	// plus the index of the last such li in tree order, and set end node to
	// that li's parent."
	var liAncestors = $_( getAncestors(endNode).concat(endNode) )
		.filter(function(ancestor) { return isHtmlElement(ancestor, "li") })
		.slice(-1);
	if (liAncestors.length) {
		endOffset = 1 + getNodeIndex(liAncestors[0]);
		endNode = liAncestors[0].parentNode;
	}

	// "If (end node, end offset) is not a block end point, repeat the
	// following steps:"
	if (!isBlockEndPoint(endNode, endOffset)) do {
		// "If end offset is end node's length, set it to one plus end node's
		// index, then set end node to its parent."
		if (endOffset == getNodeLength(endNode)) {
			endOffset = 1 + getNodeIndex(endNode);
			endNode = endNode.parentNode;

		// "Otherwise, add one to end offset.
		} else {
			endOffset++;
		}

		// "If (end node, end offset) is a block boundary point, break from
		// this loop."
	} while (!isBlockBoundaryPoint(endNode, endOffset));

	// "While end offset is end node's length and end node's parent is not
	// null, set end offset to one plus end node's index, then set end node to
	// its parent."
	while (endOffset == getNodeLength(endNode)
	&& endNode.parentNode) {
		endOffset = 1 + getNodeIndex(endNode);
		endNode = endNode.parentNode;
	}

	// "Let new range be a new range whose start and end nodes and offsets
	// are start node, start offset, end node, and end offset."
	var newRange = Aloha.createRange();
	newRange.setStart(startNode, startOffset);
	newRange.setEnd(endNode, endOffset);

	// "Return new range."
	return newRange;
}