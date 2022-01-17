function (depName, parentDef) {
			var toAbsId, isPreload, parts, mainId, loaderId, pluginId,
				resId, pathInfo, def, tempDef, resCfg;

			toAbsId = parentDef.toAbsId;
			isPreload = parentDef.isPreload;

			// check for plugin loaderId
			parts = pluginParts(depName);
			// resId is not normalized since the plugin may need to do it
			resId = parts.resourceId;

			// get id of first resource to load (which could be a plugin)
			mainId = toAbsId(parts.pluginId || resId);
			pathInfo = core.resolvePathInfo(mainId, userCfg, !!parts.pluginId);

			// get custom module loader from package config if not a plugin
			// TODO: figure out how to make module loaders work with plugins
			if (parts.pluginId) {
				loaderId = mainId;
			}
			else {
				loaderId = pathInfo.config['moduleLoader'];
				if (loaderId) {
					// since we're not using toAbsId, transformers must be absolute
					resId = mainId;
					mainId = loaderId;
					pathInfo = core.resolvePathInfo(loaderId, userCfg);
				}
			}

			// find resource definition
			def = cache[mainId];
			if (!def) {
				def = cache[mainId] = core.createResourceDef(mainId, pathInfo.config, isPreload, pathInfo.path);
				def.url = core.checkToAddJsExt(pathInfo.url);
				core.fetchResDef(def);
			}

			// plugin or transformer
			if (mainId == loaderId) {

				// we need to use depName until plugin tells us normalized id.
				// if the plugin changes the id, we need to consolidate
				// def promises below.  Note: exports objects will be different
				// between pre-normalized and post-normalized defs! does this matter?
				// don't put this resource def in the cache because if the
				// resId doesn't change, the check if this is a new
				// normalizedDef (below) will think it's already being loaded.
				tempDef = /*cache[depName] =*/ core.createResourceDef(depName);

				// note: this means moduleLoaders can store config info in the
				// plugins config, too.
				resCfg = userCfg.plugins[loaderId] || userCfg;

				// wait for plugin resource def
				when(def, function(plugin) {
					var normalizedDef, fullId;

					// check if plugin supports the normalize method
					if ('normalize' in plugin) {
						// dojo/has may return falsey values (0, actually)
						resId = plugin['normalize'](resId, toAbsId, resCfg) || '';
					}
					else {
						resId = toAbsId(resId);
					}

					// use the full id (loaderId + id) to id plugin resources
					// so multiple plugins may each process the same resource
					// resId could be blank if the plugin doesn't require any (e.g. "domReady!")
					fullId = loaderId + '!' + resId;
					normalizedDef = cache[fullId];

					// if this is our first time fetching this (normalized) def
					if (!normalizedDef) {

						// because we're using resId, plugins, such as wire!,
						// can use paths relative to the resource
						normalizedDef = core.createResourceDef(fullId, resCfg, isPreload, resId);

						// don't cache non-determinate "dynamic" resources (or non-existent resources)
						if (!plugin['dynamic']) {
							cache[fullId] = normalizedDef;
						}

						// curl's plugins prefer to receive a deferred,
						// but to be compatible with AMD spec, we have to
						// piggy-back on the callback function parameter:
						var loaded = function (res) {
							normalizedDef.resolve(res);
							if (plugin['dynamic']) delete cache[fullId];
						};
						loaded['resolve'] = loaded;
						loaded['reject'] = normalizedDef.reject;

						// load the resource!
						plugin.load(resId, normalizedDef.require, loaded, resCfg);

					}

					// chain defs (resolve when plugin.load executes)
					if (tempDef != normalizedDef) {
						when(normalizedDef, tempDef.resolve, tempDef.reject);
					}

				}, tempDef.reject);

			}

			// return tempDef if this is a plugin-based resource
			return tempDef || def;
		}