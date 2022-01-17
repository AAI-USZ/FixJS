function(node) {
		return node.nodeType == Node.ELEMENT_NODE
			&& isEditable(node)
			// Ignoring namespaces here
			&& (
				node.hasAttribute("align")
				|| node.style.textAlign != ""
				|| isHtmlElement(node, "center")
			);
	}