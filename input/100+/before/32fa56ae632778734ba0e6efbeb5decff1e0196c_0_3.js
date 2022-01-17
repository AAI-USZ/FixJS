function(plugin) {
					var normalizedDef, fullId, dynamic;

					dynamic = plugin['dynamic'];
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
					if (!(fullId in cache)) {

						// because we're using resId, plugins, such as wire!,
						// can use paths relative to the resource
						normalizedDef = core.createPluginDef(resCfg, fullId, isPreload, resId);

						// don't cache non-determinate "dynamic" resources (or non-existent resources)
						if (!dynamic) {
							cache[fullId] = normalizedDef;
						}

						// curl's plugins prefer to receive a deferred,
						// but to be compatible with AMD spec, we have to
						// piggy-back on the callback function parameter:
						var loaded = function (res) {
							normalizedDef.resolve(res);
							if (!dynamic) cache[fullId] = res;
						};
						loaded['resolve'] = loaded;
						loaded['reject'] = normalizedDef.reject;

						// load the resource!
						plugin.load(resId, normalizedDef.require, loaded, resCfg);

					}

					// chain defs (resolve when plugin.load executes)
					if (tempDef != normalizedDef) {
						when(normalizedDef, tempDef.resolve, tempDef.reject, tempDef.progress);
					}

				}