function(id, dependencies, definition){
		if(typeof id !== strType){
			throw "module id missing or not a string";
		}

		//no dependencies array, it's actually the definition
		if(!definition && dependencies){
			definition = dependencies;
			dependencies = nil;
		}

		if(!definition){
			throw "module " + id + " is missing a definition";
		}

		if(definition instanceof funcType){
			definitions[id] = {def: definition, dep: dependencies};
		}else{
			modules[id] = definition;
		}
	}