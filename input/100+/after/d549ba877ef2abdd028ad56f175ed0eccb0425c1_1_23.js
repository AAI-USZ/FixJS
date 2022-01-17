function(triple) {
		var node = triple[0];
		var command = triple[1];
		var value = triple[2];

		// "Let ancestor equal node."
		var ancestor = node;

		// "If ancestor is not an Element, set it to its parent."
		if (!ancestor || ancestor.nodeType != $_.Node.ELEMENT_NODE) {
			ancestor = ancestor.parentNode;
		}

		// "While ancestor is an Element and its specified command value for
		// command is null, set it to its parent."
		while (ancestor
		&& ancestor.nodeType == $_.Node.ELEMENT_NODE
		&& getSpecifiedCommandValue(ancestor, command) === null) {
			ancestor = ancestor.parentNode;
		}

		// "If value is null and ancestor is an Element, push down values on
		// node for command, with new value null."
		if (value === null
		&& ancestor
		&& ancestor.nodeType == $_.Node.ELEMENT_NODE) {
			pushDownValues(node, command, null, range);

		// "Otherwise, if ancestor is an Element and its specified command
		// value for command is not equivalent to value, or if ancestor is not
		// an Element and value is not null, force the value of command to
		// value on node."
		} else if ((ancestor
		&& ancestor.nodeType == $_.Node.ELEMENT_NODE
		&& !areEquivalentValues(command, getSpecifiedCommandValue(ancestor, command), value))
		|| ((!ancestor || ancestor.nodeType != $_.Node.ELEMENT_NODE)
		&& value !== null)) {
			forceValue(node, command, value, range);
		}
	}