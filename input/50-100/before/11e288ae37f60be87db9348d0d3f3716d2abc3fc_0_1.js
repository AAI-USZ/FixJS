function(id, offset, span, color) {
	if (id === '<definitions>') {
	    this.defn.highlight(id, offset, span, color);
	} else if (this.interactions.previousInteractionsTextContainers[id]) {
	    this.interactions.previousInteractionsTextContainers[id].highlight(id, offset, span, color);
	}
    }