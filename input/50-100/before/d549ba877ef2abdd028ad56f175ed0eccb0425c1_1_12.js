function(node) {
			return isEditable(node)
				&& (isNonListSingleLineContainer(node)
				|| isAllowedChild(node, "p")
				|| isHtmlElement(node, ["dd", "dt"]))
				&& !getDescendants(node).some(isProhibitedParagraphChild);
		}