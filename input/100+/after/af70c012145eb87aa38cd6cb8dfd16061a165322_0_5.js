function(value, range) {
		// "Delete the contents of the active range, with strip wrappers false."
		deleteContents(range, {stripWrappers: false});

		// "If the active range's start node is neither editable nor an editing
		// host, abort these steps."
		if (!isEditable(range.startContainer)
		&& !isEditingHost(range.startContainer)) {
			return;
		}

		// "If the active range's start node is an Element, and "br" is not an
		// allowed child of it, abort these steps."
		if (range.startContainer.nodeType == $_.Node.ELEMENT_NODE
		&& !isAllowedChild("br", range.startContainer)) {
			return;
		}

		// "If the active range's start node is not an Element, and "br" is not
		// an allowed child of the active range's start node's parent, abort
		// these steps."
		if (range.startContainer.nodeType != $_.Node.ELEMENT_NODE
		&& !isAllowedChild("br", range.startContainer.parentNode)) {
			return;
		}

		// "If the active range's start node is a Text node and its start
		// offset is zero, call collapse() on the context object's Selection,
		// with first argument equal to the active range's start node's parent
		// and second argument equal to the active range's start node's index."
		if (range.startContainer.nodeType == $_.Node.TEXT_NODE
		&& range.startOffset == 0) {
			var newNode = range.startContainer.parentNode;
			var newOffset = getNodeIndex(range.startContainer);
			Aloha.getSelection().collapse(newNode, newOffset);
			range.setStart(newNode, newOffset);
			range.setEnd(newNode, newOffset);
		}

		// "If the active range's start node is a Text node and its start
		// offset is the length of its start node, call collapse() on the
		// context object's Selection, with first argument equal to the active
		// range's start node's parent and second argument equal to one plus
		// the active range's start node's index."
		if (range.startContainer.nodeType == $_.Node.TEXT_NODE
		&& range.startOffset == getNodeLength(range.startContainer)) {
			var newNode = range.startContainer.parentNode;
			var newOffset = 1 + getNodeIndex(range.startContainer);
			Aloha.getSelection().collapse(newNode, newOffset);
			range.setStart(newNode, newOffset);
			range.setEnd(newNode, newOffset);
		}

		// "Let br be the result of calling createElement("br") on the context
		// object."
		//window.console.log('3');
		var br = document.createElement("br");

		// "Call insertNode(br) on the active range."
		range.insertNode(br);

		// "Call collapse() on the context object's Selection, with br's parent
		// as the first argument and one plus br's index as the second
		// argument."
		Aloha.getSelection().collapse(br.parentNode, 1 + getNodeIndex(br));
		range.setStart(br.parentNode, 1 + getNodeIndex(br));
		range.setEnd(br.parentNode, 1 + getNodeIndex(br));

		// "If br is a collapsed line break, call createElement("br") on the
		// context object and let extra br be the result, then call
		// insertNode(extra br) on the active range."
		if (isCollapsedLineBreak(br)) {
			range.insertNode(createEndBreak());

			// Compensate for nonstandard implementations of insertNode
			Aloha.getSelection().collapse(br.parentNode, 1 + getNodeIndex(br));
			range.setStart(br.parentNode, 1 + getNodeIndex(br));
			range.setEnd(br.parentNode, 1 + getNodeIndex(br));
		}
	}