function isVisible(node) {
	if (!node) {
		return false;
	}

	if (getAncestors(node).concat(node)
	.filter(function(node) { return node.nodeType == Node.ELEMENT_NODE })
	.some(function(node) { return getComputedStyle(node).display == "none" })) {
		return false;
	}

	if (isBlockNode(node)
	|| (node.nodeType == Node.TEXT_NODE && !isCollapsedWhitespaceNode(node))
	|| isHtmlElement(node, "img")
	|| (isHtmlElement(node, "br") && !isExtraneousLineBreak(node))) {
		return true;
	}

	for (var i = 0; i < node.childNodes.length; i++) {
		if (isVisible(node.childNodes[i])) {
			return true;
		}
	}

	return false;
}