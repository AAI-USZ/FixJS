function(ancestor) {
		return ancestor.nodeType == $_.Node.ELEMENT_NODE
			&& $_.getComputedStyle(ancestor).display == "none";
	}