function(id, offset, line, column, span, color) {
	if (id === '<definitions>') {
	    this.defn.highlight(id, offset, line, column, span, color);
	} else if (this.interactions.previousInteractionsTextContainers[id]) {
	    this.interactions.previousInteractionsTextContainers[id].highlight(id, offset, line, column, span, color);
	}
    }