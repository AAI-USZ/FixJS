function getElementsBy_ClassName_Tag(classes, tag, resultKeys, resultArray, onlyOne) {
	var el = this,
		result,
		nodes,
		node,
		i = -1;

	if(tag)tag = tag.toUpperCase();

	if(classes) {
		classes = classes.replace(RE__querySelector__dottes, " ");
		
		_shim_getElementsByClassName["tagName"] = tag;
		nodes = _shim_getElementsByClassName.call(el, classes)
		tag = void 0;
	}
	else {
		if(el.nodeType === 9 && tag === "BODY")nodes = [el.body];
		else nodes = el.getElementsByTagName(tag || "*");
			
		tag = void 0;
	}

	if(!tag && !resultKeys && !resultArray)return nodes;

	result = resultArray || [];

	while(node = nodes[++i]) {
		if((!tag || node.tagName === tag) && (!resultKeys || !((node.sourceIndex || (node.sourceIndex = ++UUID)) in resultKeys))) {
			resultKeys && (resultKeys[node.sourceIndex] = true);
			result.push(node);

			if(onlyOne)return result;
		}
	}
		
	return result;
}