function isIndentationElement(node) {
	if (!isHtmlElement(node)) {
		return false;
	}

	if (node.tagName == "BLOCKQUOTE") {
		return true;
	}

	if (node.tagName != "DIV") {
		return false;
	}

	if (typeof node.style.length !== 'undefined') {
		for (var i = 0; i < node.style.length; i++) {
			// Approximate check
			if (/^(-[a-z]+-)?margin/.test(node.style[i])) {
				return true;
			}
		}
	} else {
		for (var s in node.style) {
			if (/^(-[a-z]+-)?margin/.test(s) && node.style[s] && node.style[s] !== 0) {
				return true;
			}
		}
	}

	return false;
}