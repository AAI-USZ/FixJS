function (id, flowspec, parent, pkg, cb) {
			var node = F5.Global.flow.importNode(id, flowspec, parent, pkg);
			if (node.active) {
				nodeInitialize(node, cb);								
			}
		}