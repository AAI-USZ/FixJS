function () {
		var numCslNodes = CSLEDIT.data.numCslNodes();
			
		// clear the hovered node stack
		hoveredNodeStack.length = 0;
		selectedCslId = -1;

		setupEventHandlers();

		// highlight the selected node if there is one
		if (CSLEDIT.viewController.selectedNode() !== -1) {
			editorElement.find(
				'span[cslid=' + CSLEDIT.viewController.selectedNode() + ']').addClass('selected');
		}
	}