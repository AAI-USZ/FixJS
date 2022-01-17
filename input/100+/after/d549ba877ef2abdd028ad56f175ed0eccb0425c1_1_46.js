function() {
		// "Block-extend the active range, and let new range be the result."
		var newRange = blockExtend(getActiveRange());

		// "Let node be the first visible editable node that is contained in
		// new range and has no children. If there is no such node, return the
		// empty string."
		var nodes = getAllContainedNodes(newRange, function(node) {
			return isVisible(node)
				&& isEditable(node)
				&& !node.hasChildNodes();
		});
		if (!nodes.length) {
			return "";
		}
		var node = nodes[0];

		// "While node's parent is editable and in the same editing host as
		// node, and node is not an HTML element whose local name is a
		// formattable block name, set node to its parent."
		while (isEditable(node.parentNode)
		&& inSameEditingHost(node, node.parentNode)
		&& !isHtmlElement(node, formattableBlockNames)) {
			node = node.parentNode;
		}

		// "If node is an editable HTML element whose local name is a
		// formattable block name, and node is not the ancestor of a prohibited
		// paragraph child, return node's local name, converted to ASCII
		// lowercase."
		if (isEditable(node)
		&& isHtmlElement(node, formattableBlockNames)
		&& !$_( getDescendants(node) ).some(isProhibitedParagraphChild)) {
			return node.tagName.toLowerCase();
		}

		// "Return the empty string."
		return "";
	}