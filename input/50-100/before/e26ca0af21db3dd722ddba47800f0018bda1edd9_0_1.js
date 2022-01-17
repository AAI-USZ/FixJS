function (path, cfg, addExt) {
			var baseUrl = cfg.baseUrl;
			return (baseUrl && !absUrlRx.test(path) ? joinPath(baseUrl, path) : path) + (addExt && !dontAddExtRx.test(path) ? '.js' : '');
		}