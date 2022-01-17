function(node, perfix){
		while(node && !node.id){
			node = node.parentNode;
		}
		var nodeId = node.id;
		var len = perfix.length;
		if(nodeId.length <= len){
			throw Error("repeat node id error.");
		}
		var index = nodeId.substring(len, nodeId.length);
		return parseInt(index);
	}