function() {
	return !!document.createElementNS && /SVGClipPath/.test({}.toString.call(document.createElementNS(npf.userAgent.Support.Ns.SVG, 'clipPath')));
}