function(value, range) {
		// "If the active range is not collapsed, delete the contents of the
		// active range and abort these steps."
		if (!range.collapsed) {
			deleteContents(range);
			return;
		}

		// "Canonicalize whitespace at (active range's start node, active
		// range's start offset)."
		canonicalizeWhitespace(range.startContainer, range.startOffset);

		// "Let node and offset be the active range's start node and offset."
		var node = range.startContainer;
		var offset = range.startOffset;
		var isBr = false;
		var isHr = false;

		// "Repeat the following steps:"
		while ( true ) {
			// we need to reset isBr and isHr on every interation of the loop
			if ( offset > 0 ) {
				isBr = isHtmlElement(node.childNodes[offset - 1], "br") || false;
				isHr = isHtmlElement(node.childNodes[offset - 1], "hr") || false;
			}

			// "If offset is zero and node's previousSibling is an editable
			// invisible node, remove node's previousSibling from its parent."
			if (offset == 0
			&& isEditable(node.previousSibling)
			&& isInvisible(node.previousSibling)) {
				node.parentNode.removeChild(node.previousSibling);

			// "Otherwise, if node has a child with index offset − 1 and that
			// child is an editable invisible node, remove that child from
			// node, then subtract one from offset."
			} else if (0 <= offset - 1
			&& offset - 1 < node.childNodes.length
			&& isEditable(node.childNodes[offset - 1])
			&& (isInvisible(node.childNodes[offset - 1]) || isBr || isHr )) {
				node.removeChild(node.childNodes[offset - 1]);
				offset--;
				if (isBr || isHr) {
					range.setStart(node, offset);
					range.setEnd(node, offset);
					return;
				}

			// "Otherwise, if offset is zero and node is an inline node, or if
			// node is an invisible node, set offset to the index of node, then
			// set node to its parent."
			} else if ((offset == 0
			&& isInlineNode(node))
			|| isInvisible(node)) {
				offset = getNodeIndex(node);
				node = node.parentNode;

			// "Otherwise, if node has a child with index offset − 1 and that
			// child is an editable a, remove that child from node, preserving
			// its descendants. Then abort these steps."
			} else if (0 <= offset - 1
			&& offset - 1 < node.childNodes.length
			&& isEditable(node.childNodes[offset - 1])
			&& isHtmlElement(node.childNodes[offset - 1], "a")) {
				removePreservingDescendants(node.childNodes[offset - 1], range);
				return;

			// "Otherwise, if node has a child with index offset − 1 and that
			// child is not a block node or a br or an img, set node to that
			// child, then set offset to the length of node."
			} else if (0 <= offset - 1
			&& offset - 1 < node.childNodes.length
			&& !isBlockNode(node.childNodes[offset - 1])
			&& !isHtmlElement(node.childNodes[offset - 1], ["br", "img"])) {
				node = node.childNodes[offset - 1];
				offset = getNodeLength(node);

			// "Otherwise, break from this loop."
			} else {
				break;
			}
		}

		// "If node is a Text node and offset is not zero, call collapse(node,
		// offset) on the Selection. Then delete the contents of the range with
		// start (node, offset − 1) and end (node, offset) and abort these
		// steps."
		if (node.nodeType == $_.Node.TEXT_NODE
		&& offset != 0) {
			range.setStart(node, offset);
			range.setEnd(node, offset);
			// fix range start container offset according to old code
			// so we can still pass our range and have it modified, but
			// also conform with the previous implementation
			range.startOffset -= 1;
			deleteContents(range);
			return;
		}

		// "If node is an inline node, abort these steps."
		if (isInlineNode(node)) {
			return;
		}

		// "If node has a child with index offset − 1 and that child is a br or
		// hr or img, call collapse(node, offset) on the Selection. Then delete
		// the contents of the range with start (node, offset − 1) and end
		// (node, offset) and abort these steps."
		if (0 <= offset - 1
		&& offset - 1 < node.childNodes.length
		&& isHtmlElement(node.childNodes[offset - 1], ["br", "hr", "img"])) {
			range.setStart(node, offset);
			range.setEnd(node, offset);
			deleteContents(range);
			return;
		}

		// "If node is an li or dt or dd and is the first child of its parent,
		// and offset is zero:"
		if (isHtmlElement(node, ["li", "dt", "dd"])
		&& node == node.parentNode.firstChild
		&& offset == 0) {
			// "Let items be a list of all lis that are ancestors of node."
			//
			// Remember, must be in tree order.
			var items = [];
			for (var ancestor = node.parentNode; ancestor; ancestor = ancestor.parentNode) {
				if (isHtmlElement(ancestor, "li")) {
					items.unshift(ancestor);
				}
			}

			// "Normalize sublists of each item in items."
			for (var i = 0; i < items.length; i++) {
				normalizeSublists(items[i], range);
			}

			// "Record the values of the one-node list consisting of node, and
			// let values be the result."
			var values = recordValues([node]);

			// "Split the parent of the one-node list consisting of node."
			splitParent([node], range);

			// "Restore the values from values."
			restoreValues(values, range);

			// "If node is a dd or dt, and it is not an allowed child of any of
			// its ancestors in the same editing host, set the tag name of node
			// to the default single-line container name and let node be the
			// result."
			if (isHtmlElement(node, ["dd", "dt"])
			&& $_(getAncestors(node)).every(function(ancestor) {
				return !inSameEditingHost(node, ancestor)
					|| !isAllowedChild(node, ancestor)
			})) {
				node = setTagName(node, defaultSingleLineContainerName, range);
			}

			// "Fix disallowed ancestors of node."
			fixDisallowedAncestors(node, range);

			// "Abort these steps."
			return;
		}

		// "Let start node equal node and let start offset equal offset."
		var startNode = node;
		var startOffset = offset;

		// "Repeat the following steps:"
		while (true) {
			// "If start offset is zero, set start offset to the index of start
			// node and then set start node to its parent."
			if (startOffset == 0) {
				startOffset = getNodeIndex(startNode);
				startNode = startNode.parentNode;

			// "Otherwise, if start node has an editable invisible child with
			// index start offset minus one, remove it from start node and
			// subtract one from start offset."
			} else if (0 <= startOffset - 1
			&& startOffset - 1 < startNode.childNodes.length
			&& isEditable(startNode.childNodes[startOffset - 1])
			&& isInvisible(startNode.childNodes[startOffset - 1])) {
				startNode.removeChild(startNode.childNodes[startOffset - 1]);
				startOffset--;

			// "Otherwise, break from this loop."
			} else {
				break;
			}
		}

		// "If offset is zero, and node has an editable ancestor container in
		// the same editing host that's an indentation element:"
		if (offset == 0
		&& $_( getAncestors(node).concat(node) ).filter(function(ancestor) {
			return isEditable(ancestor)
				&& inSameEditingHost(ancestor, node)
				&& isIndentationElement(ancestor);
		}).length) {
			// "Block-extend the range whose start and end are both (node, 0),
			// and let new range be the result."
			var newRange = Aloha.createRange();
			newRange.setStart(node, 0);
			newRange.setEnd(node, 0);
			newRange = blockExtend(newRange);

			// "Let node list be a list of nodes, initially empty."
			//
			// "For each node current node contained in new range, append
			// current node to node list if the last member of node list (if
			// any) is not an ancestor of current node, and current node is
			// editable but has no editable descendants."
			var nodeList = getContainedNodes(newRange, function(currentNode) {
				return isEditable(currentNode)
					&& !hasEditableDescendants(currentNode);
			});

			// "Outdent each node in node list."
			for (var i = 0; i < nodeList.length; i++) {
				outdentNode(nodeList[i], range);
			}

			// "Abort these steps."
			return;
		}

		// "If the child of start node with index start offset is a table,
		// abort these steps."
		if (isHtmlElement(startNode.childNodes[startOffset], "table")) {
			return;
		}

		// "If start node has a child with index start offset − 1, and that
		// child is a table:"
		if (0 <= startOffset - 1
		&& startOffset - 1 < startNode.childNodes.length
		&& isHtmlElement(startNode.childNodes[startOffset - 1], "table")) {
			// "Call collapse(start node, start offset − 1) on the context
			// object's Selection."
			range.setStart(startNode, startOffset - 1);

			// "Call extend(start node, start offset) on the context object's
			// Selection."
			range.setEnd(startNode, startOffset);

			// "Abort these steps."
			return;
		}

		// "If offset is zero; and either the child of start node with index
		// start offset minus one is an hr, or the child is a br whose
		// previousSibling is either a br or not an inline node:"
		if (offset == 0
		&& (isHtmlElement(startNode.childNodes[startOffset - 1], "hr")
			|| (
				isHtmlElement(startNode.childNodes[startOffset - 1], "br")
				&& (
					isHtmlElement(startNode.childNodes[startOffset - 1].previousSibling, "br")
					|| !isInlineNode(startNode.childNodes[startOffset - 1].previousSibling)
				)
			)
		)) {
			// "Call collapse(node, offset) on the Selection."
			range.setStart(node, offset);
			range.setEnd(node, offset);

			// "Delete the contents of the range with start (start node, start
			// offset − 1) and end (start node, start offset)."
			deleteContents(startNode, startOffset - 1, startNode, startOffset);

			// "Abort these steps."
			return;
		}

		// "If the child of start node with index start offset is an li or dt
		// or dd, and that child's firstChild is an inline node, and start
		// offset is not zero:"
		if (isHtmlElement(startNode.childNodes[startOffset], ["li", "dt", "dd"])
		&& isInlineNode(startNode.childNodes[startOffset].firstChild)
		&& startOffset != 0) {
			// "Let previous item be the child of start node with index start
			// offset minus one."
			var previousItem = startNode.childNodes[startOffset - 1];

			// "If previous item's lastChild is an inline node other than a br,
			// call createElement("br") on the context object and append the
			// result as the last child of previous item."
			if (isInlineNode(previousItem.lastChild)
			&& !isHtmlElement(previousItem.lastChild, "br")) {
				//window.console.log('1');
				previousItem.appendChild(document.createElement("br"));
			}

			// "If previous item's lastChild is an inline node, call
			// createElement("br") on the context object and append the result
			// as the last child of previous item."
			if (isInlineNode(previousItem.lastChild)) {
				//window.console.log('2');
				previousItem.appendChild(document.createElement("br"));
			}
		}

		// "If the child of start node with index start offset is an li or dt
		// or dd, and its previousSibling is also an li or dt or dd, set start
		// node to its child with index start offset − 1, then set start offset
		// to start node's length, then set node to start node's nextSibling,
		// then set offset to 0."
		if (isHtmlElement(startNode.childNodes[startOffset], ["li", "dt", "dd"])
		&& isHtmlElement(startNode.childNodes[startOffset - 1], ["li", "dt", "dd"])) {
			startNode = startNode.childNodes[startOffset - 1];
			startOffset = getNodeLength(startNode);
			node = startNode.nextSibling;
			offset = 0;

		// "Otherwise, while start node has a child with index start offset
		// minus one:"
		} else {
			while (0 <= startOffset - 1
			&& startOffset - 1 < startNode.childNodes.length) {
				// "If start node's child with index start offset minus one is
				// editable and invisible, remove it from start node, then
				// subtract one from start offset."
				if (isEditable(startNode.childNodes[startOffset - 1])
				&& isInvisible(startNode.childNodes[startOffset - 1])) {
					startNode.removeChild(startNode.childNodes[startOffset - 1]);
					startOffset--;

				// "Otherwise, set start node to its child with index start
				// offset minus one, then set start offset to the length of
				// start node."
				} else {
					startNode = startNode.childNodes[startOffset - 1];
					startOffset = getNodeLength(startNode);
				}
			}
		}

		// "Delete the contents of the range with start (start node, start
		// offset) and end (node, offset)."
		var delRange = Aloha.createRange();
		delRange.setStart(startNode, startOffset);
		delRange.setEnd(node, offset);
		deleteContents(delRange);

		if (!isAncestorContainer(document.body, range.startContainer)) {
			if (delRange.startContainer.hasChildNodes() || delRange.startContainer.nodeType == $_.Node.TEXT_NODE) {
				range.setStart(delRange.startContainer, delRange.startOffset);
				range.setEnd(delRange.startContainer, delRange.startOffset);
			} else {
				range.setStart(delRange.startContainer.parentNode, getNodeIndex(delRange.startContainer));
				range.setEnd(delRange.startContainer.parentNode, getNodeIndex(delRange.startContainer));
			}
		}
	}