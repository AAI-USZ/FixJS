function process(id, reqId){
		var module = modules[id],
			//manage the process chain per require call since it can be an async call
			pid = processing[reqId],
			dependencies,
			chain = '',
			x = 0,
			y,
			p;

		if(module){
			return module;
		}

		if(!pid){
			pid = {length: 0};
		}else if(pid[id]){
			for(p in pid){
				if(p !== 'length'){
					chain += p + '->';
				}
			}

			throw 'circular dependency: ' + chain + id;
		}

		pid[id] = yes;
		pid.length++;
		processing[reqId] = pid;
		module = definitions[id];

		if(module && module.def){
			if(module.dep instanceof arrType){
				dependencies = [];
				y = module.dep.length;

				for(; x < y; x++){
					dependencies[x] = process(module.dep[x], reqId);
				}
			}

			modules[id] = module = module.def.apply(context, dependencies);
		}else{
			throw 'Module ' + id + ' is not defined.';
		}

		delete definitions[id];
		delete pid[id];
		pid.length--;

		if(!pid.length){
			delete processing[reqId];
		}

		return module;
	}