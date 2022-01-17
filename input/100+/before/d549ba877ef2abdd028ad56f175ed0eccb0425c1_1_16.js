function isModifiableElement(node) {
	if (!isHtmlElement(node)) {
		return false;
	}

	if (["B", "EM", "I", "S", "SPAN", "STRIKE", "STRONG", "SUB", "SUP", "U"].indexOf(node.tagName) != -1) {
		if (node.attributes.length == 0) {
			return true;
		}

		if (node.attributes.length == 1
		&& node.hasAttribute("style")) {
			return true;
		}
	}

	if (node.tagName == "FONT" || node.tagName == "A") {
		var numAttrs = node.attributes.length;

		if (node.hasAttribute("style")) {
			numAttrs--;
		}

		if (node.tagName == "FONT") {
			if (node.hasAttribute("color")) {
				numAttrs--;
			}

			if (node.hasAttribute("face")) {
				numAttrs--;
			}

			if (node.hasAttribute("size")) {
				numAttrs--;
			}
		}

		if (node.tagName == "A"
		&& node.hasAttribute("href")) {
			numAttrs--;
		}

		if (numAttrs == 0) {
			return true;
		}
	}

	return false;
}