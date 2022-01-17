function custom_init(el, data){
		if (!rendering) {
			/*@cc_on el=El.get(el);@*/
			var template, node = el.firstChild;
			if (template = el.getAttribute("data-template")) {
				El.cache.fn[template].call(el, el, data);
				el.removeAttribute("data-template");
			}
			for (; node; node = node.nextSibling) if (node.nodeType == 1) custom_init(node, data);
		}
	}