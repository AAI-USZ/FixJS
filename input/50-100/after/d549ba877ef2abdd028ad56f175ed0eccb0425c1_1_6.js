function isEditable(node) {
	// This is slightly a lie, because we're excluding non-HTML elements with
	// contentEditable attributes.
	return node
		&& !isEditingHost(node)
		&& (node.nodeType != $_.Node.ELEMENT_NODE || node.contentEditable != "false")
		&& (isEditingHost(node.parentNode) || isEditable(node.parentNode));
}