function getEffectiveCommandValue(node, command) {
	// "If neither node nor its parent is an Element, return null."
	if (node.nodeType != Node.ELEMENT_NODE
	&& (!node.parentNode || node.parentNode.nodeType != Node.ELEMENT_NODE)) {
		return null;
	}

	// "If node is not an Element, return the effective command value of its
	// parent for command."
	if (node.nodeType != Node.ELEMENT_NODE) {
		return getEffectiveCommandValue(node.parentNode, command);
	}

	// "If command is "createLink" or "unlink":"
	if (command == "createlink" || command == "unlink") {
		// "While node is not null, and is not an a element that has an href
		// attribute, set node to its parent."
		while (node
		&& (!isHtmlElement(node)
		|| node.tagName != "A"
		|| !node.hasAttribute("href"))) {
			node = node.parentNode;
		}

		// "If node is null, return null."
		if (!node) {
			return null;
		}

		// "Return the value of node's href attribute."
		return node.getAttribute("href");
	}

	// "If command is "backColor" or "hiliteColor":"
	if (command == "backcolor"
	|| command == "hilitecolor") {
		// "While the resolved value of "background-color" on node is any
		// fully transparent value, and node's parent is an Element, set
		// node to its parent."
		//
		// Another lame hack to avoid flawed APIs.
		while ((getComputedStyle(node).backgroundColor == "rgba(0, 0, 0, 0)"
		|| getComputedStyle(node).backgroundColor === ""
		|| getComputedStyle(node).backgroundColor == "transparent")
		&& node.parentNode
		&& node.parentNode.nodeType == Node.ELEMENT_NODE) {
			node = node.parentNode;
		}

		// "If the resolved value of "background-color" on node is a fully
		// transparent value, return "rgb(255, 255, 255)"."
		if (getComputedStyle(node).backgroundColor == "rgba(0, 0, 0, 0)"
        || getComputedStyle(node).backgroundColor === ""
        || getComputedStyle(node).backgroundColor == "transparent") {
			return "rgb(255, 255, 255)";
		}

		// "Otherwise, return the resolved value of "background-color" for
		// node."
		return getComputedStyle(node).backgroundColor;
	}

	// "If command is "subscript" or "superscript":"
	if (command == "subscript" || command == "superscript") {
		// "Let affected by subscript and affected by superscript be two
		// boolean variables, both initially false."
		var affectedBySubscript = false;
		var affectedBySuperscript = false;

		// "While node is an inline node:"
		while (isInlineNode(node)) {
			var verticalAlign = getComputedStyle(node).verticalAlign;

			// "If node is a sub, set affected by subscript to true."
			if (isHtmlElement(node, "sub")) {
				affectedBySubscript = true;
			// "Otherwise, if node is a sup, set affected by superscript to
			// true."
			} else if (isHtmlElement(node, "sup")) {
				affectedBySuperscript = true;
			}

			// "Set node to its parent."
			node = node.parentNode;
		}

		// "If affected by subscript and affected by superscript are both true,
		// return the string "mixed"."
		if (affectedBySubscript && affectedBySuperscript) {
			return "mixed";
		}

		// "If affected by subscript is true, return "subscript"."
		if (affectedBySubscript) {
			return "subscript";
		}

		// "If affected by superscript is true, return "superscript"."
		if (affectedBySuperscript) {
			return "superscript";
		}

		// "Return null."
		return null;
	}

	// "If command is "strikethrough", and the "text-decoration" property of
	// node or any of its ancestors has resolved value containing
	// "line-through", return "line-through". Otherwise, return null."
	if (command == "strikethrough") {
		do {
			if (getComputedStyle(node).textDecoration.indexOf("line-through") != -1) {
				return "line-through";
			}
			node = node.parentNode;
		} while (node && node.nodeType == Node.ELEMENT_NODE);
		return null;
	}

	// "If command is "underline", and the "text-decoration" property of node
	// or any of its ancestors has resolved value containing "underline",
	// return "underline". Otherwise, return null."
	if (command == "underline") {
		do {
			if (getComputedStyle(node).textDecoration.indexOf("underline") != -1) {
				return "underline";
			}
			node = node.parentNode;
		} while (node && node.nodeType == Node.ELEMENT_NODE);
		return null;
	}

	if (!("relevantCssProperty" in commands[command])) {
		throw "Bug: no relevantCssProperty for " + command + " in getEffectiveCommandValue";
	}

	// "Return the resolved value for node of the relevant CSS property for
	// command."
	return getComputedStyle(node)[commands[command].relevantCssProperty].toString();
}