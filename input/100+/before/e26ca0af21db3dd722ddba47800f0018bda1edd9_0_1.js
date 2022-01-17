function (id, cfg, isPlugin) {
			// TODO: figure out why this gets called so often for the same file (toUrl?)
			// searches through the configured path mappings and packages
			var pathMap, pathInfo, path, config, found;

			pathMap = cfg.pathMap;

			if (isPlugin && cfg.pluginPath && id.indexOf('/') < 0 && !(id in pathMap)) {
				// prepend plugin folder path, if it's missing and path isn't in pathMap
				// Note: this munges the concepts of ids and paths for plugins,
				// but is generally safe since it's only for non-namespaced
				// plugins (plugins without path or package info).
				id = joinPath(cfg.pluginPath, id);
			}

			if (!absUrlRx.test(id)) {
				path = id.replace(cfg.pathRx, function (match) {

					pathInfo = pathMap[match] || {};
					found = true;
					pkgCfg = pathInfo.config;

					// if pathInfo.main and match == id, this is a main module
					if (pathInfo.main && match == id) {
						return pathInfo.main;
					}
					// if pathInfo.path return pathInfo.path
					else {
						return pathInfo.path || '';
					}

				});
			}
			else {
				path = id;
			}

			return {
				path: path,
				config: pkgCfg || userCfg,
				url: core.resolveUrl(path, cfg, true)
			};
		}