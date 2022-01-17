function(node) {
		return isEditable(node) && node.nodeType == $_.Node.ELEMENT_NODE;
	}