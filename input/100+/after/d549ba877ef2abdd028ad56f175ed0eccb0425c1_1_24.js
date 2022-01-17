function pushDownValues(node, command, newValue, range) {
	// "If node's parent is not an Element, abort this algorithm."
	if (!node.parentNode
	|| node.parentNode.nodeType != $_.Node.ELEMENT_NODE) {
		return;
	}

	// "If the effective command value of command is loosely equivalent to new
	// value on node, abort this algorithm."
	if (areLooselyEquivalentValues(command, getEffectiveCommandValue(node, command), newValue)) {
		return;
	}

	// "Let current ancestor be node's parent."
	var currentAncestor = node.parentNode;

	// "Let ancestor list be a list of Nodes, initially empty."
	var ancestorList = [];

	// "While current ancestor is an editable Element and the effective command
	// value of command is not loosely equivalent to new value on it, append
	// current ancestor to ancestor list, then set current ancestor to its
	// parent."
	while (isEditable(currentAncestor)
	&& currentAncestor.nodeType == $_.Node.ELEMENT_NODE
	&& !areLooselyEquivalentValues(command, getEffectiveCommandValue(currentAncestor, command), newValue)) {
		ancestorList.push(currentAncestor);
		currentAncestor = currentAncestor.parentNode;
	}

	// "If ancestor list is empty, abort this algorithm."
	if (!ancestorList.length) {
		return;
	}

	// "Let propagated value be the specified command value of command on the
	// last member of ancestor list."
	var propagatedValue = getSpecifiedCommandValue(ancestorList[ancestorList.length - 1], command);

	// "If propagated value is null and is not equal to new value, abort this
	// algorithm."
	if (propagatedValue === null && propagatedValue != newValue) {
		return;
	}

	// "If the effective command value for the parent of the last member of
	// ancestor list is not loosely equivalent to new value, and new value is
	// not null, abort this algorithm."
	if (newValue !== null
	&& !areLooselyEquivalentValues(command, getEffectiveCommandValue(ancestorList[ancestorList.length - 1].parentNode, command), newValue)) {
		return;
	}

	// "While ancestor list is not empty:"
	while (ancestorList.length) {
		// "Let current ancestor be the last member of ancestor list."
		// "Remove the last member from ancestor list."
		var currentAncestor = ancestorList.pop();

		// "If the specified command value of current ancestor for command is
		// not null, set propagated value to that value."
		if (getSpecifiedCommandValue(currentAncestor, command) !== null) {
			propagatedValue = getSpecifiedCommandValue(currentAncestor, command);
		}

		// "Let children be the children of current ancestor."
		var children = Array.prototype.slice.call(toArray(currentAncestor.childNodes));

		// "If the specified command value of current ancestor for command is
		// not null, clear the value of current ancestor."
		if (getSpecifiedCommandValue(currentAncestor, command) !== null) {
			clearValue(currentAncestor, command, range);
		}

		// "For every child in children:"
		for (var i = 0; i < children.length; i++) {
			var child = children[i];

			// "If child is node, continue with the next child."
			if (child == node) {
				continue;
			}

			// "If child is an Element whose specified command value for
			// command is neither null nor equivalent to propagated value,
			// continue with the next child."
			if (child.nodeType == $_.Node.ELEMENT_NODE
			&& getSpecifiedCommandValue(child, command) !== null
			&& !areEquivalentValues(command, propagatedValue, getSpecifiedCommandValue(child, command))) {
				continue;
			}

			// "If child is the last member of ancestor list, continue with the
			// next child."
			if (child == ancestorList[ancestorList.length - 1]) {
				continue;
			}

			// "Force the value of child, with command as in this algorithm
			// and new value equal to propagated value."
			forceValue(child, command, propagatedValue, range);
		}
	}
}