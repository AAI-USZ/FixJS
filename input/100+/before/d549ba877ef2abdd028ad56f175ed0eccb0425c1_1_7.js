function isWhitespaceNode(node) {
	return node
		&& node.nodeType == Node.TEXT_NODE
		&& (node.data == ""
		|| (
			/^[\t\n\r ]+$/.test(node.data)
			&& node.parentNode
			&& node.parentNode.nodeType == Node.ELEMENT_NODE
			&& ["normal", "nowrap"].indexOf(getComputedStyle(node.parentNode).whiteSpace) != -1
		) || (
			/^[\t\r ]+$/.test(node.data)
			&& node.parentNode
			&& node.parentNode.nodeType == Node.ELEMENT_NODE
			&& getComputedStyle(node.parentNode).whiteSpace == "pre-line"
		) || (
			/^[\t\n\r ]+$/.test(node.data)
			&& node.parentNode
			&& node.parentNode.nodeType == Node.DOCUMENT_FRAGMENT_NODE
		));
}