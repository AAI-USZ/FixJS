function(el, target) {
	var rsmEl;
	if ((rsmEl = el.getElementsByTagNameNS(Strophe.NS.RSM, 'set')[0])) {
	    target.rsm = {};
	    var lastEl = rsmEl.getElementsByTagName('last')[0];
	    if (lastEl)
		target.rsm.last = lastEl.textContent;
	}
    }