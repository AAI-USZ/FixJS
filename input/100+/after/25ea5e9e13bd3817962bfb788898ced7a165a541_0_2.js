function(id, dependencies, definition){
		if(typeof id !== strType){
			throw "Module id missing or not a string.";
		}

		//no dependencies array, it's actually the definition
		if(!definition && dependencies){
			definition = dependencies;
			dependencies = nil;
		}

		if(!definition){
			throw "Module " + id + " is missing a definition.";
		}

		if(definition instanceof funcType){
			if(dependencies === nil || dependencies instanceof arrType){
				definitions[id] = {def: definition, dep: dependencies};
			}else{
				throw 'Invalid dependencies for module ' + id;
			}
		}else{
			modules[id] = definition;
		}
	}