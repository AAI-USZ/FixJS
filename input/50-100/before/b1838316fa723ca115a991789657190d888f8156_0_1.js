function() {
	"use strict";

	var prev;

	// Change cursor to previous sibling
	if (!this.cursor) {
		prev = this.root;
	} else if (this.cursor === this.root) {
		throw new Error ("Root node has no previous node");
	} else {
		prev = this.cursor;

		do {
			prev = prev.previousSibling;
			if (!prev) {
				prev = this.cursor.parentNode.lastChild;
			}
		} while (prev && prev.nodeType !== 1);
	}

	this.changeCursor (prev);
}