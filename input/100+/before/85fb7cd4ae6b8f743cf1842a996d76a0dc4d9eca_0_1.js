function (resourceId, require, loaded, config) {
			// TODO: extract xhr from text! plugin and use that instead?
			require(['text!' + resourceId + '.js', 'curl/_privileged'], function (source, priv) {
				var moduleMap;

				// find (and replace?) dependencies
				moduleMap = priv['core'].extractCjsDeps(source);
				//source = parseDepModuleIds(source, moduleMap, config.replaceRequires);

				// get deps
				require(moduleMap, function () {

					// wrap source in a define
					source = wrapSource(source, resourceId, config['injectSourceUrl'] !== false && require.toUrl(resourceId));

					if (config['injectScript']) {
						injectScript(source);
					}
					else {
						//eval(source);
						globalEval(source);
					}

					// call loaded now that the module is defined
					loaded(require(resourceId));

				});

			});
		}