function isHtmlElement(node, tags) {
	if (typeof tags == "string") {
		tags = [tags];
	}
	if (typeof tags == "object") {
		tags = tags.map(function(tag) { return tag.toUpperCase() });
	}
	return node
		&& node.nodeType == Node.ELEMENT_NODE
		&& isHtmlNamespace(node.namespaceURI)
		&& (typeof tags == "undefined" || tags.indexOf(node.tagName) != -1);
}