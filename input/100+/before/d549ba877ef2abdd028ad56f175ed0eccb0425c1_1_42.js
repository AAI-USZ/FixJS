function outdentNode(node, range) {
	// "If node is not editable, abort these steps."
	if (!isEditable(node)) {
		return;
	}

	// "If node is a simple indentation element, remove node, preserving its
	// descendants.  Then abort these steps."
	if (isSimpleIndentationElement(node)) {
		removePreservingDescendants(node, range);
		return;
	}

	// "If node is an indentation element:"
	if (isIndentationElement(node)) {
		// "Unset the class and dir attributes of node, if any."
		node.removeAttribute("class");
		node.removeAttribute("dir");

		// "Unset the margin, padding, and border CSS properties of node."
		node.style.margin = "";
		node.style.padding = "";
		node.style.border = "";
		if (node.getAttribute("style") == "") {
			node.removeAttribute("style");
		}

		// "Set the tag name of node to "div"."
		setTagName(node, "div", range);

		// "Abort these steps."
		return;
	}

	// "Let current ancestor be node's parent."
	var currentAncestor = node.parentNode;

	// "Let ancestor list be a list of nodes, initially empty."
	var ancestorList = [];

	// "While current ancestor is an editable Element that is neither a simple
	// indentation element nor an ol nor a ul, append current ancestor to
	// ancestor list and then set current ancestor to its parent."
	while (isEditable(currentAncestor)
	&& currentAncestor.nodeType == Node.ELEMENT_NODE
	&& !isSimpleIndentationElement(currentAncestor)
	&& !isHtmlElement(currentAncestor, ["ol", "ul"])) {
		ancestorList.push(currentAncestor);
		currentAncestor = currentAncestor.parentNode;
	}

	// "If current ancestor is not an editable simple indentation element:"
	if (!isEditable(currentAncestor)
	|| !isSimpleIndentationElement(currentAncestor)) {
		// "Let current ancestor be node's parent."
		currentAncestor = node.parentNode;

		// "Let ancestor list be the empty list."
		ancestorList = [];

		// "While current ancestor is an editable Element that is neither an
		// indentation element nor an ol nor a ul, append current ancestor to
		// ancestor list and then set current ancestor to its parent."
		while (isEditable(currentAncestor)
		&& currentAncestor.nodeType == Node.ELEMENT_NODE
		&& !isIndentationElement(currentAncestor)
		&& !isHtmlElement(currentAncestor, ["ol", "ul"])) {
			ancestorList.push(currentAncestor);
			currentAncestor = currentAncestor.parentNode;
		}
	}

	// "If node is an ol or ul and current ancestor is not an editable
	// indentation element:"
	if (isHtmlElement(node, ["OL", "UL"])
	&& (!isEditable(currentAncestor)
	|| !isIndentationElement(currentAncestor))) {
		// "Unset the reversed, start, and type attributes of node, if any are
		// set."
		node.removeAttribute("reversed");
		node.removeAttribute("start");
		node.removeAttribute("type");

		// "Let children be the children of node."
		var children = [].slice.call(toArray(node.childNodes));

		// "If node has attributes, and its parent is not an ol or ul, set the
		// tag name of node to "div"."
		if (node.attributes.length
		&& !isHtmlElement(node.parentNode, ["OL", "UL"])) {
			setTagName(node, "div", range);

		// "Otherwise:"
		} else {
			// "Record the values of node's children, and let values be the
			// result."
			var values = recordValues([].slice.call(toArray(node.childNodes)));

			// "Remove node, preserving its descendants."
			removePreservingDescendants(node, range);

			// "Restore the values from values."
			restoreValues(values, range);
		}

		// "Fix disallowed ancestors of each member of children."
		for (var i = 0; i < children.length; i++) {
			fixDisallowedAncestors(children[i], range);
		}

		// "Abort these steps."
		return;
	}

	// "If current ancestor is not an editable indentation element, abort these
	// steps."
	if (!isEditable(currentAncestor)
	|| !isIndentationElement(currentAncestor)) {
		return;
	}

	// "Append current ancestor to ancestor list."
	ancestorList.push(currentAncestor);

	// "Let original ancestor be current ancestor."
	var originalAncestor = currentAncestor;

	// "While ancestor list is not empty:"
	while (ancestorList.length) {
		// "Let current ancestor be the last member of ancestor list."
		//
		// "Remove the last member of ancestor list."
		currentAncestor = ancestorList.pop();

		// "Let target be the child of current ancestor that is equal to either
		// node or the last member of ancestor list."
		var target = node.parentNode == currentAncestor
			? node
			: ancestorList[ancestorList.length - 1];

		// "If target is an inline node that is not a br, and its nextSibling
		// is a br, remove target's nextSibling from its parent."
		if (isInlineNode(target)
		&& !isHtmlElement(target, "BR")
		&& isHtmlElement(target.nextSibling, "BR")) {
			target.parentNode.removeChild(target.nextSibling);
		}

		// "Let preceding siblings be the preceding siblings of target, and let
		// following siblings be the following siblings of target."
		var precedingSiblings = [].slice.call(toArray(currentAncestor.childNodes), 0, getNodeIndex(target));
		var followingSiblings = [].slice.call(toArray(currentAncestor.childNodes), 1 + getNodeIndex(target));

		// "Indent preceding siblings."
		indentNodes(precedingSiblings, range);

		// "Indent following siblings."
		indentNodes(followingSiblings, range);
	}

	// "Outdent original ancestor."
	outdentNode(originalAncestor, range);
}