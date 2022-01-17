function(config, booting, referenceModule){
				for(var p in config){
					if(p=="waitSeconds"){
						req.waitms = (config[p] || 0) * 1000;
					}
					if(p=="cacheBust"){
						cacheBust = config[p] ? (isString(config[p]) ? config[p] : (new Date()).getTime() + "") : "";
					}
					if(p=="baseUrl" || p=="combo"){
						req[p] = config[p];
					}
					if(has("dojo-sync-loader") && p=="async"){
						// falsy or "sync" => legacy sync loader
						// "xd" => sync but loading xdomain tree and therefore loading asynchronously (not configurable, set automatically by the loader)
						// "legacyAsync" => permanently in "xd" by choice
						// "debugAtAllCosts" => trying to load everything via script injection (not implemented)
						// otherwise, must be truthy => AMD
						// legacyMode: sync | legacyAsync | xd | false
						var mode = config[p];
						req.legacyMode = legacyMode = (isString(mode) && /sync|legacyAsync/.test(mode) ? mode : (!mode ? "sync" : false));
						req.async = !legacyMode;
					}
					if(config[p]!==hasCache){
						// accumulate raw config info for client apps which can use this to pass their own config
						req.rawConfig[p] = config[p];
						p!="has" && has.add("config-"+p, config[p], 0, booting);
					}
				}

				// make sure baseUrl exists
				if(!req.baseUrl){
					req.baseUrl = "./";
				}
				// make sure baseUrl ends with a slash
				if(!/\/$/.test(req.baseUrl)){
					req.baseUrl += "/";
				}

				// now do the special work for has, packages, packagePaths, paths, aliases, and cache

				for(p in config.has){
					has.add(p, config.has[p], 0, booting);
				}

				// for each package found in any packages config item, augment the packs map owned by the loader
				forEach(config.packages, fixupPackageInfo);

				// for each packagePath found in any packagePaths config item, augment the packs map owned by the loader
				for(baseUrl in config.packagePaths){
					forEach(config.packagePaths[baseUrl], function(packageInfo){
						fixupPackageInfo(packageInfo, baseUrl + "/");
					});
				}

				// push in any paths and recompute the internal pathmap
				// warning: this cann't be done until the package config is processed since packages may include path info
				computeMapProg(mix(paths, config.paths), pathsMapProg);

				// aliases
				forEach(config.aliases, function(pair){
					if(isString(pair[0])){
						pair[0] = new RegExp("^" + pair[0].replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, function(c){return "\\" + c;}) + "$");
					}
					aliases.push(pair);
				});

				// mix any packageMap config item and recompute the internal packageMapProg
				computeMapProg(mix(packageMap, config.packageMap), packageMapProg);


				for(p in config.config){
					var module = getModule(p, referenceModule);
					module.config = mix(module.config || {}, config.config[p]);
				}

				// push in any new cache values
				if(config.cache){
					consumePendingCacheInsert();
					pendingCacheInsert = config.cache;
					if(config.cache["*noref"]){
						consumePendingCacheInsert();
					}
				}

				signal("config", [config, req.rawConfig]);
			}