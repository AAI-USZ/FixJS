function extendNodeListPrototype(nodeListProto) {
	if(nodeListProto && nodeListProto !== Array.prototype) {
		nodeList_methods_fromArray.forEach(function(key) {
			if(!nodeListProto[key])nodeListProto[key] = Array.prototype[key];
		})
	}
}