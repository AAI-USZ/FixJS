function(range) {
			var refNode = getAllEffectivelyContainedNodes(range, function(node) {
				return isEditable(node)
					&& node.nodeType == $_.Node.TEXT_NODE;
			})[0];

			if (typeof refNode == "undefined") {
				refNode = range.startContainer;
			}

			return getEffectiveCommandValue(refNode, command);
		}