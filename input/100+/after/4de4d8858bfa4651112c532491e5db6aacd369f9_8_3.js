function (element, tagName) {
		var attributeValue;
		var newElement = HTMLArea.DOM.convertNode(element, tagName);
		if (tagName === 'bdo') {
			newElement.setAttribute('dir', 'ltr');
		}
		for (var i = 0; i < this.allowedAttributes.length; ++i) {
			if (attributeValue = element.getAttribute(this.allowedAttributes[i])) {
				newElement.setAttribute(this.allowedAttributes[i], attributeValue);
			}
		}
			// In IE before IE9, the above fails to update the class and style attributes.
		if (HTMLArea.isIEBeforeIE9) {
			if (element.style.cssText) {
				newElement.style.cssText = element.style.cssText;
			}
			if (element.className) {
				newElement.setAttribute("class", element.className);
				if (!newElement.className) {
						// IE before IE8
					newElement.setAttribute("className", element.className);
				}
			} else {
				newElement.removeAttribute("class");
					// IE before IE8
				newElement.removeAttribute("className");
			}
		}
		
		if (this.tags && this.tags[tagName] && this.tags[tagName].allowedClasses) {
			if (newElement.className && /\S/.test(newElement.className)) {
				var allowedClasses = this.tags[tagName].allowedClasses;
				classNames = newElement.className.trim().split(" ");
				for (var i = 0; i < classNames.length; ++i) {
					if (!allowedClasses.test(classNames[i])) {
						HTMLArea.DOM.removeClass(newElement, classNames[i]);
					}
				}
			}
		}
		return newElement;
	}