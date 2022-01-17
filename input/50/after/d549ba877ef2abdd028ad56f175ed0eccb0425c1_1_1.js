function isAncestor(ancestor, descendant) {
	return ancestor
		&& descendant
		&& Boolean($_.compareDocumentPosition(ancestor, descendant) & $_.Node.DOCUMENT_POSITION_CONTAINED_BY);
}