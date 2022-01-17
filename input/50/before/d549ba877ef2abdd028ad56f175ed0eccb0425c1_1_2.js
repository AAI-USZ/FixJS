function isDescendant(descendant, ancestor) {
	return ancestor
		&& descendant
		&& Boolean(compareDocumentPosition(ancestor, descendant) & Node.DOCUMENT_POSITION_CONTAINED_BY);
}