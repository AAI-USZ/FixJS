function() {
	// Possibly returns a false positive in Safari 3.2?
	return !!document.createElementNS && /SVG/.test(Object.prototype.toString.call(document.createElementNS(npf.userAgent.Support.Ns.SVG, 'clipPath')));
}