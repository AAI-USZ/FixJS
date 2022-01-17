function normalizeSublists(item, range) {
	// "If item is not an li or it is not editable or its parent is not
	// editable, abort these steps."
	if (!isHtmlElement(item, "LI")
	|| !isEditable(item)
	|| !isEditable(item.parentNode)) {
		return;
	}

	// "Let new item be null."
	var newItem = null;

	// "While item has an ol or ul child:"
	while ([].some.call(item.childNodes, function (node) { return isHtmlElement(node, ["OL", "UL"]) })) {
		// "Let child be the last child of item."
		var child = item.lastChild;

		// "If child is an ol or ul, or new item is null and child is a Text
		// node whose data consists of zero of more space characters:"
		if (isHtmlElement(child, ["OL", "UL"])
		|| (!newItem && child.nodeType == Node.TEXT_NODE && /^[ \t\n\f\r]*$/.test(child.data))) {
			// "Set new item to null."
			newItem = null;

			// "Insert child into the parent of item immediately following
			// item, preserving ranges."
			movePreservingRanges(child, item.parentNode, 1 + getNodeIndex(item), range);

		// "Otherwise:"
		} else {
			// "If new item is null, let new item be the result of calling
			// createElement("li") on the ownerDocument of item, then insert
			// new item into the parent of item immediately after item."
			if (!newItem) {
				newItem = item.ownerDocument.createElement("li");
				item.parentNode.insertBefore(newItem, item.nextSibling);
			}

			// "Insert child into new item as its first child, preserving
			// ranges."
			movePreservingRanges(child, newItem, 0, range);
		}
	}
}