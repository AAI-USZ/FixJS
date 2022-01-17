function (tree) {
		if (!tree.children) return 0;
		var maxChildDepth = 0;
		for (var i = 0; i < tree.children.length; i++) {
			var childDepth = convert.getDepth(tree.children[i]);
			maxChildDepth = Math.max(maxChildDepth, childDepth);
		}
		return maxChildDepth + 1;
	}