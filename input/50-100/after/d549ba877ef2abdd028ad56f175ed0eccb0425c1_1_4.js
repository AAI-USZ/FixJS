function isBlockNode(node) {
	return node
		&& ((node.nodeType == $_.Node.ELEMENT_NODE && $_( ["inline", "inline-block", "inline-table", "none"] ).indexOf($_.getComputedStyle(node).display) == -1)
		|| node.nodeType == $_.Node.DOCUMENT_NODE
		|| node.nodeType == $_.Node.DOCUMENT_FRAGMENT_NODE);
}