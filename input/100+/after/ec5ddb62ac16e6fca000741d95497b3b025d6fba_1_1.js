function setTagName(element, newName, range) {
	// "If element is an HTML element with local name equal to new name, return
	// element."
	if (isHtmlElement(element, newName.toUpperCase())) {
		return element;
	}

	// "If element's parent is null, return element."
	if (!element.parentNode) {
		return element;
	}

	// "Let replacement element be the result of calling createElement(new
	// name) on the ownerDocument of element."
	var replacementElement = element.ownerDocument.createElement(newName);

	// "Insert replacement element into element's parent immediately before
	// element."
	element.parentNode.insertBefore(replacementElement, element);

	// "Copy all attributes of element to replacement element, in order."
	copyAttributes( element,  replacementElement );
	
	// "While element has children, append the first child of element as the
	// last child of replacement element, preserving ranges."
	while (element.childNodes.length) {
		movePreservingRanges(element.firstChild, replacementElement, replacementElement.childNodes.length, range);
	}

	// "Remove element from its parent."
	element.parentNode.removeChild(element);

	// if the range still uses the old element, we modify it to the new one
	if (range.startContainer === element) {
		range.startContainer = replacementElement;
	}
	if (range.endContainer === element) {
		range.endContainer = replacementElement;
	}

	// "Return replacement element."
	return replacementElement;
}