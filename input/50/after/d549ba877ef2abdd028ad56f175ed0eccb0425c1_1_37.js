function(node) {
		return node.nodeType == $_.Node.ELEMENT_NODE
			&& isEditable(node)
			// Ignoring namespaces here
			&& (
				$_( node ).hasAttribute("align")
				|| node.style.textAlign != ""
				|| isHtmlElement(node, "center")
			);
	}