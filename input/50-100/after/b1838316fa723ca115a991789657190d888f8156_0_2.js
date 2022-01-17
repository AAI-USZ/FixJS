function() {
	var walker, node;

	if (!this.cursor) {
		node = this.root;
	} else if (this.cursor === this.root) {
		return;
	} else {
		walker = this.walker;
		walker.currentNode = this.cursor;
		while (walker.previousSibling ());
		node = walker.currentNode;
	}
	this.changeCursor (node);
}