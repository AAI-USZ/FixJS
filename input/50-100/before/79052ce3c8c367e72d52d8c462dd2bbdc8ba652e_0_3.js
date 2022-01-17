function () {
		var index,
			cslId = parseInt(hoveredNodeStack[hoveredNodeStack.length - 1]),
			selectedNode;

		assert(hoveredNodeStack.length > 0);

		// skip the macro definition nodes, jump to the referencing 'text' node instead
		selectedNode = CSLEDIT.data.getNode(cslId);
		if (selectedNode.name === "macro") {
			assert(hoveredNodeStack.length > 1);
			cslId = hoveredNodeStack[hoveredNodeStack.length - 2];
		}

		if (selectedCslId !== cslId) {
			selectedCslId = cslId;
			CSLEDIT.viewController.selectNode(cslId, highlightedTreeNodes);
		}
	}