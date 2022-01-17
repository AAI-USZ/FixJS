function(range) {
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
		}