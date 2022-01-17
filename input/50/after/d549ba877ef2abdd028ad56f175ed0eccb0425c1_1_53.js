function(node) {
				return isEditable(node)
					&& node.nodeType == $_.Node.TEXT_NODE;
			}) ).map(function(node) { return getEffectiveCommandValue(node, command) }