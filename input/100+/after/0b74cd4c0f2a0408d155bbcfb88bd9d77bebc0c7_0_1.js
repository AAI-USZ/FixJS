function(element, ctx) {
	if (this.context) {
		ctx = this.context.evaluate(ctx)[0];
	}
	if (!ctx) {
		return;
	}
	var nodes = [];
	if( this.binding.bind || this.binding.xpath ) {
		nodes = this.binding.evaluate(ctx);
	}
	var index = 0;
	var node = null;
	var originNodes = [];
	var parent = null;
	var pos = this.position === "after"? 1 : 0;
	var res = 0;
	if (this.origin) {
		originNodes = this.origin.evaluate(ctx);
	}
	if (originNodes.length === 0) {
		if (nodes.length === 0) {
			return;
		}
		originNodes.push(nodes[nodes.length - 1]);
	}
	for(var i = 0, len = originNodes.length; i < len; i += 1) {
		node = originNodes[i];
		if (nodes.length === 0) {
			parent = ctx;
		} else {
			parent = nodes[0].nodeType === XsltForms_nodeType.DOCUMENT? nodes[0] : nodes[0].nodeType === XsltForms_nodeType.ATTRIBUTE? nodes[0].ownerDocument ? nodes[0].ownerDocument : nodes[0].selectSingleNode("..") : nodes[0].parentNode;
			if (parent.nodeType !== XsltForms_nodeType.DOCUMENT && node.nodeType !== XsltForms_nodeType.ATTRIBUTE) {
				res = this.at ? Math.round(XsltForms_globals.numberValue(this.at.evaluate(new XsltForms_exprContext(ctx, 1, nodes)))) + i - 1: nodes.length - 1;
				index = isNaN(res)? nodes.length : res + pos;
			}
		}
		XsltForms_browser.debugConsole.write("insert " + node.nodeName + " in " + parent.nodeName + " at " + index + " - " + ctx.nodeName);
		if (node.nodeType === XsltForms_nodeType.ATTRIBUTE) {
			XsltForms_browser.setAttributeNS(parent, node.namespaceURI, node.nodeName, node.nodeValue);
		} else {
			var clone = node.cloneNode(true);
			if (parent.nodeType === XsltForms_nodeType.DOCUMENT) {
				var first = parent.documentElement;
				var prevmodel = XsltForms_browser.getMeta(first, "model");
				var previnst = XsltForms_browser.getMeta(first, "instance");
				parent.removeChild(first);
				first = null;
				XsltForms_browser.setMeta(clone, "instance", previnst);
				XsltForms_browser.setMeta(clone, "model", prevmodel);
				parent.appendChild(clone);
			} else {
				var nodeAfter;
				if (index >= nodes.length && nodes.length !== 0) {
					nodeAfter = nodes[nodes.length - 1].nextSibling;
				} else {
					nodeAfter = nodes[index];
				}
				if (nodeAfter) {
					nodeAfter.parentNode.insertBefore(clone, nodeAfter);
				} else {
					parent.appendChild(clone);
				}
				var repeat = nodes.length > 0? XsltForms_browser.getMeta(nodes[0], "repeat") : null;
				nodes.push(clone);
				if (repeat) {
					document.getElementById(repeat).xfElement.insertNode(clone, nodeAfter);
				}
			}
		}
	}
	var model = document.getElementById(XsltForms_browser.getMeta(parent.documentElement ? parent.documentElement : parent.ownerDocument.documentElement, "model")).xfElement;
	XsltForms_globals.addChange(model);
	model.setRebuilded(true);
	var evcontext = {"inserted-nodes": XsltForms_globals.stringValue([clone]), "origin-nodes": "dummy", "insert-location-node": "dummy", position: "dummy"};
	XsltForms_xmlevents.dispatch(model.findInstance(parent), "xforms-insert", null, null, null, null, evcontext);
}