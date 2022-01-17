function() {
			var refNode = getAllEffectivelyContainedNodes(getActiveRange(), function(node) {
				return isEditable(node)
					&& node.nodeType == $_.Node.TEXT_NODE;
			})[0];

			if (typeof refNode == "undefined") {
				refNode = getActiveRange().startContainer;
			}

			return getEffectiveCommandValue(refNode, command);
		}