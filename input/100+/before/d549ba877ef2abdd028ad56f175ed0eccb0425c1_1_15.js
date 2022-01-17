function isEffectivelyContained(node, range) {
	if (range.collapsed) {
		return false;
	}

	// "node is contained in range."
	if (isContained(node, range)) {
		return true;
	}

	// "node is range's start node, it is a Text node, and its length is
	// different from range's start offset."
	if (node == range.startContainer
	&& node.nodeType == Node.TEXT_NODE
	&& getNodeLength(node) != range.startOffset) {
		return true;
	}

	// "node is range's end node, it is a Text node, and range's end offset is
	// not 0."
	if (node == range.endContainer
	&& node.nodeType == Node.TEXT_NODE
	&& range.endOffset != 0) {
		return true;
	}

	// "node has at least one child; and all its children are effectively
	// contained in range; and either range's start node is not a descendant of
	// node or is not a Text node or range's start offset is zero; and either
	// range's end node is not a descendant of node or is not a Text node or
	// range's end offset is its end node's length."
	if (node.hasChildNodes()
	&& [].every.call(node.childNodes, function(child) { return isEffectivelyContained(child, range) })
	&& (!isDescendant(range.startContainer, node)
	|| range.startContainer.nodeType != Node.TEXT_NODE
	|| range.startOffset == 0)
	&& (!isDescendant(range.endContainer, node)
	|| range.endContainer.nodeType != Node.TEXT_NODE
	|| range.endOffset == getNodeLength(range.endContainer))) {
		return true;
	}

	return false;
}