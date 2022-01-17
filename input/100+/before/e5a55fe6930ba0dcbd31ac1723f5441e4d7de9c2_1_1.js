function setSelectionValue(command, newValue, range) {
	
	// Use current selected range if no range passed
	range = range || getActiveRange();
	
	// "If there is no editable text node effectively contained in the active
	// range:"
	if (!$_( getAllEffectivelyContainedNodes(range) )
	.filter(function(node) { return node.nodeType == $_.Node.TEXT_NODE}, true)
	.some(isEditable)) {
		// "If command has inline command activated values, set the state
		// override to true if new value is among them and false if it's not."
		if ("inlineCommandActivatedValues" in commands[command]) {
			$_( setStateOverride(command, commands[command].inlineCommandActivatedValues )
				.indexOf(newValue) != -1, range);
		}

		// "If command is "subscript", unset the state override for
		// "superscript"."
		if (command == "subscript") {
			unsetStateOverride("superscript", range);
		}

		// "If command is "superscript", unset the state override for
		// "subscript"."
		if (command == "superscript") {
			unsetStateOverride("subscript", range);
		}

		// "If new value is null, unset the value override (if any)."
		if (newValue === null) {
			unsetValueOverride(command, range);

		// "Otherwise, if command has a value specified, set the value override
		// to new value."
		} else if ("value" in commands[command]) {
			setValueOverride(command, newValue, range);
		}

		// "Abort these steps."
		return;
	}

	// "If the active range's start node is an editable Text node, and its
	// start offset is neither zero nor its start node's length, call
	// splitText() on the active range's start node, with argument equal to the
	// active range's start offset. Then set the active range's start node to
	// the result, and its start offset to zero."
	if (isEditable(range.startContainer)
	&& range.startContainer.nodeType == $_.Node.TEXT_NODE
	&& range.startOffset != 0
	&& range.startOffset != getNodeLength(range.startContainer)) {
		// Account for browsers not following range mutation rules
		var newNode = range.startContainer.splitText(range.startOffset);
		var newActiveRange = Aloha.createRange();
		if (range.startContainer == range.endContainer) {
			var newEndOffset = range.endOffset - range.startOffset;
			newActiveRange.setEnd(newNode, newEndOffset);
			range.setEnd(newNode, newEndOffset);
		}
		newActiveRange.setStart(newNode, 0);
		Aloha.getSelection().removeAllRanges();
		Aloha.getSelection().addRange(newActiveRange);

		range.setStart(newNode, 0);
	}

	// "If the active range's end node is an editable Text node, and its end
	// offset is neither zero nor its end node's length, call splitText() on
	// the active range's end node, with argument equal to the active range's
	// end offset."
	if (isEditable(range.endContainer)
	&& range.endContainer.nodeType == $_.Node.TEXT_NODE
	&& range.endOffset != 0
	&& range.endOffset != getNodeLength(range.endContainer)) {
		// IE seems to mutate the range incorrectly here, so we need correction
		// here as well.  The active range will be temporarily in orphaned
		// nodes, so calling getActiveRange() after splitText() but before
		// fixing the range will throw an exception.
		// TODO: check if this is still neccessary 
		var activeRange = range;
		var newStart = [activeRange.startContainer, activeRange.startOffset];
		var newEnd = [activeRange.endContainer, activeRange.endOffset];
		activeRange.endContainer.splitText(activeRange.endOffset);
		activeRange.setStart(newStart[0], newStart[1]);
		activeRange.setEnd(newEnd[0], newEnd[1]);

		Aloha.getSelection().removeAllRanges();
		Aloha.getSelection().addRange(activeRange);
	}

	// "Let element list be all editable Elements effectively contained in the
	// active range.
	//
	// "For each element in element list, clear the value of element."
	$_( getAllEffectivelyContainedNodes(getActiveRange(), function(node) {
		return isEditable(node) && node.nodeType == $_.Node.ELEMENT_NODE;
	}) ).forEach(function(element) {
		clearValue(element, command, range);
	});

	// "Let node list be all editable nodes effectively contained in the active
	// range.
	//
	// "For each node in node list:"
	$_( getAllEffectivelyContainedNodes(range, isEditable) ).forEach(function(node) {
		// "Push down values on node."
		pushDownValues(node, command, newValue, range);

		// "Force the value of node."
		forceValue(node, command, newValue, range);
	});
}