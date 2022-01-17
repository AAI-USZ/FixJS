function(value, range) {

		// "Delete the contents of the active range."
		deleteContents(range);

		// "If the active range's start node is neither editable nor an editing
		// host, abort these steps."
		if (!isEditable(range.startContainer)
		&& !isEditingHost(range.startContainer)) {
			return;
		}

		// "Let node and offset be the active range's start node and offset."
		var node = range.startContainer;
		var offset = range.startOffset;

		// "If node is a Text node, and offset is neither 0 nor the length of
		// node, call splitText(offset) on node."
		if (node.nodeType == $_.Node.TEXT_NODE
		&& offset != 0
		&& offset != getNodeLength(node)) {
			node.splitText(offset);
		}

		// "If node is a Text node and offset is its length, set offset to one
		// plus the index of node, then set node to its parent."
		if (node.nodeType == $_.Node.TEXT_NODE
		&& offset == getNodeLength(node)) {
			offset = 1 + getNodeIndex(node);
			node = node.parentNode;
		}

		// "If node is a Text or Comment node, set offset to the index of node,
		// then set node to its parent."
		if (node.nodeType == $_.Node.TEXT_NODE
		|| node.nodeType == $_.Node.COMMENT_NODE) {
			offset = getNodeIndex(node);
			node = node.parentNode;
		}

		// "Call collapse(node, offset) on the context object's Selection."
		Aloha.getSelection().collapse(node, offset);
		range.setStart(node, offset);
		range.setEnd(node, offset);

		// "Let container equal node."
		var container = node;

		// "While container is not a single-line container, and container's
		// parent is editable and in the same editing host as node, set
		// container to its parent."
		while (!isSingleLineContainer(container)
		&& isEditable(container.parentNode)
		&& inSameEditingHost(node, container.parentNode)) {
			container = container.parentNode;
		}

		// "If container is not editable or not in the same editing host as
		// node or is not a single-line container:"
		if (!isEditable(container)
		|| !inSameEditingHost(container, node)
		|| !isSingleLineContainer(container)) {
			// "Let tag be the default single-line container name."
			var tag = defaultSingleLineContainerName;

			// "Block-extend the active range, and let new range be the
			// result."
			var newRange = blockExtend(range);

			// "Let node list be a list of nodes, initially empty."
			//
			// "Append to node list the first node in tree order that is
			// contained in new range and is an allowed child of "p", if any."
			var nodeList = getContainedNodes(newRange, function(node) { return isAllowedChild(node, "p") })
				.slice(0, 1);

			// "If node list is empty:"
			if (!nodeList.length) {
				// "If tag is not an allowed child of the active range's start
				// node, abort these steps."
				if (!isAllowedChild(tag, range.startContainer)) {
					return;
				}

				// "Set container to the result of calling createElement(tag)
				// on the context object."
				container = document.createElement(tag);

				// "Call insertNode(container) on the active range."
				range.insertNode(container);

				// "Call createElement("br") on the context object, and append
				// the result as the last child of container."
				container.appendChild(createEndBreak());

				// "Call collapse(container, 0) on the context object's
				// Selection."
				// TODO: remove selection from command
				Aloha.getSelection().collapse(container, 0); 
				range.setStart(container, 0);
				range.setEnd(container, 0);

				// "Abort these steps."
				return;
			}

			// "While the nextSibling of the last member of node list is not
			// null and is an allowed child of "p", append it to node list."
			while (nodeList[nodeList.length - 1].nextSibling
			&& isAllowedChild(nodeList[nodeList.length - 1].nextSibling, "p")) {
				nodeList.push(nodeList[nodeList.length - 1].nextSibling);
			}

			// "Wrap node list, with sibling criteria returning false and new
			// parent instructions returning the result of calling
			// createElement(tag) on the context object. Set container to the
			// result."
			container = wrap(nodeList,
				function() { return false },
				function() { return document.createElement(tag) },
				range
			);
		}

		// "If container's local name is "address", "listing", or "pre":"
		if (container.tagName == "ADDRESS"
		|| container.tagName == "LISTING"
		|| container.tagName == "PRE") {
			// "Let br be the result of calling createElement("br") on the
			// context object."
			var br = document.createElement("br");

			// remember the old height
			var oldHeight = container.offsetHeight;

			// "Call insertNode(br) on the active range."
			range.insertNode(br);

			// determine the new height
			var newHeight = container.offsetHeight;

			// "Call collapse(node, offset + 1) on the context object's
			// Selection."
			Aloha.getSelection().collapse(node, offset + 1);
			range.setStart(node, offset + 1);
			range.setEnd(node, offset + 1);

			// "If br is the last descendant of container, let br be the result
			// of calling createElement("br") on the context object, then call
			// insertNode(br) on the active range." (Fix: only do this, if the container height did not change by inserting a single <br/>)
			//
			// Work around browser bugs: some browsers select the
			// newly-inserted node, not per spec.
			if (oldHeight == newHeight && !isDescendant(nextNode(br), container)) {
				range.insertNode(createEndBreak());
				Aloha.getSelection().collapse(node, offset + 1);
				range.setEnd(node, offset + 1);
			}

			// "Abort these steps."
			return;
		}

		// "If container's local name is "li", "dt", or "dd"; and either it has
		// no children or it has a single child and that child is a br:"
		if ($_(["LI", "DT", "DD"]).indexOf(container.tagName) != -1
		&& (!container.hasChildNodes()
		|| (container.childNodes.length == 1
		&& isHtmlElement(container.firstChild, "br")))) {
			// "Split the parent of the one-node list consisting of container."
			splitParent([container], range);

			// "If container has no children, call createElement("br") on the
			// context object and append the result as the last child of
			// container."
			// only do this, if inserting the br does NOT modify the offset height of the container
			if (!container.hasChildNodes()) {
				var oldHeight = container.offsetHeight, endBr = createEndBreak();
				container.appendChild(endBr);
				if (container.offsetHeight !== oldHeight) {
					container.removeChild(endBr);
				}
			}

			// "If container is a dd or dt, and it is not an allowed child of
			// any of its ancestors in the same editing host, set the tag name
			// of container to the default single-line container name and let
			// container be the result."
			if (isHtmlElement(container, ["dd", "dt"])
			&& $_( getAncestors(container) ).every(function(ancestor) {
				return !inSameEditingHost(container, ancestor)
					|| !isAllowedChild(container, ancestor)
			})) {
				container = setTagName(container, defaultSingleLineContainerName, range);
			}

			// "Fix disallowed ancestors of container."
			fixDisallowedAncestors(container, range);

			// fix invalid nested lists
			if (isHtmlElement(container, "li")
			&& isHtmlElement(container.nextSibling, "li")
			&& isHtmlElement(container.nextSibling.firstChild, ["ol", "ul"])) {
				// we found a li containing only a br followed by a li containing a list as first element: merge the two li's
				var listParent = container.nextSibling, length = container.nextSibling.childNodes.length;
				for (var i = 0; i < length; i++) {
					container.appendChild(listParent.childNodes[i]);
				}
				listParent.parentNode.removeChild(listParent);
			}

			// "Abort these steps."
			return;
		}

		// "Let new line range be a new range whose start is the same as
		// the active range's, and whose end is (container, length of
		// container)."
		var newLineRange = Aloha.createRange();
		newLineRange.setStart(range.startContainer, range.startOffset);
		newLineRange.setEnd(container, getNodeLength(container));

		// "While new line range's start offset is zero and its start node is
		// not container, set its start to (parent of start node, index of
		// start node)."
		while (newLineRange.startOffset == 0
		&& newLineRange.startContainer != container) {
			newLineRange.setStart(newLineRange.startContainer.parentNode, getNodeIndex(newLineRange.startContainer));
		}

		// "While new line range's start offset is the length of its start node
		// and its start node is not container, set its start to (parent of
		// start node, 1 + index of start node)."
		while (newLineRange.startOffset == getNodeLength(newLineRange.startContainer)
		&& newLineRange.startContainer != container) {
			newLineRange.setStart(newLineRange.startContainer.parentNode, 1 + getNodeIndex(newLineRange.startContainer));
		}

		// "Let end of line be true if new line range contains either nothing
		// or a single br, and false otherwise."
		var containedInNewLineRange = getContainedNodes(newLineRange);
		var endOfLine = !containedInNewLineRange.length
			|| (containedInNewLineRange.length == 1
			&& isHtmlElement(containedInNewLineRange[0], "br"));

		// "If the local name of container is "h1", "h2", "h3", "h4", "h5", or
		// "h6", and end of line is true, let new container name be the default
		// single-line container name."
		var newContainerName;
		if (/^H[1-6]$/.test(container.tagName)
		&& endOfLine) {
			newContainerName = defaultSingleLineContainerName;

		// "Otherwise, if the local name of container is "dt" and end of line
		// is true, let new container name be "dd"."
		} else if (container.tagName == "DT"
		&& endOfLine) {
			newContainerName = "dd";

		// "Otherwise, if the local name of container is "dd" and end of line
		// is true, let new container name be "dt"."
		} else if (container.tagName == "DD"
		&& endOfLine) {
			newContainerName = "dt";

		// "Otherwise, let new container name be the local name of container."
		} else {
			newContainerName = container.tagName.toLowerCase();
		}

		// "Let new container be the result of calling createElement(new
		// container name) on the context object."
		var newContainer = document.createElement(newContainerName);

		// "Copy all non empty attributes of the container to new container."
		copyAttributes( container,  newContainer );

		// "If new container has an id attribute, unset it."
		newContainer.removeAttribute("id");

		// "Insert new container into the parent of container immediately after
		// container."
		container.parentNode.insertBefore(newContainer, container.nextSibling);

		// "Let contained nodes be all nodes contained in new line range."
		var containedNodes = getAllContainedNodes(newLineRange);

		// "Let frag be the result of calling extractContents() on new line
		// range."
		var frag = newLineRange.extractContents();

		// "Unset the id attribute (if any) of each Element descendant of frag
		// that is not in contained nodes."
		var descendants = getDescendants(frag);
		for (var i = 0; i < descendants.length; i++) {
			if (descendants[i].nodeType == $_.Node.ELEMENT_NODE
			&& $_(containedNodes).indexOf(descendants[i]) == -1) {
				descendants[i].removeAttribute("id");
			}
		}

		var fragChildren = [], fragChild = frag.firstChild;
		if (fragChild) {
			do {
				if (!isWhitespaceNode(fragChild)) {
					fragChildren.push(fragChild);
				}
			} while(fragChild = fragChild.nextSibling);
		}

		// if newContainer is a li and frag contains only a list, we add a br in the li (but only if the height would not change)
		if (isHtmlElement(newContainer, "li") && fragChildren.length && isHtmlElement(fragChildren[0], ["ul", "ol"])) {
			var oldHeight = newContainer.offsetHeight;
			var endBr = createEndBreak();
			newContainer.appendChild(endBr);
			var newHeight = newContainer.offsetHeight;
			if (oldHeight !== newHeight) {
				newContainer.removeChild(endBr);
			}
		}

		// "Call appendChild(frag) on new container."
		newContainer.appendChild(frag);

		// "If container has no visible children, call createElement("br") on
		// the context object, and append the result as the last child of
		// container."
		if (container.offsetHeight == 0 && !$_(container.childNodes).some(isVisible)) {
			container.appendChild(createEndBreak());
		}

		// "If new container has no visible children, call createElement("br")
		// on the context object, and append the result as the last child of
		// new container."
		if (newContainer.offsetHeight == 0 &&
			!$_(newContainer.childNodes).some(isVisible)) {
			newContainer.appendChild(createEndBreak());
		}

		// "Call collapse(new container, 0) on the context object's Selection."
		Aloha.getSelection().collapse(newContainer, 0);
		range.setStart(newContainer, 0);
		range.setEnd(newContainer, 0);
	}