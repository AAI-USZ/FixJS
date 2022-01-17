function(ancestor) {
				return isEditable(ancestor)
					&& inSameEditingHost(ancestor, node)
					&& isHtmlElement(ancestor, formattableBlockNames)
					&& !$_( getDescendants(ancestor) ).some(isProhibitedParagraphChild);
			}