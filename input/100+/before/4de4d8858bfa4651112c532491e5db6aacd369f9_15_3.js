function(element, nodeName) {
		var newCell = HTMLArea.DOM.convertNode(element, nodeName);
		var attributes = element.attributes, attributeName, attributeValue;
		for (var i = attributes.length; --i >= 0;) {
			attributeName = attributes.item(i).nodeName;
			if (nodeName != 'td' || (attributeName != 'scope' && attributeName != 'abbr')) {
				attributeValue = element.getAttribute(attributeName);
				if (attributeValue) {
					newCell.setAttribute(attributeName, attributeValue);
				}
			}
		}
			// In IE, the above fails to update the classname and style attributes.
		if (Ext.isIE) {
			if (element.style.cssText) {
				newCell.style.cssText = element.style.cssText;
			}
			if (element.className) {
				newCell.setAttribute("class", element.className);
				if (!newCell.className) {
						// IE before IE8
					newCell.setAttribute("className", element.className);
				}
			} else {
				newCell.removeAttribute("class");
					// IE before IE8
				newCell.removeAttribute("className");
			}
		}

		if (this.tags && this.tags[nodeName] && this.tags[nodeName].allowedClasses) {
			if (newCell.className && /\S/.test(newCell.className)) {
				var allowedClasses = this.tags[nodeName].allowedClasses;
				var classNames = newCell.className.trim().split(" ");
				for (var i = classNames.length; --i >= 0;) {
					if (!allowedClasses.test(classNames[i])) {
						HTMLArea.DOM.removeClass(newCell, classNames[i]);
					}
				}
			}
		}
		return newCell;
	}