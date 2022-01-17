function isEditingHost(node) {
	return node
		&& node.nodeType == $_.Node.ELEMENT_NODE
		&& (node.contentEditable == "true"
		|| (node.parentNode
		&& node.parentNode.nodeType == $_.Node.DOCUMENT_NODE
		&& node.parentNode.designMode == "on"));
}