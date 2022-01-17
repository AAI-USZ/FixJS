function () {
		treesLoaded++;

		if (treesLoaded === treesToLoad) {
			if (selectedNode() === -1) {
				selectNode(CSLEDIT.data.getNodesFromPath('style/info')[0].cslId);
			}
			callbacks.formatCitations();
			callbacks.viewInitialised();
		}
	}