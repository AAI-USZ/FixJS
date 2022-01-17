function(nodes) {
		var resultNode = null
		  , i = 0
		  , maxLength = nodes.length
		  , curLength
		;
		
		nodes = _Array_map.call(nodes, function (node) {
			return typeof node === "string" ?
				document.createTextNode(node) :
				node;
		});
		
		if (maxLength === 1) {
			resultNode = nodes[0];
		} else {
			resultNode = document.createDocumentFragment();

			//nodes can be a live NodeList so we can't use forEach and need to check nodes.length after each appendChild
			for(var i = 0, maxLength = nodes.length, curLength ; i < (curLength = nodes.length) ; ++i) {
				i -= (maxLength - curLength);
				resultNode.appendChild(nodes[i]);
			}			
		}
		
		return resultNode;
	}