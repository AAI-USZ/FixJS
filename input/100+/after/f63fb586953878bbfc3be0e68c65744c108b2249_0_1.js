function process(name, requestId){
		console.log(name, requestId);
		var module = modules[name],
			//manage the process chain per request call since it's async
			pid = processing[requestId],
			dependencies;

		if(module)
			return module;

		if(!pid)
			pid = {length: 0};
		else if(pid[name]){
			var chain = '',
				p;

			for(p in pid){
				if(p != 'length')
					chain += p + '->';
			}

			throw "circular dependency: " + chain + name;
		}

		pid[name] = true;
		pid.length++;
		processing[requestId] = pid;
		module = definitions[name];

		if(module.dep instanceof arrType){
			dependencies = [];

			for(var x = 0, y = module.dep.length; x < y; x++){
				dependencies[x] = process(module.dep[x], requestId);
			}
		}

		modules[name] = module = module.def.apply(context, dependencies);
		delete definitions[name];
		delete pid[name];
		pid.length--;

		if(!pid.length)
			delete processing[requestId];

		return module;
	}