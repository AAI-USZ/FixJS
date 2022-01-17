function(range) {
		// "Let pixel size be the effective command value of the first editable
		// Text node that is effectively contained in the active range, or if
		// there is no such node, the effective command value of the active
		// range's start node, in either case interpreted as a number of
		// pixels."
		var node = getAllEffectivelyContainedNodes(range, function(node) {
			return isEditable(node) && node.nodeType == $_.Node.TEXT_NODE;
		})[0];
		if (node === undefined) {
			node = range.startContainer;
		}
		var pixelSize = getEffectiveCommandValue(node, "fontsize");

		// "Return the legacy font size for pixel size."
		return getLegacyFontSize(pixelSize);
	}