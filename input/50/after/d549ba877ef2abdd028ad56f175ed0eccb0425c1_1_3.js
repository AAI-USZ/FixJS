function isBefore(node1, node2) {
	return Boolean($_.compareDocumentPosition(node1,node2) & $_.Node.DOCUMENT_POSITION_FOLLOWING);
}