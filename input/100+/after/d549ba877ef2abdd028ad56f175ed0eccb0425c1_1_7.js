function isWhitespaceNode(node) {
	return node
		&& node.nodeType == $_.Node.TEXT_NODE
		&& (node.data == ""
		|| (
			/^[\t\n\r ]+$/.test(node.data)
			&& node.parentNode
			&& node.parentNode.nodeType == $_.Node.ELEMENT_NODE
			&& $_( ["normal", "nowrap"] ).indexOf($_.getComputedStyle(node.parentNode).whiteSpace) != -1
		) || (
			/^[\t\r ]+$/.test(node.data)
			&& node.parentNode
			&& node.parentNode.nodeType == $_.Node.ELEMENT_NODE
			&& $_.getComputedStyle(node.parentNode).whiteSpace == "pre-line"
		) || (
			/^[\t\n\r ]+$/.test(node.data)
			&& node.parentNode
			&& node.parentNode.nodeType == $_.Node.DOCUMENT_FRAGMENT_NODE
		));
}