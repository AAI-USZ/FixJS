function() {
		// "True if among editable Text nodes that are effectively contained in
		// the active range, there are two that have distinct effective command
		// values.  Otherwise false."
		return $_( getAllEffectivelyContainedNodes(getActiveRange(), function(node) {
			return isEditable(node) && node.nodeType == $_.Node.TEXT_NODE;
		}) ).map(function(node) {
			return getEffectiveCommandValue(node, "fontsize");
		}, true).filter(function(value, i, arr) {
			return $_(arr.slice(0, i)).indexOf(value) == -1;
		}).length >= 2;
	}