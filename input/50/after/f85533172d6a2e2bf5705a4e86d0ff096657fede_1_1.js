function() {
		var node = this.domNode;
		return domAttr.get(node, 'data-dojo-type') || domAttr.get(node, 'dojoType');
	}