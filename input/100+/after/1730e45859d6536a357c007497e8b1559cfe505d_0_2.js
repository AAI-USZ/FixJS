function indentNodes(nodeList, range) {
	// "If node list is empty, do nothing and abort these steps."
	if (!nodeList.length) {
		return;
	}

	// "Let first node be the first member of node list."
	var firstNode = nodeList[0];

	// "If first node's parent is an ol or ul:"
	if (isHtmlElement(firstNode.parentNode, ["OL", "UL"])) {
		// "Let tag be the local name of the parent of first node."
		var tag = firstNode.parentNode.tagName;

		// "Wrap node list, with sibling criteria returning true for an HTML
		// element with local name tag and false otherwise, and new parent
		// instructions returning the result of calling createElement(tag) on
		// the ownerDocument of first node."
		wrap(nodeList,
			function(node) { return isHtmlElement(node, tag) },
			function() { return firstNode.ownerDocument.createElement(tag) },
			range
		);

    //Note: This is not part of editing API spec
    //Adding this to conform with Aloha's intended behaviour
    //
    //if the sublist's previousSibling is also a li
    //move the sublist to previousSibling
    $_( nodeList ).forEach( function( node ) {
      var parentNode = node.parentNode
      console.log(parentNode);
      alert("");
      movePreservingRanges(parentNode, parentNode.previousSibling, -1, range);
    });

		// "Abort these steps."
		return;
	}

  // Note: Disabled simple indention as it breaks Aloha's conventions.
  // Original implementation was left commented for future reference.
  
	// "Wrap node list, with sibling criteria returning true for a simple
	// indentation element and false otherwise, and new parent instructions
	// returning the result of calling createElement("blockquote") on the
	// ownerDocument of first node. Let new parent be the result."
	var newParent = wrap(nodeList,
		function(node) { return isSimpleIndentationElement(node) },
		function() { return firstNode.ownerDocument.createElement("blockquote") },
		range
	);

	// "Fix disallowed ancestors of new parent."
	fixDisallowedAncestors(newParent, range);
}