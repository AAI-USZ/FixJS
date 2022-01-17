function(node) {
				return isEditable(node)
					&& node.nodeType == Node.TEXT_NODE;
			}).map(function(node) { return getEffectiveCommandValue(node, command) }