function isSimpleIndentationElement(node) {
	if (!isIndentationElement(node)) {
		return false;
	}

	if (node.tagName != "BLOCKQUOTE" && node.tagName != "DIV") {
		return false;
	}

	for (var i = 0; i < node.attributes.length; i++) {
		if (!isHtmlNamespace(node.attributes[i].namespaceURI)
		|| $_(["style", "class", "dir"]).indexOf(node.attributes[i].name) == -1) {
			return false;
		}
	}

	if (typeof node.style.length !== 'undefined') {
		for (var i = 0; i < node.style.length; i++) {
			// This is approximate, but it works well enough for my purposes.
			if (!/^(-[a-z]+-)?(margin|border|padding)/.test(node.style[i])) {
				return false;
			}
		}
	} else {
		for (var s in node.style) {
			// This is approximate, but it works well enough for my purposes.
			if (!/^(-[a-z]+-)?(margin|border|padding)/.test(s) && node.style[s] && node.style[s] !== 0 && node.style[s] !== 'false') {
				return false;
			}
		}
	}

	return true;
}