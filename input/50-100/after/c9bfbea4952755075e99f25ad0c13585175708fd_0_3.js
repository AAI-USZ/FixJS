function (id, highlightedNodes) {
		var treeNode;
		
		if (typeof(highlightedNodes) === "undefined") {
			treeNode = treeView.find('li[cslid=' + id + '] > a');
		} else {
			treeNode = highlightedNodes.filter('li[cslid=' + id + ']').children('a');
		}

		if (treeNode.length > 0) {
			clickNode(treeNode.first());
		} else {
			selectedNodeId = id;
			selectedNodeChanged();
		}
	}