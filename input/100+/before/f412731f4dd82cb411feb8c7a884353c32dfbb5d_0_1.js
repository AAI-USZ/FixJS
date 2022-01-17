function(data, rootEl, itemPrototypeSelector, conf) {
	var p = rootEl.querySelector(itemPrototypeSelector),
		bindScope = p.getAttribute('bindScope');
		
	for (var i = 0; i < data.length; i++) {
		var c = p.cloneNode(true);
		
		UI.bindFields(c, data[i]);
		
		p.parentNode.appendChild(c);
		
		UTIL.signal(conf.render, [ data[i], c, i, data ]);
	}
	
	p.parentNode.removeChild(p);
}