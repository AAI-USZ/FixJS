function(node) {
			return isEditable(node) && node.nodeType == Node.TEXT_NODE;
		}