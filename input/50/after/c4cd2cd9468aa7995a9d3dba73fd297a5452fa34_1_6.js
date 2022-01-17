function() {
	return !!document.createElementNS && /SVGAnimate/.test({}.toString.call(document.createElementNS(npf.userAgent.Support.Ns.SVG, 'animate')));
}