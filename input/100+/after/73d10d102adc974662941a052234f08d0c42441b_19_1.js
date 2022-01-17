function (nodePath) {
		// NOTE: this doesn't use the parent element, so "contributor/name" and "names/name"
		//       would *both* be leaf nodes if "name" is given
		var result = false,
			path = nodePath.split("/");
		$.each(leafNodes, function (i, leafNode) {
			if (path.indexOf(leafNode) !== -1) {
				result = true;
				return false;
			}
		});
		return result;
	}