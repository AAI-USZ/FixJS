function addRefreshFunctions(classPrototype){
	//if(classPrototype.refresh === undefined) classPrototype.refresh = refresh;
	if(classPrototype.on === undefined) classPrototype.on = on;
	if(classPrototype.once === undefined) classPrototype.once = once;
	if(classPrototype.off === undefined) classPrototype.off = off;
	if(classPrototype.emit === undefined) classPrototype.emit = emit;
	/*if(classPrototype.doRefresh === undefined) classPrototype.doRefresh = u.doRefresh;
	if(classPrototype.listenForRefresh === undefined){
		classPrototype.listenForRefresh = listenForRefresh;
		classPrototype.onChange = listenForRefresh;
	}
	if(classPrototype.removeListener === undefined) classPrototype.removeListener = removeListener;
	*/
}