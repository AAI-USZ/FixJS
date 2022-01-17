function(ancestor) {
		return ancestor.nodeType == Node.ELEMENT_NODE
			&& getComputedStyle(ancestor).display == "none";
	}