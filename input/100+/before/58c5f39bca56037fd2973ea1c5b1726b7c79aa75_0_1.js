function(module, strict){
			// run the dependency vector, then run the factory for module
			if(module.executed === executing){
				req.trace("loader-circular-dependency", [circleTrace.concat(mid).join("->")]);
				return (!module.def || strict) ? abortExec :  (module.cjs && module.cjs.exports);
			}
			// at this point the module is either not executed or fully executed


			if(!module.executed){
				if(!module.def){
					return abortExec;
				}
				var mid = module.mid,
					deps = module.deps || [],
					arg, argResult,
					args = [],
					i = 0;

				if(has("dojo-trace-api")){
					circleTrace.push(mid);
					req.trace("loader-exec-module", ["exec", circleTrace.length, mid]);
				}

				// for circular dependencies, assume the first module encountered was executed OK
				// modules that circularly depend on a module that has not run its factory will get
				// the premade cjs.exports===module.result. They can take a reference to this object and/or
				// add properties to it. When the module finally runs its factory, the factory can
				// read/write/replace this object. Notice that so long as the object isn't replaced, any
				// reference taken earlier while walking the deps list is still valid.
				module.executed = executing;
				while(i < deps.length){
					arg = deps[i++];
					argResult = ((arg === cjsRequireModule) ? createRequire(module) :
									((arg === cjsExportsModule) ? module.cjs.exports :
										((arg === cjsModuleModule) ? module.cjs :
											execModule(arg, strict))));
					if(argResult === abortExec){
						module.executed = 0;
						req.trace("loader-exec-module", ["abort", mid]);
						has("dojo-trace-api") && circleTrace.pop();
						return abortExec;
					}
					args.push(argResult);
				}
				runFactory(module, args);
				finishExec(module);
			}
			// at this point the module is guaranteed fully executed

			has("dojo-trace-api") && circleTrace.pop();
			return module.result;
		}