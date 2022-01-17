function (nodePath) {
		var treeNode = treeView,
			cslId;

		$.each(nodePath, function (i, cslId) {
			treeNode = treeNode.find('li[cslId="' + cslId + '"]');
		});

		treeNode = treeNode.children('a');

		if (treeNode.length > 0) {
			clickNode(treeNode.first());
		}		
	}