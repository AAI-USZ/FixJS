function(protEl, data) {
	if (protEl.hasAttribute('bindScope')) {
		var binds = protEl.querySelectorAll('[bindScope=' + protEl.getAttribute('bindScope') + ']');
	} else {
		var binds = protEl.querySelectorAll('[bound]');
	}
	
	if (protEl.hasAttribute('bound'))
		UI.bindElement(protEl, data);
		
	for (var i = 0; i < binds.length; i++) {
		UI.bindElement(binds[i], data);
	}
}