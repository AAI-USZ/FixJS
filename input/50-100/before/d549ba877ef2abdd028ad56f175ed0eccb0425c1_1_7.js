function(node) {
			getAncestors(node).forEach(function(ancestor) {
				if (isEditable(ancestor)
				&& isHtmlElement(ancestor, "a")
				&& ancestor.hasAttribute("href")) {
					ancestor.setAttribute("href", value);
				}
			});
		}