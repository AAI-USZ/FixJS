function deleteContents() {
	// We accept several different calling conventions:
	//
	// 1) A single argument, which is a range.
	//
	// 2) Two arguments, the first being a range and the second flags.
	//
	// 3) Four arguments, the start and end of a range.
	//
	// 4) Five arguments, the start and end of a range plus flags.
	//
	// The flags argument is a dictionary that can have up to two keys,
	// blockMerging and stripWrappers, whose corresponding values are
	// interpreted as boolean.  E.g., {stripWrappers: false}.
	var range;
	var flags = {};

	if (arguments.length < 3) {
		range = arguments[0];
	} else {
		range = Aloha.createRange();
		range.setStart(arguments[0], arguments[1]);
		range.setEnd(arguments[2], arguments[3]);
	}
	if (arguments.length == 2) {
		flags = arguments[1];
	}
	if (arguments.length == 5) {
		flags = arguments[4];
	}

	var blockMerging = "blockMerging" in flags ? !!flags.blockMerging : true;
	var stripWrappers = "stripWrappers" in flags ? !!flags.stripWrappers : true;

	// "If range is null, abort these steps and do nothing."
	if (!range) {
		return;
	}

	// "Let start node, start offset, end node, and end offset be range's start
	// and end nodes and offsets."
	var startNode = range.startContainer;
	var startOffset = range.startOffset;
	var endNode = range.endContainer;
	var endOffset = range.endOffset;

	// "While start node has at least one child:"
	while (startNode.hasChildNodes()) {
		// "If start offset is start node's length, and start node's parent is
		// in the same editing host, and start node is an inline node, set
		// start offset to one plus the index of start node, then set start
		// node to its parent and continue this loop from the beginning."
		if (startOffset == getNodeLength(startNode)
		&& inSameEditingHost(startNode, startNode.parentNode)
		&& isInlineNode(startNode)) {
			startOffset = 1 + getNodeIndex(startNode);
			startNode = startNode.parentNode;
			continue;
		}

		// "If start offset is start node's length, break from this loop."
		if (startOffset == getNodeLength(startNode)) {
			break;
		}

		// "Let reference node be the child of start node with index equal to
		// start offset."
		var referenceNode = startNode.childNodes[startOffset];

		// "If reference node is a block node or an Element with no children,
		// or is neither an Element nor a Text node, break from this loop."
		if (isBlockNode(referenceNode)
		|| (referenceNode.nodeType == $_.Node.ELEMENT_NODE
		&& !referenceNode.hasChildNodes())
		|| (referenceNode.nodeType != $_.Node.ELEMENT_NODE
		&& referenceNode.nodeType != $_.Node.TEXT_NODE)) {
			break;
		}

		// "Set start node to reference node and start offset to 0."
		startNode = referenceNode;
		startOffset = 0;
	}

	// window.console.log("endNodeHasChildnodes: "  + endNode.hasChildNodes());
	// "While end node has at least one child:"
	while (endNode.hasChildNodes()) {
		// "If end offset is 0, and end node's parent is in the same editing
		// host, and end node is an inline node, set end offset to the index of
		// end node, then set end node to its parent and continue this loop
		// from the beginning."
		if (endOffset == 0
		&& inSameEditingHost(endNode, endNode.parentNode)
		&& isInlineNode(endNode)) {
			endOffset = getNodeIndex(endNode);
			endNode = endNode.parentNode;
			continue;
		}

		// "If end offset is 0, break from this loop."
		if (endOffset == 0) {
			break;
		}

		// "Let reference node be the child of end node with index equal to end
		// offset minus one."
		var referenceNode = endNode.childNodes[endOffset - 1];

		// "If reference node is a block node or an Element with no children,
		// or is neither an Element nor a Text node, break from this loop."
		if (isBlockNode(referenceNode)
		|| (referenceNode.nodeType == $_.Node.ELEMENT_NODE
		&& !referenceNode.hasChildNodes())
		|| (referenceNode.nodeType != $_.Node.ELEMENT_NODE
		&& referenceNode.nodeType != $_.Node.TEXT_NODE)) {
			break;
		}

		// "Set end node to reference node and end offset to the length of
		// reference node."
		endNode = referenceNode;
		endOffset = getNodeLength(referenceNode);
	}

	// "If (end node, end offset) is not after (start node, start offset), set
	// range's end to its start and abort these steps."
	if (getPosition(endNode, endOffset, startNode, startOffset) !== "after") {
		range.setEnd(range.startContainer, range.startOffset);
		return;
	}

	// "If start node is a Text node and start offset is 0, set start offset to
	// the index of start node, then set start node to its parent."
	if (startNode.nodeType == $_.Node.TEXT_NODE
	&& startOffset == 0
	&& startNode != endNode) {
//		startOffset = getNodeIndex(startNode);
//		startNode = startNode.parentNode;
	}

	// "If end node is a Text node and end offset is its length, set end offset
	// to one plus the index of end node, then set end node to its parent."
	if (endNode.nodeType == $_.Node.TEXT_NODE
	&& endOffset == getNodeLength(endNode)
	&& startNode != endNode) {
		endOffset = 1 + getNodeIndex(endNode);
		endNode = endNode.parentNode;
	}

	// "Set range's start to (start node, start offset) and its end to (end
	// node, end offset)."
	range.setStart(startNode, startOffset);
	range.setEnd(endNode, endOffset);

	// "Let start block be the start node of range."
	var startBlock = range.startContainer;

	// "While start block's parent is in the same editing host and start block
	// is an inline node, set start block to its parent."
	while (inSameEditingHost(startBlock, startBlock.parentNode)
	&& isInlineNode(startBlock)) {
		startBlock = startBlock.parentNode;
	}

	// "If start block is neither a block node nor an editing host, or "span"
	// is not an allowed child of start block, or start block is a td or th,
	// set start block to null."
	if ((!isBlockNode(startBlock) && !isEditingHost(startBlock))
	|| !isAllowedChild("span", startBlock)
	|| isHtmlElement(startBlock, ["td", "th"])) {
		startBlock = null;
	}

	// "Let end block be the end node of range."
	var endBlock = range.endContainer;
//	debugger;

	
	// "While end block's parent is in the same editing host and end block is
	// an inline node, set end block to its parent."
	//window.console.log("! check: " + inSameEditingHost(endBlock, endBlock.parentNode));
	//window.console.log("! check: " + isInlineNode(endBlock));
	//window.console.log("EndBlock: " + endBlock.className + " " + endBlock.id + " type:" + endBlock.type);
	//window.console.log("Parent: " + endBlock.parentNode.id + " " + endBlock.parentNode.id.className  + " " + endBlock.parentNode.id.type); 
	while (inSameEditingHost(endBlock, endBlock.parentNode)
	&& isInlineNode(endBlock)) {
		endBlock = endBlock.parentNode;
		//window.console.log('Updateing endBlock');
	}
//	endBlock = endBlock.parentNode;
	//window.console.log("EndBlock: " + endBlock.className + " " + endBlock.id);
	
	// "If end block is neither a block node nor an editing host, or "span" is
	// not an allowed child of end block, or end block is a td or th, set end
	// block to null."
	if ((!isBlockNode(endBlock) && !isEditingHost(endBlock))
	|| !isAllowedChild("span", endBlock)
	|| isHtmlElement(endBlock, ["td", "th"])) {
		endBlock = null;
	}

	// "Record current states and values, and let overrides be the result."
	var overrides = recordCurrentStatesAndValues(range);
	//window.console.log("EndBlock: " + endBlock.className + " " + endBlock.id);
	// "If start node and end node are the same, and start node is an editable
	// Text node:"
	if (startNode == endNode
	&& isEditable(startNode)
	&& startNode.nodeType == $_.Node.TEXT_NODE) {
		// "Let parent be the parent of node."
		var parent_ = startNode.parentNode;

		// "Call deleteData(start offset, end offset − start offset) on start
		// node."
		startNode.deleteData(startOffset, endOffset - startOffset);

		// "Canonicalize whitespace at (start node, start offset)."
		canonicalizeWhitespace(startNode, startOffset);

		// "Set range's end to its start."
		range.setEnd(range.startContainer, range.startOffset);

		// "Restore states and values from overrides."
		restoreStatesAndValues(overrides, range);

		// "If parent is editable or an editing host, is not an inline node,
		// and has no children, call createElement("br") on the context object
		// and append the result as the last child of parent."
		// only do this, if the offsetHeight is 0
		if ((isEditable(parent_) || isEditingHost(parent_))
		&& !isInlineNode(parent_)
		&& parent_.offsetHeight === 0) {
			parent_.appendChild(createEndBreak());
		}

		//window.console.log('Returning early');
		// "Abort these steps."
		return;
	}

	// "If start node is an editable Text node, call deleteData() on it, with
	// start offset as the first argument and (length of start node − start
	// offset) as the second argument."
	if (isEditable(startNode)
	&& startNode.nodeType == $_.Node.TEXT_NODE) {
		startNode.deleteData(startOffset, getNodeLength(startNode) - startOffset);
	}

	// "Let node list be a list of nodes, initially empty."
	//
	// "For each node contained in range, append node to node list if the last
	// member of node list (if any) is not an ancestor of node; node is
	// editable; and node is not a thead, tbody, tfoot, tr, th, or td."
	var nodeList = getContainedNodes(range,
		function(node) {
			return isEditable(node)
				&& !isHtmlElement(node, ["thead", "tbody", "tfoot", "tr", "th", "td"]);
		}
	);

	// "For each node in node list:"
	for (var i = 0; i < nodeList.length; i++) {
		var node = nodeList[i];

		// "Let parent be the parent of node."
		var parent_ = node.parentNode;

		// "Remove node from parent."
		parent_.removeChild(node);

		// "If strip wrappers is true or parent is not an ancestor container of
		// start node, while parent is an editable inline node with length 0,
		// let grandparent be the parent of parent, then remove parent from
		// grandparent, then set parent to grandparent."
		if (stripWrappers
		|| (!isAncestor(parent_, startNode) && parent_ != startNode)) {
			while (isEditable(parent_)
			&& isInlineNode(parent_)
			&& getNodeLength(parent_) == 0) {
				var grandparent = parent_.parentNode;
				grandparent.removeChild(parent_);
				parent_ = grandparent;
			}
		}

		// "If parent is editable or an editing host, is not an inline node,
		// and has no children, call createElement("br") on the context object
		// and append the result as the last child of parent."
		// only do this, if the offsetHeight is 0
		if ((isEditable(parent_) || isEditingHost(parent_))
		&& !isInlineNode(parent_)
		&& !parent_.hasChildNodes()
		&& parent_.offsetHeight === 0) {
			parent_.appendChild(createEndBreak());
		}
	}

	// "If end node is an editable Text node, call deleteData(0, end offset) on
	// it."
	if (isEditable(endNode)
	&& endNode.nodeType == $_.Node.TEXT_NODE) {
		endNode.deleteData(0, endOffset);
	}

	// "Canonicalize whitespace at range's start."
	canonicalizeWhitespace(range.startContainer, range.startOffset);

	// "Canonicalize whitespace at range's end."
	canonicalizeWhitespace(range.endContainer, range.endOffset);

	//window.console.log(!blockMerging);
	//window.console.log(!startBlock);
	//window.console.log(!endBlock);
	//window.console.log(!inSameEditingHost(startBlock, endBlock));
	//window.console.log(startBlock == endBlock);
	
	//window.console.log("Final StartBlock: "  + startBlock.className + " " + startBlock.id);
	//window.console.log("Final EndBlock: " + endBlock.className + " " + endBlock.id);
	
	
	// "If block merging is false, or start block or end block is null, or
	// start block is not in the same editing host as end block, or start block
	// and end block are the same:"
	if (!blockMerging
	|| !startBlock
	|| !endBlock
	|| !inSameEditingHost(startBlock, endBlock)
	|| startBlock == endBlock) {
		// "Set range's end to its start."
		range.setEnd(range.startContainer, range.startOffset);

		// "Restore states and values from overrides."
		restoreStatesAndValues(overrides, range);

		//window.console.log('Returning early2');
		// "Abort these steps."
		return;
	}

	// "If start block has one child, which is a collapsed block prop, remove
	// its child from it."
	if (startBlock.children.length == 1
	&& isCollapsedBlockProp(startBlock.firstChild)) {
		startBlock.removeChild(startBlock.firstChild);
	}

	// "If end block has one child, which is a collapsed block prop, remove its
	// child from it."
	if (endBlock.children.length == 1
	&& isCollapsedBlockProp(endBlock.firstChild)) {
		endBlock.removeChild(endBlock.firstChild);
	}
	//window.console.log("x1");
	// "If start block is an ancestor of end block:"
	if (isAncestor(startBlock, endBlock)) {
		// "Let reference node be end block."
		var referenceNode = endBlock;

		// "While reference node is not a child of start block, set reference
		// node to its parent."
		while (referenceNode.parentNode != startBlock) {
			referenceNode = referenceNode.parentNode;
		}

		// "Set the start and end of range to (start block, index of reference
		// node)."
		range.setStart(startBlock, getNodeIndex(referenceNode));
		range.setEnd(startBlock, getNodeIndex(referenceNode));
		//window.console.log("HasChildNodes: " +  !endBlock.hasChildNodes());
		// "If end block has no children:"
		if (!endBlock.hasChildNodes()) {
			// "While end block is editable and is the only child of its parent
			// and is not a child of start block, let parent equal end block,
			// then remove end block from parent, then set end block to
			// parent."
			while (isEditable(endBlock)
			&& endBlock.parentNode.childNodes.length == 1
			&& endBlock.parentNode != startBlock) {
				var parent_ = endBlock;
				parent_.removeChild(endBlock);
				endBlock = parent_;
			}

			// "If end block is editable and is not an inline node, and its
			// previousSibling and nextSibling are both inline nodes, call
			// createElement("br") on the context object and insert it into end
			// block's parent immediately after end block."

			//window.console.log(isEditable(endBlock));
			//window.console.log(!isInlineNode(endBlock));
			//window.console.log(isInlineNode(endBlock.previousSibling));
			//window.console.log(isInlineNode(endBlock.nextSibling));
					
			if (isEditable(endBlock)
			&& !isInlineNode(endBlock)
			&& isInlineNode(endBlock.previousSibling)
			&& isInlineNode(endBlock.nextSibling)) {
				//window.console.log('9');
				endBlock.parentNode.insertBefore(document.createElement("br"), endBlock.nextSibling);
			}

			// "If end block is editable, remove it from its parent."
			if (isEditable(endBlock)) {
				endBlock.parentNode.removeChild(endBlock);
			}

			// "Restore states and values from overrides."
			restoreStatesAndValues(overrides, range);

			// "Abort these steps."
			return;
		}

		// "If end block's firstChild is not an inline node, restore states and
		// values from overrides, then abort these steps."
		if (!isInlineNode(endBlock.firstChild)) {
			restoreStatesAndValues(overrides, range);
			return;
		}

		// "Let children be a list of nodes, initially empty."
		var children = [];

		// "Append the first child of end block to children."
		children.push(endBlock.firstChild);

		// "While children's last member is not a br, and children's last
		// member's nextSibling is an inline node, append children's last
		// member's nextSibling to children."
		while (!isHtmlElement(children[children.length - 1], "br")
		&& isInlineNode(children[children.length - 1].nextSibling)) {
			children.push(children[children.length - 1].nextSibling);
		}

		// "Record the values of children, and let values be the result."
		var values = recordValues(children);

		// "While children's first member's parent is not start block, split
		// the parent of children."
		while (children[0].parentNode != startBlock) {
			splitParent(children, range);
		}

		// "If children's first member's previousSibling is an editable br,
		// remove that br from its parent."
		if (isEditable(children[0].previousSibling)
		&& isHtmlElement(children[0].previousSibling, "br")) {
			children[0].parentNode.removeChild(children[0].previousSibling);
		}

	// "Otherwise, if start block is a descendant of end block:"
	} else if (isDescendant(startBlock, endBlock)) {
		// "Set the start and end of range to (start block, length of start
		// block)."
		range.setStart(startBlock, getNodeLength(startBlock));
		range.setEnd(startBlock, getNodeLength(startBlock));

		// "Let reference node be start block."
		var referenceNode = startBlock;

		// "While reference node is not a child of end block, set reference
		// node to its parent."
		while (referenceNode.parentNode != endBlock) {
			referenceNode = referenceNode.parentNode;
		}

		// "If reference node's nextSibling is an inline node and start block's
		// lastChild is a br, remove start block's lastChild from it."
		if (isInlineNode(referenceNode.nextSibling)
		&& isHtmlElement(startBlock.lastChild, "br")) {
			startBlock.removeChild(startBlock.lastChild);
		}

		// "Let nodes to move be a list of nodes, initially empty."
		var nodesToMove = [];

		// "If reference node's nextSibling is neither null nor a br nor a
		// block node, append it to nodes to move."
		if (referenceNode.nextSibling
		&& !isHtmlElement(referenceNode.nextSibling, "br")
		&& !isBlockNode(referenceNode.nextSibling)) {
			nodesToMove.push(referenceNode.nextSibling);
		}

		// "While nodes to move is nonempty and its last member's nextSibling
		// is neither null nor a br nor a block node, append it to nodes to
		// move."
		if (nodesToMove.length
		&& nodesToMove[nodesToMove.length - 1].nextSibling
		&& !isHtmlElement(nodesToMove[nodesToMove.length - 1].nextSibling, "br")
		&& !isBlockNode(nodesToMove[nodesToMove.length - 1].nextSibling)) {
			nodesToMove.push(nodesToMove[nodesToMove.length - 1].nextSibling);
		}

		// "Record the values of nodes to move, and let values be the result."
		var values = recordValues(nodesToMove);

		// "For each node in nodes to move, append node as the last child of
		// start block, preserving ranges."
		$_( nodesToMove ).forEach(function(node) {
			movePreservingRanges(node, startBlock, -1, range);
		});

		// "If the nextSibling of reference node is a br, remove it from its
		// parent."
		if (isHtmlElement(referenceNode.nextSibling, "br")) {
			referenceNode.parentNode.removeChild(referenceNode.nextSibling);
		}

	// "Otherwise:"
	} else {
		// "Set the start and end of range to (start block, length of start
		// block)."
		range.setStart(startBlock, getNodeLength(startBlock));
		range.setEnd(startBlock, getNodeLength(startBlock));

		// "If end block's firstChild is an inline node and start block's
		// lastChild is a br, remove start block's lastChild from it."
		if (isInlineNode(endBlock.firstChild)
		&& isHtmlElement(startBlock.lastChild, "br")) {
			startBlock.removeChild(startBlock.lastChild);
		}

		// "Record the values of end block's children, and let values be the
		// result."
		var values = recordValues([].slice.call(toArray(endBlock.childNodes)));

		// "While end block has children, append the first child of end block
		// to start block, preserving ranges."
		while (endBlock.hasChildNodes()) {
			movePreservingRanges(endBlock.firstChild, startBlock, -1, range);
		}

		// "While end block has no children, let parent be the parent of end
		// block, then remove end block from parent, then set end block to
		// parent."
		while (!endBlock.hasChildNodes()) {
			var parent_ = endBlock.parentNode;
			parent_.removeChild(endBlock);
			endBlock = parent_;
		}
	}

	// "Restore the values from values."
	restoreValues(values, range);

	// "If start block has no children, call createElement("br") on the context
	// object and append the result as the last child of start block."
	if (!startBlock.hasChildNodes() && startBlock.offsetHeight == 0) {
		startBlock.appendChild(createEndBreak());
	}

	// "Restore states and values from overrides."
	restoreStatesAndValues(overrides, range);
}