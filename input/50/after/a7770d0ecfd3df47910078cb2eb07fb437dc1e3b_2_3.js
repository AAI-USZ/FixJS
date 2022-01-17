function(key) {
		return (["plugins", plugin.manifest.name].concat(key ? key : [])).join(".");
	}