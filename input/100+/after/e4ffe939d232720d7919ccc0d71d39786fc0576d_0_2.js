function(ctx) {
	if (this.element.getAttribute("cloned")) {
		return;
	}
	this.nodes = this.evaluateBinding(this.nodesetBinding, ctx);
	var next = this.element;
	var parentNode = next.parentNode;
	var length = this.nodes.length;
	var oldNode = next;
	var listeners = next.listeners;
	for (var cont = 1; true;) {
		next = next.nextSibling;
		if (next) {
			if (next.nodeType === XsltForms_nodeType.ELEMENT) {
				if (next.getAttribute("cloned")) {
					if (cont >= length) {
						next.listeners = null;
						parentNode.removeChild(next);
						next = oldNode;
					} else {
						next.node = this.nodes[cont];
						this.refresh_(next, cont++);
						oldNode = next;
					}
				}
			} else {
				var n = next.previousSibling;
				next.parentNode.removeChild(next);
				next = n;
			}
		} else {
			for (var i = cont; i < length; i++) {
				var node = this.element.cloneNode(true);
				node.setAttribute("cloned", "true");
				XsltForms_idManager.cloneId(node);
				node.node = this.nodes[i];
				parentNode.appendChild(node);
				this.refresh_(node, i);
				if (listeners && !XsltForms_browser.isIE) {
					for (var j = 0, len = listeners.length; j < len; j++) {
						listeners[j].clone(node);
					}
				}
			}
			break;
		}
	}
	if (length > 0) {
		this.element.node = this.nodes[0];
		this.refresh_(this.element, 0);
	} else {
		this.element.value = "\xA0";
		this.element.text = "\xA0";
	}
}