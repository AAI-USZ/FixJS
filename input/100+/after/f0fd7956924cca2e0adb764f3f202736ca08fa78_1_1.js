function fixDisallowedAncestors(node, range) {
	// "If node is not editable, abort these steps."
	if (!isEditable(node)) {
		return;
	}

	// "If node is not an allowed child of any of its ancestors in the same
	// editing host, and is not an HTML element with local name equal to the
	// default single-line container name:"
	if ($_(getAncestors(node)).every(function(ancestor) {
		return !inSameEditingHost(node, ancestor)
			|| !isAllowedChild(node, ancestor)
	})
	&& !isHtmlElement(node, defaultSingleLineContainerName)) {
		// "If node is a dd or dt, wrap the one-node list consisting of node,
		// with sibling criteria returning true for any dl with no attributes
		// and false otherwise, and new parent instructions returning the
		// result of calling createElement("dl") on the context object. Then
		// abort these steps."
		if (isHtmlElement(node, ["dd", "dt"])) {
			wrap([node],
				function(sibling) { return isHtmlElement(sibling, "dl") && !sibling.attributes.length },
				function() { return document.createElement("dl") },
				range
			);
			return;
		}

		// "If node is not a prohibited paragraph child, abort these steps."
		if (!isProhibitedParagraphChild(node)) {
			return;
		}

		// "Set the tag name of node to the default single-line container name,
		// and let node be the result."
		node = setTagName(node, defaultSingleLineContainerName, range);

		// "Fix disallowed ancestors of node."
		fixDisallowedAncestors(node, range);

		// "Let descendants be all descendants of node."
		var descendants = getDescendants(node);

		// "Fix disallowed ancestors of each member of descendants."
		for (var i = 0; i < descendants.length; i++) {
			fixDisallowedAncestors(descendants[i], range);
		}

		// "Abort these steps."
		return;
	}

	// "Record the values of the one-node list consisting of node, and let
	// values be the result."
	var values = recordValues([node]);

	// "While node is not an allowed child of its parent, split the parent of
	// the one-node list consisting of node."
	while (!isAllowedChild(node, node.parentNode)) {
		// If the parent contains only this node and possibly empty text nodes, we rather want to unwrap the node, instead of splitting.
		// With splitting, we would get empty nodes, like:
		// split: <p><p>foo</p></p> -> <p></p><p>foo</p> (bad)
		// unwrap: <p><p>foo</p></p> -> <p>foo</p> (good)

		// First remove empty text nodes that are children of the parent and correct the range if necessary
		// we do this to have the node being the only child of its parent, so that we can replace the parent with the node
		for (var i = node.parentNode.childNodes.length - 1; i >= 0; --i) {
			if (node.parentNode.childNodes[i].nodeType == 3 && node.parentNode.childNodes[i].data.length == 0) {
				// we remove the empty text node
				node.parentNode.removeChild(node.parentNode.childNodes[i]);

				// if the range points to somewhere behind the removed text node, we reduce the offset
				if (range.startContainer == node.parentNode && range.startOffset > i) {
					range.startOffset--;
				}
				if (range.endContainer == node.parentNode && range.endOffset > i) {
					range.endOffset--;
				}
			}
		}

		// now that the parent has only the node as child (because we
		// removed any existing empty text nodes), we can safely unwrap the
		// node's contents, and correct the range if necessary
		if (node.parentNode.childNodes.length == 1) {
			var newStartOffset = range.startOffset;
			var newEndOffset = range.endOffset;

			if (range.startContainer === node.parentNode && range.startOffset > getNodeIndex(node)) {
				// the node (1 element) will be replaced by its contents (contents().length elements)
				newStartOffset = range.startOffset + (jQuery(node).contents().length - 1);
			}
			if (range.endContainer === node.parentNode && range.endOffset > getNodeIndex(node)) {
				// the node (1 element) will be replaced by its contents (contents().length elements)
				newEndOffset = range.endOffset + (jQuery(node).contents().length - 1);
			}
			jQuery(node).contents().unwrap();
			range.startOffset = newStartOffset;
			range.endOffset = newEndOffset;
			// after unwrapping, we are done
			break;
		} else {
			// store the original parent
			var originalParent = node.parentNode;
			splitParent([node], range);
			// check whether the parent did not change, so the split did not work, e.g.
			// because we already reached the editing host itself.
			// this situation can occur, e.g. when we insert a paragraph into an contenteditable span
			// in such cases, we just unwrap the contents of the paragraph
			if (originalParent === node.parentNode) {
				// so we unwrap now
				var newStartOffset = range.startOffset;
				var newEndOffset = range.endOffset;

				if (range.startContainer === node.parentNode && range.startOffset > getNodeIndex(node)) {
					// the node (1 element) will be replaced by its contents (contents().length elements)
					newStartOffset = range.startOffset + (jQuery(node).contents().length - 1);
				}
				if (range.endContainer === node.parentNode && range.endOffset > getNodeIndex(node)) {
					// the node (1 element) will be replaced by its contents (contents().length elements)
					newEndOffset = range.endOffset + (jQuery(node).contents().length - 1);
				}
				jQuery(node).contents().unwrap();
				range.startOffset = newStartOffset;
				range.endOffset = newEndOffset;
				// after unwrapping, we are done
				break;
			}
		}
	}

	// "Restore the values from values."
	restoreValues(values, range);
}