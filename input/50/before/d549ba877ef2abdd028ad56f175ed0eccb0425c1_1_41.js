function(ancestor) {
				return isEditable(ancestor)
					&& inSameEditingHost(ancestor, node)
					&& isHtmlElement(ancestor, formattableBlockNames)
					&& !getDescendants(ancestor).some(isProhibitedParagraphChild);
			}