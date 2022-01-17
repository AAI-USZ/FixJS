function(position, html) {
		var	ref = this,
			container = ref.ownerDocument.createElement("_"),
			nodes,
			translate = {
				"beforebegin" : "before",
				"afterbegin" : "prepend",
				"beforeend" : "append",
				"afterend" : "after"
			},
			func;

		container.innerHTML = html;
		nodes = container.childNodes;

		if(nodes && nodes.length && 
			(func = ref[translate[position]])) {
			func.apply(this, nodes)
		}

		nodes = container = void 0;
	}