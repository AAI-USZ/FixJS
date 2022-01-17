function(modules) {
				for ( i in modules) {
					var ModuleClass = modules[i];
					moduleInstances.push(new ModuleClass(globalContext)); // initializes the module
				}
			}