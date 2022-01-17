function isCollapsedBlockProp(node) {
	if (isCollapsedLineBreak(node)
	&& !isExtraneousLineBreak(node)) {
		return true;
	}

	if (!isInlineNode(node)
	|| node.nodeType != $_.Node.ELEMENT_NODE) {
		return false;
	}

	var hasCollapsedBlockPropChild = false;
	for (var i = 0; i < node.childNodes.length; i++) {
		if (!isInvisible(node.childNodes[i])
		&& !isCollapsedBlockProp(node.childNodes[i])) {
			return false;
		}
		if (isCollapsedBlockProp(node.childNodes[i])) {
			hasCollapsedBlockPropChild = true;
		}
	}

	return hasCollapsedBlockPropChild;
}