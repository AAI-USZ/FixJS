function forceValue(node, command, newValue, range) {
	// "If node's parent is null, abort this algorithm."
	if (!node.parentNode) {
		return;
	}

	// "If new value is null, abort this algorithm."
	if (newValue === null) {
		return;
	}

	// "If node is an allowed child of "span":"
	if (isAllowedChild(node, "span")) {
		// "Reorder modifiable descendants of node's previousSibling."
		reorderModifiableDescendants(node.previousSibling, command, newValue, range);

		// "Reorder modifiable descendants of node's nextSibling."
		reorderModifiableDescendants(node.nextSibling, command, newValue, range);

		// "Wrap the one-node list consisting of node, with sibling criteria
		// returning true for a simple modifiable element whose specified
		// command value is equivalent to new value and whose effective command
		// value is loosely equivalent to new value and false otherwise, and
		// with new parent instructions returning null."
		wrap([node],
			function(node) {
				return isSimpleModifiableElement(node)
					&& areEquivalentValues(command, getSpecifiedCommandValue(node, command), newValue)
					&& areLooselyEquivalentValues(command, getEffectiveCommandValue(node, command), newValue);
			},
			function() { return null },
			range
		);
	}

	// "If the effective command value of command is loosely equivalent to new
	// value on node, abort this algorithm."
	if (areLooselyEquivalentValues(command, getEffectiveCommandValue(node, command), newValue)) {
		return;
	}

	// "If node is not an allowed child of "span":"
	if (!isAllowedChild(node, "span")) {
		// "Let children be all children of node, omitting any that are
		// Elements whose specified command value for command is neither null
		// nor equivalent to new value."
		var children = [];
		for (var i = 0; i < node.childNodes.length; i++) {
			if (node.childNodes[i].nodeType == Node.ELEMENT_NODE) {
				var specifiedValue = getSpecifiedCommandValue(node.childNodes[i], command);

				if (specifiedValue !== null
				&& !areEquivalentValues(command, newValue, specifiedValue)) {
					continue;
				}
			}
			children.push(node.childNodes[i]);
		}

		// "Force the value of each Node in children, with command and new
		// value as in this invocation of the algorithm."
		for (var i = 0; i < children.length; i++) {
			forceValue(children[i], command, newValue, range);
		}

		// "Abort this algorithm."
		return;
	}

	// "If the effective command value of command is loosely equivalent to new
	// value on node, abort this algorithm."
	if (areLooselyEquivalentValues(command, getEffectiveCommandValue(node, command), newValue)) {
		return;
	}

	// "Let new parent be null."
	var newParent = null;

	// "If the CSS styling flag is false:"
	if (!cssStylingFlag) {
		// "If command is "bold" and new value is "bold", let new parent be the
		// result of calling createElement("b") on the ownerDocument of node."
		if (command == "bold" && (newValue == "bold" || newValue == "700")) {
			newParent = node.ownerDocument.createElement("b");
		}

		// "If command is "italic" and new value is "italic", let new parent be
		// the result of calling createElement("i") on the ownerDocument of
		// node."
		if (command == "italic" && newValue == "italic") {
			newParent = node.ownerDocument.createElement("i");
		}

		// "If command is "strikethrough" and new value is "line-through", let
		// new parent be the result of calling createElement("s") on the
		// ownerDocument of node."
		if (command == "strikethrough" && newValue == "line-through") {
			newParent = node.ownerDocument.createElement("s");
		}

		// "If command is "underline" and new value is "underline", let new
		// parent be the result of calling createElement("u") on the
		// ownerDocument of node."
		if (command == "underline" && newValue == "underline") {
			newParent = node.ownerDocument.createElement("u");
		}

		// "If command is "foreColor", and new value is fully opaque with red,
		// green, and blue components in the range 0 to 255:"
		if (command == "forecolor" && parseSimpleColor(newValue)) {
			// "Let new parent be the result of calling createElement("span")
			// on the ownerDocument of node."
			// NOTE: modified this process to create span elements with style attributes
			// instead of oldschool font tags with color attributes
			newParent = node.ownerDocument.createElement("span");

			// "If new value is an extended color keyword, set the color
			// attribute of new parent to new value."
			//
			// "Otherwise, set the color attribute of new parent to the result
			// of applying the rules for serializing simple color values to new
			// value (interpreted as a simple color)."
			jQuery(newParent).css('color', parseSimpleColor(newValue));
		}

		// "If command is "fontName", let new parent be the result of calling
		// createElement("font") on the ownerDocument of node, then set the
		// face attribute of new parent to new value."
		if (command == "fontname") {
			newParent = node.ownerDocument.createElement("font");
			newParent.face = newValue;
		}
	}

	// "If command is "createLink" or "unlink":"
	if (command == "createlink" || command == "unlink") {
		// "Let new parent be the result of calling createElement("a") on the
		// ownerDocument of node."
		newParent = node.ownerDocument.createElement("a");

		// "Set the href attribute of new parent to new value."
		newParent.setAttribute("href", newValue);

		// "Let ancestor be node's parent."
		var ancestor = node.parentNode;

		// "While ancestor is not null:"
		while (ancestor) {
			// "If ancestor is an a, set the tag name of ancestor to "span",
			// and let ancestor be the result."
			if (isHtmlElement(ancestor, "A")) {
				ancestor = setTagName(ancestor, "span", range);
			}

			// "Set ancestor to its parent."
			ancestor = ancestor.parentNode;
		}
	}

	// "If command is "fontSize"; and new value is one of "xx-small", "small",
	// "medium", "large", "x-large", "xx-large", or "xxx-large"; and either the
	// CSS styling flag is false, or new value is "xxx-large": let new parent
	// be the result of calling createElement("font") on the ownerDocument of
	// node, then set the size attribute of new parent to the number from the
	// following table based on new value: [table omitted]"
	if (command == "fontsize"
	&& ["xx-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large"].indexOf(newValue) != -1
	&& (!cssStylingFlag || newValue == "xxx-large")) {
		newParent = node.ownerDocument.createElement("font");
		newParent.size = cssSizeToLegacy(newValue);
	}

	// "If command is "subscript" or "superscript" and new value is
	// "subscript", let new parent be the result of calling
	// createElement("sub") on the ownerDocument of node."
	if ((command == "subscript" || command == "superscript")
	&& newValue == "subscript") {
		newParent = node.ownerDocument.createElement("sub");
	}

	// "If command is "subscript" or "superscript" and new value is
	// "superscript", let new parent be the result of calling
	// createElement("sup") on the ownerDocument of node."
	if ((command == "subscript" || command == "superscript")
	&& newValue == "superscript") {
		newParent = node.ownerDocument.createElement("sup");
	}

	// "If new parent is null, let new parent be the result of calling
	// createElement("span") on the ownerDocument of node."
	if (!newParent) {
		newParent = node.ownerDocument.createElement("span");
	}

	// "Insert new parent in node's parent before node."
	node.parentNode.insertBefore(newParent, node);

	// "If the effective command value of command for new parent is not loosely
	// equivalent to new value, and the relevant CSS property for command is
	// not null, set that CSS property of new parent to new value (if the new
	// value would be valid)."
	var property = commands[command].relevantCssProperty;
	if (property !== null
	&& !areLooselyEquivalentValues(command, getEffectiveCommandValue(newParent, command), newValue)) {
		newParent.style[property] = newValue;
	}

	// "If command is "strikethrough", and new value is "line-through", and the
	// effective command value of "strikethrough" for new parent is not
	// "line-through", set the "text-decoration" property of new parent to
	// "line-through"."
	if (command == "strikethrough"
	&& newValue == "line-through"
	&& getEffectiveCommandValue(newParent, "strikethrough") != "line-through") {
		newParent.style.textDecoration = "line-through";
	}

	// "If command is "underline", and new value is "underline", and the
	// effective command value of "underline" for new parent is not
	// "underline", set the "text-decoration" property of new parent to
	// "underline"."
	if (command == "underline"
	&& newValue == "underline"
	&& getEffectiveCommandValue(newParent, "underline") != "underline") {
		newParent.style.textDecoration = "underline";
	}

	// "Append node to new parent as its last child, preserving ranges."
	movePreservingRanges(node, newParent, newParent.childNodes.length, range);

	// "If node is an Element and the effective command value of command for
	// node is not loosely equivalent to new value:"
	if (node.nodeType == Node.ELEMENT_NODE
	&& !areEquivalentValues(command, getEffectiveCommandValue(node, command), newValue)) {
		// "Insert node into the parent of new parent before new parent,
		// preserving ranges."
		movePreservingRanges(node, newParent.parentNode, getNodeIndex(newParent), range);

		// "Remove new parent from its parent."
		newParent.parentNode.removeChild(newParent);

		// "Let children be all children of node, omitting any that are
		// Elements whose specified command value for command is neither null
		// nor equivalent to new value."
		var children = [];
		for (var i = 0; i < node.childNodes.length; i++) {
			if (node.childNodes[i].nodeType == Node.ELEMENT_NODE) {
				var specifiedValue = getSpecifiedCommandValue(node.childNodes[i], command);

				if (specifiedValue !== null
				&& !areEquivalentValues(command, newValue, specifiedValue)) {
					continue;
				}
			}
			children.push(node.childNodes[i]);
		}

		// "Force the value of each Node in children, with command and new
		// value as in this invocation of the algorithm."
		for (var i = 0; i < children.length; i++) {
			forceValue(children[i], command, newValue, range);
		}
	}
}