function() {
	"use strict";

	var parent, node;

	if (!this.cursor) {
		throw new Error ("No node selected");
	} else if (this.cursor === this.root) {
		throw new Error ("Cannot create node before root node");
	}

	parent = this.cursor.parentNode;
	node = this.generateNode (null, true);

	parent.insertBefore (node, this.cursor);
}