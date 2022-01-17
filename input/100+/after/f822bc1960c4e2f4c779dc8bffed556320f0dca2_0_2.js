function() {
		// "Block-extend the active range, and let new range be the result."
		var newRange = blockExtend(range);

		// "Let node list be all visible editable nodes that are contained in
		// new range and have no children."
		var nodeList = getAllContainedNodes(newRange, function(node) {
			return isVisible(node)
				&& isEditable(node)
				&& !node.hasChildNodes();
		});

		// "If node list is empty, return false."
		if (!nodeList.length) {
			return false;
		}

		// "Let type be null."
		var type = null;

		// "For each node in node list:"
		for (var i = 0; i < nodeList.length; i++) {
			var node = nodeList[i];

			// "While node's parent is editable and in the same editing host as
			// node, and node is not an HTML element whose local name is a
			// formattable block name, set node to its parent."
			while (isEditable(node.parentNode)
			&& inSameEditingHost(node, node.parentNode)
			&& !isHtmlElement(node, formattableBlockNames)) {
				node = node.parentNode;
			}

			// "Let current type be the empty string."
			var currentType = "";

			// "If node is an editable HTML element whose local name is a
			// formattable block name, and node is not the ancestor of a
			// prohibited paragraph child, set current type to node's local
			// name."
			if (isEditable(node)
			&& isHtmlElement(node, formattableBlockNames)
			&& !$_( getDescendants(node) ).some(isProhibitedParagraphChild)) {
				currentType = node.tagName;
			}

			// "If type is null, set type to current type."
			if (type === null) {
				type = currentType;

			// "Otherwise, if type does not equal current type, return true."
			} else if (type != currentType) {
				return true;
			}
		}

		// "Return false."
		return false;
	}