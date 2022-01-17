function getActiveRange() {
	var ret;
	if (globalRange) {
		ret = globalRange;
	} else if (Aloha.getSelection().rangeCount) {
		ret = Aloha.getSelection().getRangeAt(0);
	} else {
		return null;
	}
	if ([Node.TEXT_NODE, Node.ELEMENT_NODE].indexOf(ret.startContainer.nodeType) == -1
	|| [Node.TEXT_NODE, Node.ELEMENT_NODE].indexOf(ret.endContainer.nodeType) == -1
	|| !ret.startContainer.ownerDocument
	|| !ret.endContainer.ownerDocument
	|| !isDescendant(ret.startContainer, ret.startContainer.ownerDocument)
	|| !isDescendant(ret.endContainer, ret.endContainer.ownerDocument)) {
		throw "Invalid active range; test bug?";
	}
	return ret;
}