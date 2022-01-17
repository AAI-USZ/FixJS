function(tssFile) {
	if (path.existsSync(tssFile)) {
		var contents = fs.readFileSync(tssFile, 'utf8');
		if (!/^\s*$/.test(contents)) {
			var code = processTssFile(contents);
			var json = JSON.parse(code);
			optimizer.optimizeStyle(json);
			return json;
		}
	}
	return {};
}