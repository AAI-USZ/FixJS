function isCollapsedWhitespaceNode(node) {
	// "If node is not a whitespace node, return false."
	if (!isWhitespaceNode(node)) {
		return false;
	}

	// "If node's data is the empty string, return true."
	if (node.data == "") {
		return true;
	}

	// "Let ancestor be node's parent."
	var ancestor = node.parentNode;

	// "If ancestor is null, return true."
	if (!ancestor) {
		return true;
	}

	// "If the "display" property of some ancestor of node has resolved value
	// "none", return true."
	if ($_( getAncestors(node) ).some(function(ancestor) {
		return ancestor.nodeType == $_.Node.ELEMENT_NODE
			&& $_.getComputedStyle(ancestor).display == "none";
	})) {
		return true;
	}

	// "While ancestor is not a block node and its parent is not null, set
	// ancestor to its parent."
	while (!isBlockNode(ancestor)
	&& ancestor.parentNode) {
		ancestor = ancestor.parentNode;
	}

	// "Let reference be node."
	var reference = node;

	// "While reference is a descendant of ancestor:"
	while (reference != ancestor) {
		// "Let reference be the node before it in tree order."
		reference = previousNode(reference);

		// "If reference is a block node or a br, return true."
		if (isBlockNode(reference)
		|| isHtmlElement(reference, "br")) {
			return true;
		}

		// "If reference is a Text node that is not a whitespace node, or is an
		// img, break from this loop."
		if ((reference.nodeType == $_.Node.TEXT_NODE && !isWhitespaceNode(reference))
		|| isHtmlElement(reference, "img")) {
			break;
		}
	}

	// "Let reference be node."
	reference = node;

	// "While reference is a descendant of ancestor:"
	var stop = nextNodeDescendants(ancestor);
	while (reference != stop) {
		// "Let reference be the node after it in tree order, or null if there
		// is no such node."
		reference = nextNode(reference);

		// "If reference is a block node or a br, return true."
		if (isBlockNode(reference)
		|| isHtmlElement(reference, "br")) {
			return true;
		}

		// "If reference is a Text node that is not a whitespace node, or is an
		// img, break from this loop."
		if ((reference && reference.nodeType == $_.Node.TEXT_NODE && !isWhitespaceNode(reference))
		|| isHtmlElement(reference, "img")) {
			break;
		}
	}

	// "Return false."
	return false;
}