function(
		mid,		  //(commonjs.moduleId, optional) list of modules to be loaded before running factory
		dependencies, //(array of commonjs.moduleId, optional)
		factory		  //(any)
	){
		///
		// Advises the loader of a module factory. //Implements http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition.
		///
		//note
		// CommonJS factory scan courtesy of http://requirejs.org

		var arity = arguments.length,
			defaultDeps = ["require", "exports", "module"],
			// the predominate signature...
			args = [0, mid, dependencies];
		if(arity==1){
			args = [0, (isFunction(mid) ? defaultDeps : []), mid];
		}else if(arity==2 && isString(mid)){
			args = [mid, (isFunction(dependencies) ? defaultDeps : []), dependencies];
		}else if(arity==3){
			args = [mid, dependencies, factory];
		}

		if(has("dojo-amd-factory-scan") && args[1]===defaultDeps){
			args[2].toString()
				.replace(/(\/\*([\s\S]*?)\*\/|\/\/(.*)$)/mg, "")
				.replace(/require\(["']([\w\!\-_\.\/]+)["']\)/g, function (match, dep){
				args[1].push(dep);
			});
		}

		req.trace("loader-define", args.slice(0, 2));
		var targetModule = args[0] && getModule(args[0]),
			module;
		if(targetModule && !waiting[targetModule.mid]){
			// given a mid that hasn't been requested; therefore, defined through means other than injecting
			// consequent to a require() or define() application; examples include defining modules on-the-fly
			// due to some code path or including a module in a script element. In any case,
			// there is no callback waiting to finish processing and nothing to trigger the defQ and the
			// dependencies are never requested; therefore, do it here.
			injectDependencies(defineModule(targetModule, args[1], args[2]));
		}else if(!has("ie-event-behavior") || !has("host-browser") || injectingCachedModule){
			// not IE path: anonymous module and therefore must have been injected; therefore, onLoad will fire immediately
			// after script finishes being evaluated and the defQ can be run from that callback to detect the module id
			defQ.push(args);
		}else{
			// IE path: possibly anonymous module and therefore injected; therefore, cannot depend on 1-to-1,
			// in-order exec of onLoad with script eval (since it's IE) and must manually detect here
			targetModule = targetModule || injectingModule;
			if(!targetModule){
				for(mid in waiting){
					module = modules[mid];
					if(module && module.node && module.node.readyState === 'interactive'){
						targetModule = module;
						break;
					}
				}
				if(has("dojo-combo-api") && !targetModule){
					for(var i = 0; i<combosPending.length; i++){
						targetModule = combosPending[i];
						if(targetModule.node && targetModule.node.readyState === 'interactive'){
							break;
						}
						targetModule= 0;
					}
				}
			}
			if(has("dojo-combo-api") && isArray(targetModule)){
				injectDependencies(defineModule(getModule(targetModule.shift()), args[1], args[2]));
				if(!targetModule.length){
					combosPending.splice(i, 1);
				}
			}else if(targetModule){
				consumePendingCacheInsert(targetModule);
				injectDependencies(defineModule(targetModule, args[1], args[2]));
			}else{
				signal(error, makeError("ieDefineFailed", args[0]));
			}
			checkComplete();
		}
	}