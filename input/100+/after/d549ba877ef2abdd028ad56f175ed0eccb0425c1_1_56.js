function(command) {
	// "If a command does not have a relevant CSS property specified, it
	// defaults to null."
	if (!("relevantCssProperty" in commands[command])) {
		commands[command].relevantCssProperty = null;
	}

	// "If a command has inline command activated values defined but
	// nothing else defines when it is indeterminate, it is indeterminate
	// if among editable Text nodes effectively contained in the active
	// range, there is at least one whose effective command value is one of
	// the given values and at least one whose effective command value is
	// not one of the given values."
	if ("inlineCommandActivatedValues" in commands[command]
	&& !("indeterm" in commands[command])) {
		commands[command].indeterm = function( range ) {
			var values = $_( getAllEffectivelyContainedNodes(range, function(node) {
				return isEditable(node)
					&& node.nodeType == $_.Node.TEXT_NODE;
			}) ).map(function(node) { return getEffectiveCommandValue(node, command) });

			var matchingValues = $_( values ).filter(function(value) {
				return $_( commands[command].inlineCommandActivatedValues ).indexOf(value) != -1;
			});

			return matchingValues.length >= 1
				&& values.length - matchingValues.length >= 1;
		};
	}

	// "If a command has inline command activated values defined, its state
	// is true if either no editable Text node is effectively contained in
	// the active range, and the active range's start node's effective
	// command value is one of the given values; or if there is at least
	// one editable Text node effectively contained in the active range,
	// and all of them have an effective command value equal to one of the
	// given values."
	if ("inlineCommandActivatedValues" in commands[command]) {
		commands[command].state = function(range) {
			var nodes = getAllEffectivelyContainedNodes(range, function(node) {
				return isEditable(node)
					&& node.nodeType == $_.Node.TEXT_NODE;
			});

			if (nodes.length == 0) {
				return $_( commands[command].inlineCommandActivatedValues )
					.indexOf(getEffectiveCommandValue(range.startContainer, command)) != -1;
				return ret;
			} else {
				return $_( nodes ).every(function(node) {
					return $_( commands[command].inlineCommandActivatedValues )
						.indexOf(getEffectiveCommandValue(node, command)) != -1;
				});
			}
		};
	}

	// "If a command is a standard inline value command, it is
	// indeterminate if among editable Text nodes that are effectively
	// contained in the active range, there are two that have distinct
	// effective command values. Its value is the effective command value
	// of the first editable Text node that is effectively contained in the
	// active range, or if there is no such node, the effective command
	// value of the active range's start node."
	if ("standardInlineValueCommand" in commands[command]) {
		commands[command].indeterm = function() {
			var values = $_(getAllEffectivelyContainedNodes(getActiveRange()))
				.filter(function(node) { return isEditable(node) && node.nodeType == $_.Node.TEXT_NODE }, true)
				.map(function(node) { return getEffectiveCommandValue(node, command) });
			for (var i = 1; i < values.length; i++) {
				if (values[i] != values[i - 1]) {
					return true;
				}
			}
			return false;
		};

		commands[command].value = function(range) {
			var refNode = getAllEffectivelyContainedNodes(range, function(node) {
				return isEditable(node)
					&& node.nodeType == $_.Node.TEXT_NODE;
			})[0];

			if (typeof refNode == "undefined") {
				refNode = range.startContainer;
			}

			return getEffectiveCommandValue(refNode, command);
		};
	}
}