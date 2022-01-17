function extendNodeListPrototype(nodeList_proto) {
	//in old FF nodeList_proto.__proto__ != nodeList_proto.constructor.prototype
	nodeList_proto = nodeList_proto.__proto__ || nodeList_proto.constructor.prototype;

	if(nodeList_proto && nodeList_proto !== Array.prototype) {
		nodeList_methods_fromArray.forEach(function(key) {
			if(!nodeList_proto[key])nodeList_proto[key] = Array.prototype[key];
		})
	}
}