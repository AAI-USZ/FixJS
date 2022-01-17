function(nodes) {
		var resultNode = null;
		
		nodes = _Array_map.call(nodes, function (node) {
			return typeof node === "string" ?
				document.createTextNode(node) :
				node;
		});
		
		if (nodes.length === 1) {
			resultNode = nodes[0];
		} else {
			resultNode = document.createDocumentFragment();
			nodes.forEach(resultNode.appendChild, resultNode);
		}
		
		return resultNode;
	}