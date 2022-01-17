function() {
		// "A removeFormat candidate is an editable HTML element with local
		// name "abbr", "acronym", "b", "bdi", "bdo", "big", "blink", "cite",
		// "code", "dfn", "em", "font", "i", "ins", "kbd", "mark", "nobr", "q",
		// "s", "samp", "small", "span", "strike", "strong", "sub", "sup",
		// "tt", "u", or "var"."
		function isRemoveFormatCandidate(node) {
			return isEditable(node)
				&& isHtmlElement(node, ["abbr", "acronym", "b", "bdi", "bdo",
				"big", "blink", "cite", "code", "dfn", "em", "font", "i",
				"ins", "kbd", "mark", "nobr", "q", "s", "samp", "small",
				"span", "strike", "strong", "sub", "sup", "tt", "u", "var"]);
		}

		// "Let elements to remove be a list of every removeFormat candidate
		// effectively contained in the active range."
		var elementsToRemove = getAllEffectivelyContainedNodes(getActiveRange(), isRemoveFormatCandidate);

		// "For each element in elements to remove:"
		elementsToRemove.forEach(function(element) {
			// "While element has children, insert the first child of element
			// into the parent of element immediately before element,
			// preserving ranges."
			while (element.hasChildNodes()) {
				movePreservingRanges(element.firstChild, element.parentNode, getNodeIndex(element), range);
			}

			// "Remove element from its parent."
			element.parentNode.removeChild(element);
		});

		// "If the active range's start node is an editable Text node, and its
		// start offset is neither zero nor its start node's length, call
		// splitText() on the active range's start node, with argument equal to
		// the active range's start offset. Then set the active range's start
		// node to the result, and its start offset to zero."
		if (isEditable(getActiveRange().startContainer)
		&& getActiveRange().startContainer.nodeType == Node.TEXT_NODE
		&& getActiveRange().startOffset != 0
		&& getActiveRange().startOffset != getNodeLength(getActiveRange().startContainer)) {
			// Account for browsers not following range mutation rules
			if (getActiveRange().startContainer == getActiveRange().endContainer) {
				var newEnd = getActiveRange().endOffset - getActiveRange().startOffset;
				var newNode = getActiveRange().startContainer.splitText(getActiveRange().startOffset);
				getActiveRange().setStart(newNode, 0);
				getActiveRange().setEnd(newNode, newEnd);
			} else {
				getActiveRange().setStart(getActiveRange().startContainer.splitText(getActiveRange().startOffset), 0);
			}
		}

		// "If the active range's end node is an editable Text node, and its
		// end offset is neither zero nor its end node's length, call
		// splitText() on the active range's end node, with argument equal to
		// the active range's end offset."
		if (isEditable(getActiveRange().endContainer)
		&& getActiveRange().endContainer.nodeType == Node.TEXT_NODE
		&& getActiveRange().endOffset != 0
		&& getActiveRange().endOffset != getNodeLength(getActiveRange().endContainer)) {
			// IE seems to mutate the range incorrectly here, so we need
			// correction here as well.  Have to be careful to set the range to
			// something not including the text node so that getActiveRange()
			// doesn't throw an exception due to a temporarily detached
			// endpoint.
			var newStart = [getActiveRange().startContainer, getActiveRange().startOffset];
			var newEnd = [getActiveRange().endContainer, getActiveRange().endOffset];
			getActiveRange().setEnd(document.documentElement, 0);
			newEnd[0].splitText(newEnd[1]);
			getActiveRange().setStart(newStart[0], newStart[1]);
			getActiveRange().setEnd(newEnd[0], newEnd[1]);
		}

		// "Let node list consist of all editable nodes effectively contained
		// in the active range."
		//
		// "For each node in node list, while node's parent is a removeFormat
		// candidate in the same editing host as node, split the parent of the
		// one-node list consisting of node."
		getAllEffectivelyContainedNodes(getActiveRange(), isEditable).forEach(function(node) {
			while (isRemoveFormatCandidate(node.parentNode)
			&& inSameEditingHost(node.parentNode, node)) {
				splitParent([node], range);
			}
		});

		// "For each of the entries in the following list, in the given order,
		// set the selection's value to null, with command as given."
		[
			"subscript",
			"bold",
			"fontname",
			"fontsize",
			"forecolor",
			"hilitecolor",
			"italic",
			"strikethrough",
			"underline",
		].forEach(function(command) {
			setSelectionValue(command, null);
		});
	}