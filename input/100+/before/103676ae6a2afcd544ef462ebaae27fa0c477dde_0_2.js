function _treeDataProvider(treeNode, callback) {
		var parent = (treeNode === -1) ? currentEventTrace : treeNode.data('trace');
		
		var children = [];

		for (var i = 0; i < parent.children.length; i++) {
			var trace = parent.children[i];
			
			var child = {
				data: trace.id,
				metadata: { trace: trace }
			};
			if (trace.children && trace.children.length > 0) {
				child.state = "closed";
				child.children = [];
			}
			children.push(child);
		}
		callback(children);
	}