function() {
	return !!document.createElementNS && /SVG/.test(Object.prototype.toString.call(document.createElementNS(npf.userAgent.Support.Ns.SVG, 'animate')));
}