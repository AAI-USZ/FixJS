function() {
	var walker, node;

	// Change cursor to nodeious sibling
	if (!this.cursor) {
		node = this.root;
	} else if (this.cursor === this.root) {
		return;
	} else {
		walker = this.walker;
		walker.currentNode = this.cursor;
		node = walker.previousSibling ();
		if (!node) {
			walker.parentNode ();
			node = walker.lastChild ();
		}
	}

	this.changeCursor (node);
}