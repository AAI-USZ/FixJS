function(path, paths, fn) {
		if (path.indexOf(cp) != -1) {
			var resource = classLoader.getResource(path.replace(new RegExp('^.*' + cp), ''));
			if (lessenv.css && resource === null) {
				path = classLoader.getResource(path.replace(new RegExp('^.*' + cp), '').replace(/\.less$/, '.css'));
			} else {
				path = resource;
			}
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