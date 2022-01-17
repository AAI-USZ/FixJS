function(value, range) {
		// "If value begins with a "<" character and ends with a ">" character,
		// remove the first and last characters from it."
		if (/^<.*>$/.test(value)) {
			value = value.slice(1, -1);
		}

		// "Let value be converted to ASCII lowercase."
		value = value.toLowerCase();

		// "If value is not a formattable block name, abort these steps and do
		// nothing."
		if ($_(formattableBlockNames).indexOf(value) == -1) {
			return;
		}

		// "Block-extend the active range, and let new range be the result."
		var newRange = blockExtend(range);

		// "Let node list be an empty list of nodes."
		//
		// "For each node node contained in new range, append node to node list
		// if it is editable, the last member of original node list (if any) is
		// not an ancestor of node, node is either a non-list single-line
		// container or an allowed child of "p" or a dd or dt, and node is not
		// the ancestor of a prohibited paragraph child."
		var nodeList = getContainedNodes(newRange, function(node) {
			return isEditable(node)
				&& (isNonListSingleLineContainer(node)
				|| isAllowedChild(node, "p")
				|| isHtmlElement(node, ["dd", "dt"]))
				&& !$_( getDescendants(node) ).some(isProhibitedParagraphChild);
		});

		// "Record the values of node list, and let values be the result."
		var values = recordValues(nodeList);

		// "For each node in node list, while node is the descendant of an
		// editable HTML element in the same editing host, whose local name is
		// a formattable block name, and which is not the ancestor of a
		// prohibited paragraph child, split the parent of the one-node list
		// consisting of node."
		for (var i = 0; i < nodeList.length; i++) {
			var node = nodeList[i];
			while ($_( getAncestors(node) ).some(function(ancestor) {
				return isEditable(ancestor)
					&& inSameEditingHost(ancestor, node)
					&& isHtmlElement(ancestor, formattableBlockNames)
					&& !$_( getDescendants(ancestor) ).some(isProhibitedParagraphChild);
			})) {
				splitParent([node], range);
			}
		}

		// "Restore the values from values."
		restoreValues(values, range);

		// "While node list is not empty:"
		while (nodeList.length) {
			var sublist;

			// "If the first member of node list is a single-line
			// container:"
			if (isSingleLineContainer(nodeList[0])) {
				// "Let sublist be the children of the first member of node
				// list."
				sublist = [].slice.call(toArray(nodeList[0].childNodes));

				// "Record the values of sublist, and let values be the
				// result."
				var values = recordValues(sublist);

				// "Remove the first member of node list from its parent,
				// preserving its descendants."
				removePreservingDescendants(nodeList[0], range);

				// "Restore the values from values."
				restoreValues(values, range);

				// "Remove the first member from node list."
				nodeList.shift();

			// "Otherwise:"
			} else {
				// "Let sublist be an empty list of nodes."
				sublist = [];

				// "Remove the first member of node list and append it to
				// sublist."
				sublist.push(nodeList.shift());

				// "While node list is not empty, and the first member of
				// node list is the nextSibling of the last member of
				// sublist, and the first member of node list is not a
				// single-line container, and the last member of sublist is
				// not a br, remove the first member of node list and
				// append it to sublist."
				while (nodeList.length
				&& nodeList[0] == sublist[sublist.length - 1].nextSibling
				&& !isSingleLineContainer(nodeList[0])
				&& !isHtmlElement(sublist[sublist.length - 1], "BR")) {
					sublist.push(nodeList.shift());
				}
			}

			// "Wrap sublist. If value is "div" or "p", sibling criteria
			// returns false; otherwise it returns true for an HTML element
			// with local name value and no attributes, and false otherwise.
			// New parent instructions return the result of running
			// createElement(value) on the context object. Then fix disallowed
			// ancestors of the result."
			fixDisallowedAncestors(
				wrap(sublist,
					$_(["div", "p"]).indexOf(value) == - 1
						? function(node) { return isHtmlElement(node, value) && !node.attributes.length }
						: function() { return false },
					function() { return document.createElement(value) },
					range
				),
				range
			);
		}
	}