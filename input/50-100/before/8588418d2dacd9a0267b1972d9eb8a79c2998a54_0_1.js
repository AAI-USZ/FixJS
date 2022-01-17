function defaultAttr(elem, to) {
		// to: true - default attribute for setting data value on HTML element; false: default attribute for getting value from HTML element
		// Merge in the default attribute bindings for this target element
		var attr = jsv.merge[elem.nodeName.toLowerCase()];
		return attr
		? (to
			? attr.to.toAttr
			: attr.from.fromAttr)
		: to
			? "text" // Default is to bind to innerText. Use html{:...} to bind to innerHTML
			: ""; // Default is not to bind from
	}