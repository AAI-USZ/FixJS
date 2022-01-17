function() {
		// "Let range be the active range."
		var range = getActiveRange();

		// "While range's start offset is 0 and its start node's parent is not
		// null, set range's start to (parent of start node, index of start
		// node)."
		while (range.startOffset == 0
		&& range.startContainer.parentNode) {
			range.setStart(range.startContainer.parentNode, getNodeIndex(range.startContainer));
		}

		// "While range's end offset is the length of its end node, and its end
		// node's parent is not null, set range's end to (parent of end node, 1
		// + index of start node)."
		while (range.endOffset == getNodeLength(range.endContainer)
		&& range.endContainer.parentNode) {
			range.setEnd(range.endContainer.parentNode, 1 + getNodeIndex(range.endContainer));
		}

		// "Delete the contents of range, with block merging false."
		deleteContents(range, {blockMerging: false});

		// "If the active range's start node is neither editable nor an editing
		// host, abort these steps."
		if (!isEditable(getActiveRange().startContainer)
		&& !isEditingHost(getActiveRange().startContainer)) {
			return;
		}

		// "If the active range's start node is a Text node and its start
		// offset is zero, set the active range's start and end to (parent of
		// start node, index of start node)."
		if (getActiveRange().startContainer.nodeType == Node.TEXT_NODE
		&& getActiveRange().startOffset == 0) {
			getActiveRange().setStart(getActiveRange().startContainer.parentNode, getNodeIndex(getActiveRange().startContainer));
			getActiveRange().collapse(true);
		}

		// "If the active range's start node is a Text node and its start
		// offset is the length of its start node, set the active range's start
		// and end to (parent of start node, 1 + index of start node)."
		if (getActiveRange().startContainer.nodeType == Node.TEXT_NODE
		&& getActiveRange().startOffset == getNodeLength(getActiveRange().startContainer)) {
			getActiveRange().setStart(getActiveRange().startContainer.parentNode, 1 + getNodeIndex(getActiveRange().startContainer));
			getActiveRange().collapse(true);
		}

		// "Let hr be the result of calling createElement("hr") on the
		// context object."
		var hr = document.createElement("hr");

		// "Run insertNode(hr) on the range."
		range.insertNode(hr);

		// "Fix disallowed ancestors of hr."
		fixDisallowedAncestors(hr, range);

		// "Run collapse() on the Selection, with first argument equal to the
		// parent of hr and the second argument equal to one plus the index of
		// hr."
		//
		// Not everyone actually supports collapse(), so we do it manually
		// instead.  Also, we need to modify the actual range we're given as
		// well, for the sake of autoimplementation.html's range-filling-in.
		range.setStart(hr.parentNode, 1 + getNodeIndex(hr));
		range.setEnd(hr.parentNode, 1 + getNodeIndex(hr));
		Aloha.getSelection().removeAllRanges();
		Aloha.getSelection().addRange(range);
	}