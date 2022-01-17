function(node, state) {
	state = state || {};
	var name = node.nodeName,
		ns = node.getAttribute('ns') || implicitNamespaces[name] || 'Ti.UI',
		req = node.getAttribute('require'),
		id = node.getAttribute('id') || state.defaultId || req || exports.generateUniqueId();

	ns = ns.replace(/^Titanium\./, 'Ti');
	node.setAttribute('id', id);
	if (state.defaultId) { delete state.defaultId; }
	
	return {
		ns: ns,
		id: id, 
		fullname: ns + '.' + name,
		req: req,
		symbol: exports.generateVarName(id),
		classes: node.getAttribute('class').split(' ') || [],	
		parent: state.parent || {},
	};
}