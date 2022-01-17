function isEditingHost(node) {
	return node
		&& node.nodeType == Node.ELEMENT_NODE
		&& (node.contentEditable == "true"
		|| (node.parentNode
		&& node.parentNode.nodeType == Node.DOCUMENT_NODE
		&& node.parentNode.designMode == "on"));
}