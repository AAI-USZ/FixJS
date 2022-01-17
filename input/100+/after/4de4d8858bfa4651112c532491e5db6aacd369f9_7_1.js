function (node, nodeName) {
		var newNode = HTMLArea.DOM.convertNode(node, nodeName);
		var attributes = node.attributes, attributeName, attributeValue;
		for (var i = attributes.length; --i >= 0;) {
			attributeName = attributes.item(i).nodeName;
			attributeValue = node.getAttribute(attributeName);
			if (attributeValue) newNode.setAttribute(attributeName, attributeValue);
		}
			// In IE, the above fails to update the classname and style attributes.
		if (HTMLArea.isIEBeforeIE9) {
			if (node.style.cssText) {
				newNode.style.cssText = node.style.cssText;
			}
			if (node.className) {
				newNode.setAttribute('class', node.className);
				if (!newNode.className) {
						// IE before IE8
					newNode.setAttribute('className', node.className);
				}
			} else {
				newNode.removeAttribute('class');
				newNode.removeAttribute('className');
			}
		}
		
		if (this.tags && this.tags[nodeName] && this.tags[nodeName].allowedClasses) {
			if (newNode.className && /\S/.test(newNode.className)) {
				var allowedClasses = this.tags[nodeName].allowedClasses;
				var classNames = newNode.className.trim().split(' ');
				for (var i = classNames.length; --i >= 0;) {
					if (!allowedClasses.test(classNames[i])) {
						HTMLArea.DOM.removeClass(newNode, classNames[i]);
					}
				}
			}
		}
		return newNode;
	}