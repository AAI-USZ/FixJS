function(node) {
			return isEditable(node)
				&& (!$_( getDescendants(node) ).some(isEditable)
				|| isHtmlElement(node, ["ol", "ul"])
				|| (isHtmlElement(node, "li") && isHtmlElement(node.parentNode, ["ol", "ul"])));
		}