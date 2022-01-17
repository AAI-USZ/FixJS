function() {
	var t,bounds;
	if(this.domNode) {
		if(this.domNode.nodeType === 3) { // Node.TEXT_NODE
			bounds = this.domNode.parentNode.getBoundingClientRect();
		} else {
			bounds = this.domNode.getBoundingClientRect();
		}
		// Absurdly, Firefox requires us to do this, otherwise JSON.stringify() gets confused
		return {
			top: bounds.top,
			left: bounds.left,
			right: bounds.right,
			bottom: bounds.bottom,
			width: bounds.width,
			height: bounds.height
		};
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