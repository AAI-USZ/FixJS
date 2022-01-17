function(mq) {
	if (window.matchMedia) {
		return window.matchMedia(mq).matches;
	}

	/** @type {boolean} */
	var bool;

	this._testStyles('@media ' + mq + ' { #' + npf.userAgent.Support.MOD + ' { position: absolute; } }', function(node) {
		bool = (window.getComputedStyle ? window.getComputedStyle(node, null) : node.currentStyle)['position'] == 'absolute';
	});

	return bool;
}