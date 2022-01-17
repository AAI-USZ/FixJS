function getAlignmentValue(node) {
	// "While node is neither null nor an Element, or it is an Element but its
	// "display" property has resolved value "inline" or "none", set node to
	// its parent."
	while ((node && node.nodeType != $_.Node.ELEMENT_NODE)
	|| (node.nodeType == $_.Node.ELEMENT_NODE
	&& $_(["inline", "none"]).indexOf($_.getComputedStyle(node).display) != -1)) {
		node = node.parentNode;
	}

	// "If node is not an Element, return "left"."
	if (!node || node.nodeType != $_.Node.ELEMENT_NODE) {
		return "left";
	}

	var resolvedValue = $_.getComputedStyle(node).textAlign
		// Hack around browser non-standardness
		.replace(/^-(moz|webkit)-/, "")
		.replace(/^auto$/, "start");

	// "If node's "text-align" property has resolved value "start", return
	// "left" if the directionality of node is "ltr", "right" if it is "rtl"."
	if (resolvedValue == "start") {
		return getDirectionality(node) == "ltr" ? "left" : "right";
	}

	// "If node's "text-align" property has resolved value "end", return
	// "right" if the directionality of node is "ltr", "left" if it is "rtl"."
	if (resolvedValue == "end") {
		return getDirectionality(node) == "ltr" ? "right" : "left";
	}

	// "If node's "text-align" property has resolved value "center", "justify",
	// "left", or "right", return that value."
	if ($_(["center", "justify", "left", "right"]).indexOf(resolvedValue) != -1) {
		return resolvedValue;
	}

	// "Return "left"."
	return "left";
}