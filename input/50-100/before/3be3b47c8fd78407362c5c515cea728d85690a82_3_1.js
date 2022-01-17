function() {
		var node = nb.createProxy(5);
		util.assert(node.id == 5, "Expected id {0}, got {1}", 5, node.id);
		util.assert(node.version == undefined, "Expected undefined version, got {0}", node.version);
		util.assert(node.isIncomplete(), "Expected node is incomplete, got {0}", node.isIncomplete());
	}