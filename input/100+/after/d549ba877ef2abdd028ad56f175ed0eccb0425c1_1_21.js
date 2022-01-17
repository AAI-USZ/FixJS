function(command) {
			// "Let ancestor equal node."
			var ancestor = node;

			// "If ancestor is not an Element, set it to its parent."
			if (ancestor.nodeType != $_.Node.ELEMENT_NODE) {
				ancestor = ancestor.parentNode;
			}

			// "While ancestor is an Element and its specified command value
			// for command is null, set it to its parent."
			while (ancestor
			&& ancestor.nodeType == $_.Node.ELEMENT_NODE
			&& getSpecifiedCommandValue(ancestor, command) === null) {
				ancestor = ancestor.parentNode;
			}

			// "If ancestor is an Element, add (node, command, ancestor's
			// specified command value for command) to values. Otherwise add
			// (node, command, null) to values."
			if (ancestor && ancestor.nodeType == $_.Node.ELEMENT_NODE) {
				values.push([node, command, getSpecifiedCommandValue(ancestor, command)]);
			} else {
				values.push([node, command, null]);
			}
		}