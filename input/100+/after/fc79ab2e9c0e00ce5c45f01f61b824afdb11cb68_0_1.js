function() {
		var node = {
			"_type": tagName
		};
		for (i in allAttrs) {
			node[allAttrs[i]] = $(this).attr(allAttrs[i]);
			//node[allAttrs[i]=="interface"?"nodeInterface":allAttrs[i]] = $(this).attr(allAttrs[i]);
		}
		var newTree = tree + ">" + tagName;
		if (node.id) {
			newTree += "#" + node.id;
		}
		parser.parseAttributes(this,node);
		parser.parseContent(this,node);
		for (i in allTags) {
			node[allTags[i]] = parser.createNode(this,allTags[i],node,newTree);
		}
		nodes.push(node);
		if (tagName == "ncl") {
			parser.parseNCL(node,tagName,parentNode,tree);
		} else {
			// TODO check why tagName[0] is undefined
			if (tagName[0]){
				parser["parse"+tagName[0].toUpperCase()+tagName.slice(1,tagName.length)](node,tagName,parentNode,tree);
			}
		}
	}