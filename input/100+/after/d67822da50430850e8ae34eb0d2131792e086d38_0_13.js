function (element, range) {
		if (HTMLArea.isIEBeforeIE9) {
			var nodeName = element.nodeName;
			var bookMark = this.bookMark.get(range);
			if (range.parentElement) {
				var parent = range.parentElement();
				var rangeStart = range.duplicate();
				rangeStart.collapse(true);
				var parentStart = rangeStart.parentElement();
				var rangeEnd = range.duplicate();
				rangeEnd.collapse(true);
				var newRange = this.selection.createRange();
				
				var parentEnd = rangeEnd.parentElement();
				var upperParentStart = parentStart;
				if (parentStart !== parent) {
					while (upperParentStart.parentNode !== parent) {
						upperParentStart = upperParentStart.parentNode;
					}
				}
				
				element.innerHTML = range.htmlText;
					// IE eats spaces on the start boundary
				if (range.htmlText.charAt(0) === '\x20') {
					element.innerHTML = '&nbsp;' + element.innerHTML;
				}
				var elementClone = element.cloneNode(true);
				range.pasteHTML(element.outerHTML);
					// IE inserts the element as the last child of the start container
				if (parentStart !== parent
						&& parentStart.lastChild
						&& parentStart.lastChild.nodeType === HTMLArea.DOM.ELEMENT_NODE
						&& parentStart.lastChild.nodeName.toLowerCase() === nodeName) {
					parent.insertBefore(elementClone, upperParentStart.nextSibling);
					parentStart.removeChild(parentStart.lastChild);
						// Sometimes an empty previous sibling was created
					if (elementClone.previousSibling
							&& elementClone.previousSibling.nodeType === HTMLArea.DOM.ELEMENT_NODE
							&& !elementClone.previousSibling.innerText) {
						parent.removeChild(elementClone.previousSibling);
					}
						// The bookmark will not work anymore
					newRange.moveToElementText(elementClone);
					newRange.collapse(false);
					newRange.select();
				} else {
						// Working around IE boookmark bug
					if (parentStart != parentEnd) {
						var newRange = this.selection.createRange();
						if (newRange.moveToBookmark(bookMark)) {
							newRange.collapse(false);
							newRange.select();
						}
					} else {
						range.collapse(false);
					}
				}
				parent.normalize();
			} else {
				var parent = range.item(0);
				element = parent.parentNode.insertBefore(element, parent);
				element.appendChild(parent);
				this.bookMark.moveTo(bookMark);
			}
		} else {
			element.appendChild(range.extractContents());
			range.insertNode(element);
			element.normalize();
				// Sometimes Firefox inserts empty elements just outside the boundaries of the range
			var neighbour = element.previousSibling;
			if (neighbour && (neighbour.nodeType !== HTMLArea.DOM.TEXT_NODE) && !/\S/.test(neighbour.textContent)) {
				HTMLArea.DOM.removeFromParent(neighbour);
			}
			neighbour = element.nextSibling;
			if (neighbour && (neighbour.nodeType !== HTMLArea.DOM.TEXT_NODE) && !/\S/.test(neighbour.textContent)) {
				HTMLArea.DOM.removeFromParent(neighbour);
			}
			this.selection.selectNodeContents(element, false);
		}
	}