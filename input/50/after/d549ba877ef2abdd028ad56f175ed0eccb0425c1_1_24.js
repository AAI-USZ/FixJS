function(node) {
			return isEditable(node) && node.nodeType == $_.Node.TEXT_NODE;
		}