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
		while (true) {
			// check whether the next element is a br or hr
			if ( offset < node.childNodes.length ) {
				isBr = isHtmlElement(node.childNodes[offset], "br") || false;
				isHr = isHtmlElement(node.childNodes[offset], "hr") || false;
			}

			// "If offset is the length of node and node's nextSibling is an
			// editable invisible node, remove node's nextSibling from its
			// parent."
			if (offset == getNodeLength(node)
			&& isEditable(node.nextSibling)
			&& isInvisible(node.nextSibling)) {
				node.parentNode.removeChild(node.nextSibling);

			// "Otherwise, if node has a child with index offset and that child
			// is an editable invisible node, remove that child from node."
			} else if (offset < node.childNodes.length
			&& isEditable(node.childNodes[offset])
			&& (isInvisible(node.childNodes[offset]) || isBr || isHr )) {
				node.removeChild(node.childNodes[offset]);
				if (isBr || isHr) {
					range.setStart(node, offset);
					range.setEnd(node, offset);
					return;
				}

			// "Otherwise, if node has a child with index offset and that child
			// is a collapsed block prop, add one to offset."
			} else if (offset < node.childNodes.length
			&& isCollapsedBlockProp(node.childNodes[offset])) {
				offset++;

			// "Otherwise, if offset is the length of node and node is an
			// inline node, or if node is invisible, set offset to one plus the
			// index of node, then set node to its parent."
			} else if ((offset == getNodeLength(node)
			&& isInlineNode(node))
			|| isInvisible(node)) {
				offset = 1 + getNodeIndex(node);
				node = node.parentNode;

			// "Otherwise, if node has a child with index offset and that child
			// is not a block node or a br or an img, set node to that child,
			// then set offset to zero."
			} else if (offset < node.childNodes.length
			&& !isBlockNode(node.childNodes[offset])
			&& !isHtmlElement(node.childNodes[offset], ["br", "img"])) {
				node = node.childNodes[offset];
				offset = 0;

			// "Otherwise, break from this loop."
			} else {
				break;
			}
		}

		// collapse whitespace in the node, if it is a text node
		collapseWhitespace(node, range);
		offset = range.startOffset;

		// "If node is a Text node and offset is not node's length:"
		if (node.nodeType == $_.Node.TEXT_NODE
		&& offset != getNodeLength(node)) {
			// "Call collapse(node, offset) on the Selection."
			range.setStart(node, offset);
			range.setEnd(node, offset);

			// "Let end offset be offset plus one."
			var endOffset = offset + 1;

			// "While end offset is not node's length and the end offsetth
			// element of node's data has general category M when interpreted
			// as a Unicode code point, add one to end offset."
			//
			// TODO: Not even going to try handling anything beyond the most
			// basic combining marks, since I couldn't find a good list.  I
			// special-case a few Hebrew diacritics too to test basic coverage
			// of non-Latin stuff.
			while (endOffset != node.length
			&& /^[\u0300-\u036f\u0591-\u05bd\u05c1\u05c2]$/.test(node.data[endOffset])) {
				endOffset++;
			}

			// "Delete the contents of the range with start (node, offset) and
			// end (node, end offset)."
			deleteContents(node, offset, node, endOffset);

			// "Abort these steps."
			return;
		}

		// "If node is an inline node, abort these steps."
		if (isInlineNode(node)) {
			return;
		}

		// "If node has a child with index offset and that child is a br or hr
		// or img, call collapse(node, offset) on the Selection. Then delete
		// the contents of the range with start (node, offset) and end (node,
		// offset + 1) and abort these steps."
		if (offset < node.childNodes.length
		&& isHtmlElement(node.childNodes[offset], ["br", "hr", "img"])) {
			range.setStart(node, offset);
			range.setEnd(node, offset);
			deleteContents(node, offset, node, offset + 1);
			return;
		}

		// "Let end node equal node and let end offset equal offset."
		var endNode = node;
		var endOffset = offset;

		// "Repeat the following steps:"
		while (true) {
			// "If end offset is the length of end node, set end offset to one
			// plus the index of end node and then set end node to its parent."
			if (endOffset == getNodeLength(endNode)) {
				endOffset = 1 + getNodeIndex(endNode);
				endNode = endNode.parentNode;

			// "Otherwise, if end node has a an editable invisible child with
			// index end offset, remove it from end node."
			} else if (endOffset < endNode.childNodes.length
			&& isEditable(endNode.childNodes[endOffset])
			&& isInvisible(endNode.childNodes[endOffset])) {
				endNode.removeChild(endNode.childNodes[endOffset]);

			// "Otherwise, break from this loop."
			} else {
				break;
			}
		}

		// "If the child of end node with index end offset minus one is a
		// table, abort these steps."
		if (isHtmlElement(endNode.childNodes[endOffset - 1], "table")) {
			return;
		}

		// "If the child of end node with index end offset is a table:"
		if (isHtmlElement(endNode.childNodes[endOffset], "table")) {
			// "Call collapse(end node, end offset) on the context object's
			// Selection."
			range.setStart(endNode, endOffset);

			// "Call extend(end node, end offset + 1) on the context object's
			// Selection."
			range.setEnd(endNode, endOffset + 1);

			// "Abort these steps."
			return;
		}

		// "If offset is the length of node, and the child of end node with
		// index end offset is an hr or br:"
		if (offset == getNodeLength(node)
		&& isHtmlElement(endNode.childNodes[endOffset], ["br", "hr"])) {
			// "Call collapse(node, offset) on the Selection."
			range.setStart(node, offset);
			range.setEnd(node, offset);

			// "Delete the contents of the range with end (end node, end
			// offset) and end (end node, end offset + 1)."
			deleteContents(endNode, endOffset, endNode, endOffset + 1);

			// "Abort these steps."
			return;
		}

		// "While end node has a child with index end offset:"
		while (endOffset < endNode.childNodes.length) {
			// "If end node's child with index end offset is editable and
			// invisible, remove it from end node."
			if (isEditable(endNode.childNodes[endOffset])
			&& isInvisible(endNode.childNodes[endOffset])) {
				endNode.removeChild(endNode.childNodes[endOffset]);

			// "Otherwise, set end node to its child with index end offset and
			// set end offset to zero."
			} else {
				endNode = endNode.childNodes[endOffset];
				endOffset = 0;
			}
		}

		// "Delete the contents of the range with start (node, offset) and end
		// (end node, end offset)."
		deleteContents(node, offset, endNode, endOffset);
	}