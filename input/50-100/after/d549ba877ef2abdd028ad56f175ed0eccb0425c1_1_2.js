function getNodeLength(node) {
	switch (node.nodeType) {
		case $_.Node.PROCESSING_INSTRUCTION_NODE:
		case $_.Node.DOCUMENT_TYPE_NODE:
			return 0;

		case $_.Node.TEXT_NODE:
		case $_.Node.COMMENT_NODE:
			return node.length;

		default:
			return node.childNodes.length;
	}
}