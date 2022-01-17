function restoreStatesAndValues(overrides, range) {
	// "Let node be the first editable Text node effectively contained in the
	// active range, or null if there is none."
	var node = $_( getAllEffectivelyContainedNodes(range) )
		.filter(function(node) { return isEditable(node) && node.nodeType == $_.Node.TEXT_NODE })[0];

	// "If node is not null, then for each (command, override) pair in
	// overrides, in order:"
	if (node) {
		for (var i = 0; i < overrides.length; i++) {
			var command = overrides[i][0];
			var override = overrides[i][1];

			// "If override is a boolean, and queryCommandState(command)
			// returns something different from override, call
			// execCommand(command)."
			if (typeof override == "boolean"
			&& myQueryCommandState(command) != override) {
				myExecCommand(command);

			// "Otherwise, if override is a string, and command is not
			// "fontSize", and queryCommandValue(command) returns something not
			// equivalent to override, call execCommand(command, false,
			// override)."
			} else if (typeof override == "string"
			&& command != "fontsize"
			&& !areEquivalentValues(command, myQueryCommandValue(command), override)) {
				myExecCommand(command, false, override);

			// "Otherwise, if override is a string; and command is "fontSize";
			// and either there is a value override for "fontSize" that is not
			// equal to override, or there is no value override for "fontSize"
			// and node's effective command value for "fontSize" is not loosely
			// equivalent to override: call execCommand("fontSize", false,
			// override)."
			} else if (typeof override == "string"
			&& command == "fontsize"
			&& (
				(
					getValueOverride("fontsize", range) !== undefined
					&& getValueOverride("fontsize", range) !== override
				) || (
					getValueOverride("fontsize", range) === undefined
					&& !areLooselyEquivalentValues(command, getEffectiveCommandValue(node, "fontsize"), override)
				)
			)) {
				myExecCommand("fontsize", false, override);

			// "Otherwise, continue this loop from the beginning."
			} else {
				continue;
			}

			// "Set node to the first editable Text node effectively contained
			// in the active range, if there is one."
			node = $_( getAllEffectivelyContainedNodes(range) )
				.filter(function(node) { return isEditable(node) && node.nodeType == $_.Node.TEXT_NODE })[0]
				|| node;
		}

	// "Otherwise, for each (command, override) pair in overrides, in order:"
	} else {
		for (var i = 0; i < overrides.length; i++) {
			var command = overrides[i][0];
			var override = overrides[i][1];

			// "If override is a boolean, set the state override for command to
			// override."
			if (typeof override == "boolean") {
				setStateOverride(command, override, range);
			}

			// "If override is a string, set the value override for command to
			// override."
			if (typeof override == "string") {
				setValueOverride(command, override, range);
			}
		}
	}
}