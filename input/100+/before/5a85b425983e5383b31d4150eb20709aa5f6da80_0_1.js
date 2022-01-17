function(path, paths, fn) {
		if (path.indexOf(cp) != -1) {
			path = classLoader.getResource(path.replace(new RegExp('^.*' + cp), ''));
		} else if (!/^\//.test(path)) {
			path = paths[0] + path;
		}
		if (path != null) {
			new(less.Parser)({ optimization: 3, paths: [String(path).replace(/[\w\.-]+$/, '')] }).parse(readUrl(path, lessenv.charset).replace(/\r/g, ''), function (e, root) {
				fn(root);
				if (e instanceof Object)
					throw e;
			});
		}
	}