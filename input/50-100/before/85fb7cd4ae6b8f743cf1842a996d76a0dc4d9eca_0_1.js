function () {

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

				}