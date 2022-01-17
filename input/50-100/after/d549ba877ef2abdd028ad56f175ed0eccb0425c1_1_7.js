function(node) {
			$_( getAncestors(node) ).forEach(function(ancestor) {
				if (isEditable(ancestor)
				&& isHtmlElement(ancestor, "a")
				&& $_( ancestor ).hasAttribute("href")) {
					ancestor.setAttribute("href", value);
				}
			});
		}