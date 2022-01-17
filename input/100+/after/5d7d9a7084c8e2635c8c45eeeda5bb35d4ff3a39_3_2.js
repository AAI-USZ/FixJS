function (clickedCslId) {
		var index,
			cslId = parseInt(hoveredNodeStack[hoveredNodeStack.length - 1], 10),
			selectedNode;

		if (hoveredNodeStack.length === 0) {
			cslId = clickedCslId;
		} else {
			// skip the macro definition nodes, jump to the referencing 'text' node instead
			selectedNode = CSLEDIT.data.getNode(cslId);
			if (selectedNode.name === "macro") {
				assert(hoveredNodeStack.length > 1);
				cslId = hoveredNodeStack[hoveredNodeStack.length - 2];
			}
		}

		if (selectedCslId !== cslId) {
			CSLEDIT.viewController.selectNode(cslId, highlightedTreeNodes);
		}
	}