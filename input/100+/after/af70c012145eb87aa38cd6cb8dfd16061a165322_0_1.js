function wrap(nodeList, siblingCriteria, newParentInstructions, range) {
	// "If not provided, sibling criteria returns false and new parent
	// instructions returns null."
	if (typeof siblingCriteria == "undefined") {
		siblingCriteria = function() { return false };
	}
	if (typeof newParentInstructions == "undefined") {
		newParentInstructions = function() { return null };
	}

	// "If node list is empty, or the first member of node list is not
	// editable, return null and abort these steps."
	if (!nodeList.length
	|| !isEditable(nodeList[0])) {
		return null;
	}

	// "If node list's last member is an inline node that's not a br, and node
	// list's last member's nextSibling is a br, append that br to node list."
	if (isInlineNode(nodeList[nodeList.length - 1])
	&& !isHtmlElement(nodeList[nodeList.length - 1], "br")
	&& isHtmlElement(nodeList[nodeList.length - 1].nextSibling, "br")) {
		nodeList.push(nodeList[nodeList.length - 1].nextSibling);
	}

	// "If the previousSibling of the first member of node list is editable and
	// running sibling criteria on it returns true, let new parent be the
	// previousSibling of the first member of node list."
	var newParent;
	if (isEditable(nodeList[0].previousSibling)
	&& siblingCriteria(nodeList[0].previousSibling)) {
		newParent = nodeList[0].previousSibling;

	// "Otherwise, if the nextSibling of the last member of node list is
	// editable and running sibling criteria on it returns true, let new parent
	// be the nextSibling of the last member of node list."
	} else if (isEditable(nodeList[nodeList.length - 1].nextSibling)
	&& siblingCriteria(nodeList[nodeList.length - 1].nextSibling)) {
		newParent = nodeList[nodeList.length - 1].nextSibling;

	// "Otherwise, run new parent instructions, and let new parent be the
	// result."
	} else {
		newParent = newParentInstructions();
	}

	// "If new parent is null, abort these steps and return null."
	if (!newParent) {
		return null;
	}

	// "If new parent's parent is null:"
	if (!newParent.parentNode) {
		// "Insert new parent into the parent of the first member of node list
		// immediately before the first member of node list."
		nodeList[0].parentNode.insertBefore(newParent, nodeList[0]);

		// "If any range has a boundary point with node equal to the parent of
		// new parent and offset equal to the index of new parent, add one to
		// that boundary point's offset."
		//
		// Try to fix range
		var startContainer = range.startContainer, startOffset = range.startOffset,
			endContainer = range.endContainer, endOffset = range.endOffset;
		if (startContainer == newParent.parentNode
		&& startOffset >= getNodeIndex(newParent)) {
			range.setStart(startContainer, startOffset + 1);
		}
		if (endContainer == newParent.parentNode
		&& endOffset >= getNodeIndex(newParent)) {
			range.setEnd(endContainer, endOffset + 1);
		}

		// Only try to fix the global range. TODO remove globalRange here
		if (globalRange && globalRange !== range) {
			startContainer = globalRange.startContainer, startOffset = globalRange.startOffset,
				endContainer = globalRange.endContainer, endOffset = globalRange.endOffset;
			if (startContainer == newParent.parentNode
			&& startOffset >= getNodeIndex(newParent)) {
				globalRange.setStart(startContainer, startOffset + 1);
			}
			if (endContainer == newParent.parentNode
			&& endOffset >= getNodeIndex(newParent)) {
				globalRange.setEnd(endContainer, endOffset + 1);
			}
		}
	}

	// "Let original parent be the parent of the first member of node list."
	var originalParent = nodeList[0].parentNode;

	// "If new parent is before the first member of node list in tree order:"
	if (isBefore(newParent, nodeList[0])) {
		// "If new parent is not an inline node, but the last child of new
		// parent and the first member of node list are both inline nodes, and
		// the last child of new parent is not a br, call createElement("br")
		// on the ownerDocument of new parent and append the result as the last
		// child of new parent."
		if (!isInlineNode(newParent)
		&& isInlineNode(newParent.lastChild)
		&& isInlineNode(nodeList[0])
		&& !isHtmlElement(newParent.lastChild, "BR")) {
			//window.console.log('6');
			newParent.appendChild(newParent.ownerDocument.createElement("br"));
		}

		// "For each node in node list, append node as the last child of new
		// parent, preserving ranges."
		for (var i = 0; i < nodeList.length; i++) {
			movePreservingRanges(nodeList[i], newParent, -1, range);
		}

	// "Otherwise:"
	} else {
		// "If new parent is not an inline node, but the first child of new
		// parent and the last member of node list are both inline nodes, and
		// the last member of node list is not a br, call createElement("br")
		// on the ownerDocument of new parent and insert the result as the
		// first child of new parent."
		if (!isInlineNode(newParent)
		&& isInlineNode(newParent.firstChild)
		&& isInlineNode(nodeList[nodeList.length - 1])
		&& !isHtmlElement(nodeList[nodeList.length - 1], "BR")) {
			//window.console.log('7');
			newParent.insertBefore(newParent.ownerDocument.createElement("br"), newParent.firstChild);
		}

		// "For each node in node list, in reverse order, insert node as the
		// first child of new parent, preserving ranges."
		for (var i = nodeList.length - 1; i >= 0; i--) {
			movePreservingRanges(nodeList[i], newParent, 0, range);
		}
	}

	// "If original parent is editable and has no children, remove it from its
	// parent."
	if (isEditable(originalParent) && !originalParent.hasChildNodes()) {
		originalParent.parentNode.removeChild(originalParent);
	}

	// "If new parent's nextSibling is editable and running sibling criteria on
	// it returns true:"
	if (isEditable(newParent.nextSibling)
	&& siblingCriteria(newParent.nextSibling)) {
		// "If new parent is not an inline node, but new parent's last child
		// and new parent's nextSibling's first child are both inline nodes,
		// and new parent's last child is not a br, call createElement("br") on
		// the ownerDocument of new parent and append the result as the last
		// child of new parent."
		if (!isInlineNode(newParent)
		&& isInlineNode(newParent.lastChild)
		&& isInlineNode(newParent.nextSibling.firstChild)
		&& !isHtmlElement(newParent.lastChild, "BR")) {
			//window.console.log('8');
			newParent.appendChild(newParent.ownerDocument.createElement("br"));
		}

		// "While new parent's nextSibling has children, append its first child
		// as the last child of new parent, preserving ranges."
		while (newParent.nextSibling.hasChildNodes()) {
			movePreservingRanges(newParent.nextSibling.firstChild, newParent, -1, range);
		}

		// "Remove new parent's nextSibling from its parent."
		newParent.parentNode.removeChild(newParent.nextSibling);
	}

	// "Remove extraneous line breaks from new parent."
	removeExtraneousLineBreaksFrom(newParent);

	// "Return new parent."
	return newParent;
}