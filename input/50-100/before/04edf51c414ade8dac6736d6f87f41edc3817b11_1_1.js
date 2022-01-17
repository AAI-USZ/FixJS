function _treeDataProvider(treeNode, callback) {
		var parent = (treeNode === -1) ? { children: [currentEventTrace] } : treeNode.data('trace');
		var children = _traceChildrenForTree(parent, treeNode === -1);
		callback(children);
	}