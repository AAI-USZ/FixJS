function loadConfFiles(files) {
	var confDir = path.join(ROOT_DIR, CONF_DIR);
	return merge.recursive.apply(merge,
		files.map(function(file) {
			var contents;
			try {
				contents = require(path.join(confDir, file + '.json'));
			} catch (e) {
				contents = { };
			}
			return contents;
		})
	);
}