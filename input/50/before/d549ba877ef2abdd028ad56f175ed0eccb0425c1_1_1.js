function isAncestor(ancestor, descendant) {
	return ancestor
		&& descendant
		&& Boolean(compareDocumentPosition(ancestor, descendant) & Node.DOCUMENT_POSITION_CONTAINED_BY);
}