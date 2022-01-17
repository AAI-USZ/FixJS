function isBefore(node1, node2) {
	return Boolean(compareDocumentPosition(node1,node2) & Node.DOCUMENT_POSITION_FOLLOWING);
}