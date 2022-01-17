function isBlockNode(node) {
	return node
		&& ((node.nodeType == Node.ELEMENT_NODE && ["inline", "inline-block", "inline-table", "none"].indexOf(getComputedStyle(node).display) == -1)
		|| node.nodeType == Node.DOCUMENT_NODE
		|| node.nodeType == Node.DOCUMENT_FRAGMENT_NODE);
}