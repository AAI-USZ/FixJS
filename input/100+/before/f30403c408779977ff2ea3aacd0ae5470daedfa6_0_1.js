function(moduleIdentifier) {
				var loadingBundlesCallbacks;
                if (!/^\//.test(moduleIdentifier)) {
                    moduleIdentifier = "/" + libPath + moduleIdentifier;
                }
				moduleIdentifier = packageIdentifier + moduleIdentifier;
				if (!initializedModules[moduleIdentifier]) {
					/*DEBUG*/ if (!moduleInitializers[moduleIdentifier]) {
					/*DEBUG*/ 	throw new Error("Module '" + moduleIdentifier + "' not found in sandbox '" + sandbox.id + "'!");
					/*DEBUG*/ }
					(initializedModules[moduleIdentifier] = Module(moduleIdentifier)).load();
				}
				if (loadingBundles[moduleIdentifier]) {
					loadingBundlesCallbacks = loadingBundles[moduleIdentifier];
					delete loadingBundles[moduleIdentifier];
					for (i=0;i<loadingBundlesCallbacks.length;i++) {
						loadingBundlesCallbacks[i](sandbox);
					}
				}
				return initializedModules[moduleIdentifier];
			}