function(referenceModule, mids){
				// defQ is an array of [id, dependencies, factory]
				// mids (if any) is a vector of mids given by a combo service
				consumePendingCacheInsert(referenceModule);
				var definedModules = [],
					module, args;
				while(defQ.length){
					args = defQ.shift();
					mids && (args[0]= mids.shift());
					// explicit define indicates possible multiple modules in a single file; delay injecting dependencies until defQ fully
					// processed since modules earlier in the queue depend on already-arrived modules that are later in the queue
					// TODO: what if no args[0] and no referenceModule
					module = args[0] && getModule(args[0]) || referenceModule;
					definedModules.push(defineModule(module, args[1], args[2]));
				}
				forEach(definedModules, injectDependencies);
			}