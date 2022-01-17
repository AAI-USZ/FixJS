function extendNodeListPrototype(nodeList_proto) {
	//in old FF nodeList_proto.__proto__ != nodeList_proto.constructor.prototype
	nodeList_proto = nodeList_proto.__proto__ || nodeList_proto.constructor.prototype;

	if(nodeListProto && nodeListProto !== Array.prototype) {
		nodeList_methods_fromArray.forEach(function(key) {
			if(!nodeListProto[key])nodeListProto[key] = Array.prototype[key];
		})
	}
}