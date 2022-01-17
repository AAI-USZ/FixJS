function(value, range) {
		range = range || getActiveRange();

    // Note: Avoid normalizing sublists as it breaks Aloha's current behaviour
    // Original implementation was left commented for future reference.

		// // "Let items be a list of all lists that are ancestor containers of the
		// // range's start and/or end node."
		// //
		// // It's annoying to get this in tree order using functional stuff
		// // without doing getDescendants(document), which is slow, so I do it
		// // imperatively.
		// var items = [];
		// (function(){
		// 	for (
		// 		var ancestorContainer = range.endContainer;
		// 		ancestorContainer != range.commonAncestorContainer;
		// 		ancestorContainer = ancestorContainer.parentNode
		// 	) {
		// 		if (isHtmlElement(ancestorContainer, "li")) {
		// 			items.unshift(ancestorContainer);
		// 		}
		// 	}
		// 	for (
		// 		var ancestorContainer = range.startContainer;
		// 		ancestorContainer;
		// 		ancestorContainer = ancestorContainer.parentNode
		// 	) {
		// 		if (isHtmlElement(ancestorContainer, "li")) {
		// 			items.unshift(ancestorContainer);
		// 		}
		// 	}
		// });

    // // "For each item in items, normalize sublists of item."
		// $_( items ).forEach( function( thisArg) {
		// 	normalizeSublists( thisArg, range);
		// });

		// "Block-extend the active range, and let new range be the result."
		var newRange = blockExtend(range);

		// "Let node list be a list of nodes, initially empty."
		//
		// "For each node contained in new range, append node to node list
		// if the last member of node list (if any) is not an ancestor of node;
		// node is editable; and either node has no editable descendants, or is
		// an ol or ul, or is an li whose parent is an ol or ul."
		var nodeList = getContainedNodes(newRange, function(node) {
			return isEditable(node)
				&& (!$_( getDescendants(node) ).some(isEditable)
				|| isHtmlElementInArray(node, ["ol", "ul"])
				|| (isNamedHtmlElement(node, 'li') && isHtmlElementInArray(node.parentNode, ["ol", "ul"])));
		});

		// "While node list is not empty:"
		while (nodeList.length) {

			// "While the first member of node list is an ol or ul or is not
			// the child of an ol or ul, outdent it and remove it from node
			// list."
			while (nodeList.length
			&& (isHtmlElementInArray(nodeList[0], ["OL", "UL"])
			&& isNamedHtmlElement(nodeList[0].parentNode, "LI"))) {
				outdentNode(nodeList.shift(), range);
			}

			// "If node list is empty, break from these substeps."
			if (!nodeList.length) {
				break;
			}

			// "Let sublist be a list of nodes, initially empty."
			var sublist = [];

			// "Remove the first member of node list and append it to sublist."
			sublist.push(nodeList.shift());

			// "While the first member of node list is the nextSibling of the
			// last member of sublist, and the first member of node list is not
			// an ol or ul, remove the first member of node list and append it
			// to sublist."
			while (nodeList.length
			&& nodeList[0] == sublist[sublist.length - 1].nextSibling
			&& !isHtmlElementInArray(nodeList[0], ["OL", "UL"])) {
				sublist.push(nodeList.shift());
			}

			// "Record the values of sublist, and let values be the result."
			var values = recordValues(sublist);

			// "Split the parent of sublist, with new parent null."
			splitParent(sublist, range);

			// "Fix disallowed ancestors and isolated lis of each member of sublist."
			$_( sublist ).forEach(function(node){

        fixDisallowedAncestors(node, range);

      });

			// "Restore the values from values."
			restoreValues(values, range);
		}
	}