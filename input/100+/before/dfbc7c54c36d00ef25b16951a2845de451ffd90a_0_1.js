function doRequire(mid, omitModuleCheck){
			var module = getModule(slashName(mid), require.module);
			if(syncExecStack.length && syncExecStack[0].finish){
				// switched to async loading in the middle of evaluating a legacy module; stop
				// applying dojo.require so the remaining dojo.requires are applied in order
				syncExecStack[0].finish.push(mid);
				return undefined;
			}

			// recall module.executed has values {0, executing, executed}; therefore, truthy indicates executing or executed
			if(module.executed){
				return module.result;
			}
			omitModuleCheck && (module.result = nonmodule);

			var currentMode = getLegacyMode();

			// recall, in sync mode to inject is to *eval* the module text
			// if the module is a legacy module, this is the same as executing
			// but if the module is an AMD module, this means defining, not executing
			injectModule(module);

			// in sync mode to dojo.require is to execute
			if(module.executed!==executed && module.injected===arrived){
				// the module was already here before injectModule was called probably finishing up a xdomain
				// load, but maybe a module given to the loader directly rather than having the loader retrieve it
				loaderVars.holdIdle();
				execModule(module);
				loaderVars.releaseIdle();
			}
			if(module.executed){
				return module.result;
			}

			if(currentMode==sync){
				// the only way to get here is in sync mode and dojo.required a module that
				//   * was loaded async in the injectModule application a few lines up
				//   * was an AMD module that had deps that are being loaded async and therefore couldn't execute
				if(module.cjs){
					// the module was an AMD module; unshift, not push, which causes the current traversal to be reattempted from the top
					execQ.unshift(module);
				}else{
					// the module was a legacy module
					syncExecStack.length && (syncExecStack[0].finish= [mid]);
				}
			}else{
				// the loader wasn't in sync mode on entry; probably async mode; therefore, no expectation of getting
				// the module value synchronously; make sure it gets executed though
				execQ.push(module);
			}
			return undefined;
		}