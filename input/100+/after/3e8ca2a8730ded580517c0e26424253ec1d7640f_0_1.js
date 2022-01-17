function(node, state) {
	state = state || {};
	var name = node.nodeName,
		ns = node.getAttribute('ns') || implicitNamespaces[name] || 'Ti.UI',
		req = node.getAttribute('require'),
		id = node.getAttribute('id') || state.defaultId || req || exports.generateUniqueId(),
		platform = node.getAttribute('platform'),
		platformObj = {};

	ns = ns.replace(/^Titanium\./, 'Ti');
	node.setAttribute('id', id);
	if (state.defaultId) { delete state.defaultId; }

	// process the platform attribute
	if (platform) {
		_.each((platform).split(','), function(p) {
			var matches = U.trim(p).match(/^(\!{0,1})(.+)/);
			if (matches !== null) {
				var negate = matches[1];
				var name = matches[2];
				if (_.contains(PLATFORMS, name)) {
					if (negate === '!') {
						_.each(_.without(PLATFORMS, name), function(n) {
							platformObj[n] = true;
						});
					} else {
						platformObj[name] = true;
					}
					return;
				}
			}
			U.die('Invalid platform type found: ' + p);
		});
	}
	
	return {
		ns: ns,
		id: id, 
		fullname: ns + '.' + name,
		req: req,
		symbol: exports.generateVarName(id),
		classes: node.getAttribute('class').split(' ') || [],	
		parent: state.parent || {},
		platform: !platformObj ? undefined : platformObj
	};
}