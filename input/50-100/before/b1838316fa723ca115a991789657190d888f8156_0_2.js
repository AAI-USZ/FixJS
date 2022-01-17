function() {
	"use strict";

	var up;

	// Change cursor to parent node
	if (!this.cursor) {
		up = this.root;
	} else if (this.cursor === this.root) {
		throw new Error ("Root node has no parent node");
	} else {
		up = this.cursor.parentNode;
	}

	this.changeCursor (up);
}