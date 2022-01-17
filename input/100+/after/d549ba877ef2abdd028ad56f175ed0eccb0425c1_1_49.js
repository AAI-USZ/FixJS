function(value, range) {
		
		
		// "Delete the contents of the active range."
		deleteContents(range);

		// "If the active range's start node is neither editable nor an editing
		// host, abort these steps."
		if (!isEditable(range.startContainer)
		&& !isEditingHost(range.startContainer)) {
			return;
		}

		// "Let frag be the result of calling createContextualFragment(value)
		// on the active range."
		var frag = range.createContextualFragment(value);

		// "Let last child be the lastChild of frag."
		var lastChild = frag.lastChild;

		// "If last child is null, abort these steps."
		if (!lastChild) {
			return;
		}

		// "Let descendants be all descendants of frag."
		var descendants = getDescendants(frag);

		// "If the active range's start node is a block node:"
		if (isBlockNode(range.startContainer)) {
			// "Let collapsed block props be all editable collapsed block prop
			// children of the active range's start node that have index
			// greater than or equal to the active range's start offset."
			//
			// "For each node in collapsed block props, remove node from its
			// parent."
			$_(range.startContainer.childNodes).filter(function(node, range) {
				return isEditable(node)
					&& isCollapsedBlockProp(node)
					&& getNodeIndex(node) >= range.startOffset;
			}, true).forEach(function(node) {
				node.parentNode.removeChild(node);
			});
		}

		// "Call insertNode(frag) on the active range."
		range.insertNode(frag);

		// "If the active range's start node is a block node with no visible
		// children, call createElement("br") on the context object and append
		// the result as the last child of the active range's start node."
		if (isBlockNode(range.startContainer)
		&& !$_(range.startContainer.childNodes).some(isVisible)) {
			range.startContainer.appendChild(createEndBreak());
		}

		// "Call collapse() on the context object's Selection, with last
		// child's parent as the first argument and one plus its index as the
		// second."
		range.setStart(lastChild.parentNode, 1 + getNodeIndex(lastChild));
		range.setEnd(lastChild.parentNode, 1 + getNodeIndex(lastChild));

		// "Fix disallowed ancestors of each member of descendants."
		for (var i = 0; i < descendants.length; i++) {
			fixDisallowedAncestors(descendants[i], range);
		}
		
		setActiveRange( range );
	}