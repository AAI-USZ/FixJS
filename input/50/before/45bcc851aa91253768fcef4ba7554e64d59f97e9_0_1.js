function Sync(model, method, opts) {
	var sync = new TiAppPropertiesSync(model);
	return sync[method](opts);
}