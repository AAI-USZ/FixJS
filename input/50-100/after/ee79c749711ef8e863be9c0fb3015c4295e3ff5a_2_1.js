function(parentContext) {
		
		//keep an reference to the loaded modules, in case there are further operations to be done
		var moduleInstances = {};
		
		return {
			/*
			 * load the given module classes. Accepts a list of classes (functions) to be initiated. 
			 * when initiating a module class, parent context will be passed as a constructor argument. 
			 */
			load : function(modules) {
				for ( key in modules) {
					var ModuleClass = modules[key];
					moduleInstances[key] = new ModuleClass(parentContext); // initializes the module
				}
			},
		};
		
	}