function (event) {
		var target = $(event.target).closest("span[cslid]");
		
		// remove all
		removeFromHoveredNodeStack(true);

		// populate hovered node stack
		addToHoveredNodeStack(target);

		var lastNode = hoveredNodeStack[hoveredNodeStack.length - 1];
		assertEqual(lastNode, target.attr("cslid"), "applySyntax");

		if (hoveredNodeStack.length > 0) {
			highlightNode(hoveredNodeStack.slice());
		}
	}