function() {
		// "Let hyperlinks be a list of every a element that has an href
		// attribute and is contained in the active range or is an ancestor of
		// one of its boundary points."
		//
		// As usual, take care to ensure it's tree order.  The correctness of
		// the following is left as an exercise for the reader.
		var range = getActiveRange();
		var hyperlinks = [];
		for (
			var node = range.startContainer;
			node;
			node = node.parentNode
		) {
			if (isHtmlElement(node, "A")
			&& $_( node ).hasAttribute("href")) {
				hyperlinks.unshift(node);
			}
		}
		for (
			var node = range.startContainer;
			node != nextNodeDescendants(range.endContainer);
			node = nextNode(node)
		) {
			if (isHtmlElement(node, "A")
			&& $_( node ).hasAttribute("href")
			&& (isContained(node, range)
			|| isAncestor(node, range.endContainer)
			|| node == range.endContainer)) {
				hyperlinks.push(node);
			}
		}

		// "Clear the value of each member of hyperlinks."
		for (var i = 0; i < hyperlinks.length; i++) {
			clearValue(hyperlinks[i], "unlink", range);
		}
	}