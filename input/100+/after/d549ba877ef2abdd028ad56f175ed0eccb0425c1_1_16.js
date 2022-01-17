function isModifiableElement(node) {
	if (!isHtmlElement(node)) {
		return false;
	}

	if ($_( ["B", "EM", "I", "S", "SPAN", "STRIKE", "STRONG", "SUB", "SUP", "U"] ).indexOf(node.tagName) != -1) {
		if (node.attributes.length == 0) {
			return true;
		}

		if (node.attributes.length == 1
		&& $_( node ).hasAttribute("style")) {
			return true;
		}
	}

	if (node.tagName == "FONT" || node.tagName == "A") {
		var numAttrs = node.attributes.length;

		if ($_( node ).hasAttribute("style")) {
			numAttrs--;
		}

		if (node.tagName == "FONT") {
			if ($_( node ).hasAttribute("color")) {
				numAttrs--;
			}

			if ($_( node ).hasAttribute("face")) {
				numAttrs--;
			}

			if ($_( node ).hasAttribute("size")) {
				numAttrs--;
			}
		}

		if (node.tagName == "A"
		&& $_( node ).hasAttribute("href")) {
			numAttrs--;
		}

		if (numAttrs == 0) {
			return true;
		}
	}

	return false;
}