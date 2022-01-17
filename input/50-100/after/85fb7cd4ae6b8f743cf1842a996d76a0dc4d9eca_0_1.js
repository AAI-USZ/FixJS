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

					// call callback now that the module is defined
					callback(require(resourceId));

				}, callback['error'] || function (ex) { throw ex; }