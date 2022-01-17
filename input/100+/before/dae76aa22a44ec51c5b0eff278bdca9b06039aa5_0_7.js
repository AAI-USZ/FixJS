function renderAndLink(view, index, views, data, html, context, addingViewToParent) {
		var prevView, prevNode, linkToNode, linkFromNode,
			elLinked = !view._prevNode;
			parentNode = view.parentElem;

		if (index && ("" + index !== index)) {
			if (!views[index]) {
				return; // If subview for provided index does not exist, do nothing
			}
			prevView = views[index - 1];
			prevNode = elLinked ? prevView._after : addingViewToParent ? prevView._nextNode : view._prevNode;
		} else {
			prevNode = elLinked ? view._preceding : view._prevNode;
		}

		if (prevNode) {
			linkToNode = prevNode.nextSibling;
			$(prevNode).after(html);
			prevNode = prevNode.nextSibling;
		} else {
			linkToNode = parentNode.firstChild;
			$(parentNode).prepend(html);
			prevNode = parentNode.firstChild;
		}
		linkFromNode = prevNode && prevNode.previousSibling;

		// Remove the extra tmpl annotation nodes which wrap the inserted items
		parentNode.removeChild(prevNode);
		parentNode.removeChild(linkToNode ? linkToNode.previousSibling : parentNode.lastChild);

		// Link the new HTML nodes to the data
		view.link(data, parentNode, context, linkFromNode, linkToNode, index);
	}