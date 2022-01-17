function() {
	var t,bounds;
	if(this.domNode) {
		if(this.domNode.nodeType === 3) { // Node.TEXT_NODE
			return this.domNode.parentNode.getBoundingClientRect();
		} else {
			return this.domNode.getBoundingClientRect();
		}
	} else {
		if(this.child) {
			return this.child.getNodeBounds();
		} else if(this.children) {
			for(t=0; t<this.children.length; t++) {
				bounds = this.children[t].getNodeBounds();
				if(bounds) {
					return bounds;
				}
			}
		}
	}
	return null;
}