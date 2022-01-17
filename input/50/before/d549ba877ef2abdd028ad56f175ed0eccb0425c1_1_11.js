function(node) {
		return isEditable(node) && node.nodeType == Node.ELEMENT_NODE;
	}