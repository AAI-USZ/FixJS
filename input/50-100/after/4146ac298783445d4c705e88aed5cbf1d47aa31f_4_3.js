function(klas) {
		klas = new RegExp(klas.replace(RE__getElementsByClassName, STRING_FOR_RE__getElementsByClassName));

		var nodes = this.all,
			node,
			i = -1,
			result = [];

		while(node = nodes[++i]) {
			if(node.className && klas.test(node.className)) {
				result.push(node);
			}
		}

		return result;
	}