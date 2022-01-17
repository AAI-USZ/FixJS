function() {
			var values = $_(getAllEffectivelyContainedNodes(getActiveRange()))
				.filter(function(node) { return isEditable(node) && node.nodeType == $_.Node.TEXT_NODE }, true)
				.map(function(node) { return getEffectiveCommandValue(node, command) });
			for (var i = 1; i < values.length; i++) {
				if (values[i] != values[i - 1]) {
					return true;
				}
			}
			return false;
		}