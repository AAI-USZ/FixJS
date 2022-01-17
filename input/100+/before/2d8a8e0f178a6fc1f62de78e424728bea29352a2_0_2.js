function (cfg, currCfg) {
			var newCfg, pluginCfgs;

			newCfg = beget(currCfg, cfg);

			function getOrFailIfClobbered (prop, fallback) {
				if (prop in cfg && prop in currCfg) throw new Error('can\'t override ' + prop);
				return newCfg[prop] || fallback;
			}

			// set defaults and convert from closure-safe names
			newCfg.baseUrl = getOrFailIfClobbered('baseUrl', '');
			newCfg.pluginPath = getOrFailIfClobbered('pluginPath', 'curl/plugin');

			// create object to hold path map.
			// each plugin and package will have its own pathMap, too.
			newCfg.pathMap = beget(currCfg.pathMap);
			pluginCfgs = newCfg.plugins = beget(currCfg.plugins, cfg['plugins']);

			// temporary arrays of paths. this will be converted to
			// a regexp for fast path parsing.
			newCfg.pathList = [];

			// normalizes path/package info and places info on either
			// the global cfg.pathMap or on a plugin-specific altCfg.pathMap.
			// also populates a pathList on cfg or plugin configs.
			function fixAndPushPaths (coll, isPkg) {
				var id, pluginId, data, parts, currCfg, info;
				for (var name in coll) {
					data = coll[name];
					// grab the package id, if specified. default to
					// property name.
					data.name = data['id'] || data['name'] || name;
					currCfg = newCfg;
					// don't remove `|| name` since data may be a string, not an object
					parts = pluginParts(removeEndSlash(data.name || name));
					id = parts.resourceId;
					pluginId = parts.pluginId;
					if (pluginId) {
						// plugin-specific path
						currCfg = pluginCfgs[pluginId];
						if (!currCfg) {
							currCfg = pluginCfgs[pluginId] = beget(newCfg);
							currCfg.pathMap = beget(newCfg.pathMap);
							currCfg.pathList = [];
						}
						// remove plugin-specific path from coll
						delete coll[name];
					}
					if (isPkg) {
						info = normalizePkgDescriptor(data);
					}
					else {
						info = { path: removeEndSlash(data) };
					}
					info.specificity = id.split('/').length;
					if (id) {
						currCfg.pathMap[id] = info;
						currCfg.pathList.push(id);
					}
					else {
						// naked plugin name signifies baseUrl for plugin
						// resources. baseUrl could be relative to global
						// baseUrl.
						currCfg.baseUrl = core.resolveUrl(data, newCfg);
					}
				}
			}

			// adds the path matching regexp onto the cfg or plugin cfgs.
			function convertPathMatcher (cfg) {
				var pathMap = cfg.pathMap;
				cfg.pathRx = new RegExp('^(' +
					cfg.pathList.sort(function (a, b) { return pathMap[a].specificity < pathMap[b].specificity; } )
						.join('|')
						.replace(/\/|\./g, '\\$&') +
					')(?=\\/|$)'
				);
				delete cfg.pathList;
			}

			// fix all new paths and packages
			fixAndPushPaths(cfg['paths'], false);
			fixAndPushPaths(cfg['packages'], true);

			// create search regex for each path map
			for (var p in pluginCfgs) {
				var pathList = pluginCfgs[p].pathList;
				if (pathList) {
					pluginCfgs[p].pathList = pathList.concat(newCfg.pathList);
					convertPathMatcher(pluginCfgs[p]);
				}
			}
			convertPathMatcher(newCfg);
			core.checkPreloads(cfg);

			return newCfg;

		}