function movePreservingRanges(node, newParent, newIndex, range) {
	// For convenience, I allow newIndex to be -1 to mean "insert at the end".
	if (newIndex == -1) {
		newIndex = newParent.childNodes.length;
	}

	// "When the user agent is to move a Node to a new location, preserving
	// ranges, it must remove the Node from its original parent (if any), then
	// insert it in the new location. In doing so, however, it must ignore the
	// regular range mutation rules, and instead follow these rules:"

	// "Let node be the moved Node, old parent and old index be the old parent
	// (which may be null) and index, and new parent and new index be the new
	// parent and index."
	var oldParent = node.parentNode;
	var oldIndex = getNodeIndex(node);

	// We only even attempt to preserve the global range object and the ranges
	// in the selection, not every range out there (the latter is probably
	// impossible).
	var ranges = [range];
	for (var i = 0; i < Aloha.getSelection().rangeCount; i++) {
		ranges.push(Aloha.getSelection().getRangeAt(i));
	}
	var boundaryPoints = [];
	$_( ranges ).forEach(function(range) {
		boundaryPoints.push([range.startContainer, range.startOffset]);
		boundaryPoints.push([range.endContainer, range.endOffset]);
	});

	$_( boundaryPoints ).forEach(function(boundaryPoint) {
		// "If a boundary point's node is the same as or a descendant of node,
		// leave it unchanged, so it moves to the new location."
		//
		// No modifications necessary.

		// "If a boundary point's node is new parent and its offset is greater
		// than new index, add one to its offset."
		if (boundaryPoint[0] == newParent
		&& boundaryPoint[1] > newIndex) {
			boundaryPoint[1]++;
		}

		// "If a boundary point's node is old parent and its offset is old index or
		// old index + 1, set its node to new parent and add new index − old index
		// to its offset."
		if (boundaryPoint[0] == oldParent
		&& (boundaryPoint[1] == oldIndex
		|| boundaryPoint[1] == oldIndex + 1)) {
			boundaryPoint[0] = newParent;
			boundaryPoint[1] += newIndex - oldIndex;
		}

		// "If a boundary point's node is old parent and its offset is greater than
		// old index + 1, subtract one from its offset."
		if (boundaryPoint[0] == oldParent
		&& boundaryPoint[1] > oldIndex + 1) {
			boundaryPoint[1]--;
		}
	});

	// Now actually move it and preserve the ranges.
	if (newParent.childNodes.length == newIndex) {
		newParent.appendChild(node);
	} else {
		newParent.insertBefore(node, newParent.childNodes[newIndex]);
	}

	// if we're off actual node boundaries this implies that the move was
	// part of a deletion process (backspace). If that's the case we 
	// attempt to fix this by restoring the range to the first index of
	// the node that has been moved
	if (boundaryPoints[0][1] > boundaryPoints[0][0].childNodes.length
	&& boundaryPoints[1][1] > boundaryPoints[1][0].childNodes.length) {
		range.setStart(node, 0);
		range.setEnd(node, 0);
	} else {
		range.setStart(boundaryPoints[0][0], boundaryPoints[0][1]);
		range.setEnd(boundaryPoints[1][0], boundaryPoints[1][1]);

		Aloha.getSelection().removeAllRanges();
		for (var i = 1; i < ranges.length; i++) {
			var newRange = Aloha.createRange();
			newRange.setStart(boundaryPoints[2*i][0], boundaryPoints[2*i][1]);
			newRange.setEnd(boundaryPoints[2*i + 1][0], boundaryPoints[2*i + 1][1]);
			Aloha.getSelection().addRange(newRange);
		}
		if (newRange) {
			range = newRange;
		}
	}
}