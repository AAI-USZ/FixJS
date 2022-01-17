function (path, cfg) {
			var baseUrl = cfg.baseUrl;
			return baseUrl && !absUrlRx.test(path) ? joinPath(baseUrl, path) : path;
		}