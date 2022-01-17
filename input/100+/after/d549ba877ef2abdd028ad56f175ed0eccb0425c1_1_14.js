function isAllowedChild(child, parent_) {
	// "If parent is "colgroup", "table", "tbody", "tfoot", "thead", "tr", or
	// an HTML element with local name equal to one of those, and child is a
	// Text node whose data does not consist solely of space characters, return
	// false."
	if (($_( ["colgroup", "table", "tbody", "tfoot", "thead", "tr"] ).indexOf(parent_) != -1
	|| isHtmlElement(parent_, ["colgroup", "table", "tbody", "tfoot", "thead", "tr"]))
	&& typeof child == "object"
	&& child.nodeType == $_.Node.TEXT_NODE
	&& !/^[ \t\n\f\r]*$/.test(child.data)) {
		return false;
	}

	// "If parent is "script", "style", "plaintext", or "xmp", or an HTML
	// element with local name equal to one of those, and child is not a Text
	// node, return false."
	if (($_( ["script", "style", "plaintext", "xmp"] ).indexOf(parent_) != -1
	|| isHtmlElement(parent_, ["script", "style", "plaintext", "xmp"]))
	&& (typeof child != "object" || child.nodeType != $_.Node.TEXT_NODE)) {
		return false;
	}

	// "If child is a Document, DocumentFragment, or DocumentType, return
	// false."
	if (typeof child == "object"
	&& (child.nodeType == $_.Node.DOCUMENT_NODE
	|| child.nodeType == $_.Node.DOCUMENT_FRAGMENT_NODE
	|| child.nodeType == $_.Node.DOCUMENT_TYPE_NODE)) {
		return false;
	}

	// "If child is an HTML element, set child to the local name of child."
	if (isHtmlElement(child)) {
		child = child.tagName.toLowerCase();
	}

	// "If child is not a string, return true."
	if (typeof child != "string") {
		return true;
	}

	// "If parent is an HTML element:"
	if (isHtmlElement(parent_)) {
		// "If child is "a", and parent or some ancestor of parent is an a,
		// return false."
		//
		// "If child is a prohibited paragraph child name and parent or some
		// ancestor of parent is an element with inline contents, return
		// false."
		//
		// "If child is "h1", "h2", "h3", "h4", "h5", or "h6", and parent or
		// some ancestor of parent is an HTML element with local name "h1",
		// "h2", "h3", "h4", "h5", or "h6", return false."
		var ancestor = parent_;
		while (ancestor) {
			if (child == "a" && isHtmlElement(ancestor, "a")) {
				return false;
			}
			if ($_( prohibitedParagraphChildNames ).indexOf(child) != -1
			&& isElementWithInlineContents(ancestor)) {
				return false;
			}
			if (/^h[1-6]$/.test(child)
			&& isHtmlElement(ancestor)
			&& /^H[1-6]$/.test(ancestor.tagName)) {
				return false;
			}
			ancestor = ancestor.parentNode;
		}

		// "Let parent be the local name of parent."
		parent_ = parent_.tagName.toLowerCase();
	}

	// "If parent is an Element or DocumentFragment, return true."
	if (typeof parent_ == "object"
	&& (parent_.nodeType == $_.Node.ELEMENT_NODE
	|| parent_.nodeType == $_.Node.DOCUMENT_FRAGMENT_NODE)) {
		return true;
	}

	// "If parent is not a string, return false."
	if (typeof parent_ != "string") {
		return false;
	}

	// "If parent is on the left-hand side of an entry on the following list,
	// then return true if child is listed on the right-hand side of that
	// entry, and false otherwise."
	switch (parent_) {
		case "colgroup":
			return child == "col";
		case "table":
			return $_( ["caption", "col", "colgroup", "tbody", "td", "tfoot", "th", "thead", "tr"] ).indexOf(child) != -1;
		case "tbody":
		case "thead":
		case "tfoot":
			return $_( ["td", "th", "tr"] ).indexOf(child) != -1;
		case "tr":
			return $_( ["td", "th"] ).indexOf(child) != -1;
		case "dl":
			return $_( ["dt", "dd"] ).indexOf(child) != -1;
		case "dir":
		case "ol":
		case "ul":
			return $_( ["dir", "li", "ol", "ul"] ).indexOf(child) != -1;
		case "hgroup":
			return /^h[1-6]$/.test(child);
	}

	// "If child is "body", "caption", "col", "colgroup", "frame", "frameset",
	// "head", "html", "tbody", "td", "tfoot", "th", "thead", or "tr", return
	// false."
	if ($_( ["body", "caption", "col", "colgroup", "frame", "frameset", "head",
	"html", "tbody", "td", "tfoot", "th", "thead", "tr"] ).indexOf(child) != -1) {
		return false;
	}

	// "If child is "dd" or "dt" and parent is not "dl", return false."
	if ($_( ["dd", "dt"] ).indexOf(child) != -1
	&& parent_ != "dl") {
		return false;
	}

	// "If child is "li" and parent is not "ol" or "ul", return false."
	if (child == "li"
	&& parent_ != "ol"
	&& parent_ != "ul") {
		return false;
	}

	// "If parent is on the left-hand side of an entry on the following list
	// and child is listed on the right-hand side of that entry, return false."
	var table = [
		[["a"], ["a"]],
		[["dd", "dt"], ["dd", "dt"]],
		[["h1", "h2", "h3", "h4", "h5", "h6"], ["h1", "h2", "h3", "h4", "h5", "h6"]],
		[["li"], ["li"]],
		[["nobr"], ["nobr"]],
		[namesOfElementsWithInlineContents, prohibitedParagraphChildNames],
		[["td", "th"], ["caption", "col", "colgroup", "tbody", "td", "tfoot", "th", "thead", "tr"]]
	];
	for (var i = 0; i < table.length; i++) {
		if ($_( table[i][0] ).indexOf(parent_) != -1
		&& $_( table[i][1] ).indexOf(child) != -1) {
			return false;
		}
	}

	// "Return true."
	return true;
}