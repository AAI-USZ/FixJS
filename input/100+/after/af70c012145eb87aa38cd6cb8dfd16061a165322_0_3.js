function splitParent(nodeList, range) {
	// "Let original parent be the parent of the first member of node list."
	var originalParent = nodeList[0].parentNode;

	// "If original parent is not editable or its parent is null, do nothing
	// and abort these steps."
	if (!isEditable(originalParent)
	|| !originalParent.parentNode) {
		return;
	}

	// "If the first child of original parent is in node list, remove
	// extraneous line breaks before original parent."
	if ($_(nodeList).indexOf(originalParent.firstChild) != -1) {
		removeExtraneousLineBreaksBefore(originalParent);
	}

	// "If the first child of original parent is in node list, and original
	// parent follows a line break, set follows line break to true. Otherwise,
	// set follows line break to false."
	var followsLineBreak_ = $_(nodeList).indexOf(originalParent.firstChild) != -1
		&& followsLineBreak(originalParent);

	// "If the last child of original parent is in node list, and original
	// parent precedes a line break, set precedes line break to true.
	// Otherwise, set precedes line break to false."
	var precedesLineBreak_ = $_(nodeList).indexOf(originalParent.lastChild) != -1
		&& precedesLineBreak(originalParent);

	// "If the first child of original parent is not in node list, but its last
	// child is:"
	if ($_(nodeList).indexOf(originalParent.firstChild) == -1
	&& $_(nodeList).indexOf(originalParent.lastChild) != -1) {
		// "For each node in node list, in reverse order, insert node into the
		// parent of original parent immediately after original parent,
		// preserving ranges."
		for (var i = nodeList.length - 1; i >= 0; i--) {
			movePreservingRanges(nodeList[i], originalParent.parentNode, 1 + getNodeIndex(originalParent), range);
		}

		// "If precedes line break is true, and the last member of node list
		// does not precede a line break, call createElement("br") on the
		// context object and insert the result immediately after the last
		// member of node list."
		if (precedesLineBreak_
		&& !precedesLineBreak(nodeList[nodeList.length - 1])) {
			//window.console.log('10');
			nodeList[nodeList.length - 1].parentNode.insertBefore(document.createElement("br"), nodeList[nodeList.length - 1].nextSibling);
		}

		// "Remove extraneous line breaks at the end of original parent."
		removeExtraneousLineBreaksAtTheEndOf(originalParent);

		// "Abort these steps."
		return;
	}

	// "If the first child of original parent is not in node list:"
	if ($_(nodeList).indexOf(originalParent.firstChild) == -1) {
		// "Let cloned parent be the result of calling cloneNode(false) on
		// original parent."
		var clonedParent = originalParent.cloneNode(false);

		// "If original parent has an id attribute, unset it."
		originalParent.removeAttribute("id");

		// "Insert cloned parent into the parent of original parent immediately
		// before original parent."
		originalParent.parentNode.insertBefore(clonedParent, originalParent);

		// "While the previousSibling of the first member of node list is not
		// null, append the first child of original parent as the last child of
		// cloned parent, preserving ranges."
		while (nodeList[0].previousSibling) {
			movePreservingRanges(originalParent.firstChild, clonedParent, clonedParent.childNodes.length, range);
		}
	}

	// "For each node in node list, insert node into the parent of original
	// parent immediately before original parent, preserving ranges."
	for (var i = 0; i < nodeList.length; i++) {
		movePreservingRanges(nodeList[i], originalParent.parentNode, getNodeIndex(originalParent), range);
	}

	// "If follows line break is true, and the first member of node list does
	// not follow a line break, call createElement("br") on the context object
	// and insert the result immediately before the first member of node list."
	if (followsLineBreak_
	&& !followsLineBreak(nodeList[0])) {
		//window.console.log('11');
		nodeList[0].parentNode.insertBefore(document.createElement("br"), nodeList[0]);
	}

	// "If the last member of node list is an inline node other than a br, and
	// the first child of original parent is a br, and original parent is not
	// an inline node, remove the first child of original parent from original
	// parent."
	if (isInlineNode(nodeList[nodeList.length - 1])
	&& !isHtmlElement(nodeList[nodeList.length - 1], "br")
	&& isHtmlElement(originalParent.firstChild, "br")
	&& !isInlineNode(originalParent)) {
		originalParent.removeChild(originalParent.firstChild);
	}

	// "If original parent has no children:"
	if (!originalParent.hasChildNodes()) {
		// if the current range is collapsed and at the end of the originalParent.parentNode
		// the offset will not be available anymore after the next step (remove child)
		// that's why we need to fix the range to prevent a bogus offset
		if (originalParent.parentNode === range.startContainer
		&& originalParent.parentNode === range.endContainer
		&& range.startContainer === range.endContainer
		&& range.startOffset === range.endOffset
		&& originalParent.parentNode.childNodes.length === range.startOffset) {
			range.startOffset = originalParent.parentNode.childNodes.length - 1;
			range.endOffset = range.startOffset;
		}

		// "Remove original parent from its parent."
		originalParent.parentNode.removeChild(originalParent);

		// "If precedes line break is true, and the last member of node list
		// does not precede a line break, call createElement("br") on the
		// context object and insert the result immediately after the last
		// member of node list."
		if (precedesLineBreak_
		&& !precedesLineBreak(nodeList[nodeList.length - 1])) {
			//window.console.log('12');
			nodeList[nodeList.length - 1].parentNode.insertBefore(document.createElement("br"), nodeList[nodeList.length - 1].nextSibling);
		}

	// "Otherwise, remove extraneous line breaks before original parent."
	} else {
		removeExtraneousLineBreaksBefore(originalParent);
	}

	// "If node list's last member's nextSibling is null, but its parent is not
	// null, remove extraneous line breaks at the end of node list's last
	// member's parent."
	if (!nodeList[nodeList.length - 1].nextSibling
	&& nodeList[nodeList.length - 1].parentNode) {
		removeExtraneousLineBreaksAtTheEndOf(nodeList[nodeList.length - 1].parentNode);
	}
}