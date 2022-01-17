function isVisible(node) {
	if (!node) {
		return false;
	}

	if ($_( getAncestors(node).concat(node) )
	.filter(function(node) { return node.nodeType == $_.Node.ELEMENT_NODE }, true)
	.some(function(node) { return $_.getComputedStyle(node).display == "none" })) {
		return false;
	}

	if (isBlockNode(node)
	|| (node.nodeType == $_.Node.TEXT_NODE && !isCollapsedWhitespaceNode(node))
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