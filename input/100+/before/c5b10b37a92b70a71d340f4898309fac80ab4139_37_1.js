function makeFullIncludeFunction(objSchema){
		var funcs = {};
		_.each(objSchema.properties, function(p){
			if(p.type.type === 'object'){
				var os = schema[p.type.object];
				funcs[p.code] = function(entry, addObjectCb, endCb){
					if(_.isInteger(entry[1])){
						//console.log('including ' + JSON.stringify(entry))
						handle.streamObjectState(entry[0], entry[1], function(tc, id, obj){
							//_.assertDefined(obj)
							if(obj === undefined){
								_.errout('got undefined object: ' + tc + ' ' + id);
							}
							addObjectCb(tc,id,obj);
						}, function(){
							endCb();
						});
						return 1;
					}
					return 0;
				}
			}else if(p.type.type === 'list'){
				var os = schema[p.type.members.object];
				funcs[p.code] = function(list, addObjectCb, endCb){
					var manyFound = 0;
					_.each(list, function(listEntry){
						//_.assertArray(listEntry);
						_.assertInt(listEntry);
						if(_.isInteger(listEntry)){
							handle.streamObjectState(listEntry, addObjectCb, endCb);
							++manyFound;
						}
					});
					return manyFound;
				}
			}else if(p.type.type === 'set'){
				var os = schema[p.type.members.object];
				funcs[p.code] = function(map, addObjectCb, endCb){
					var manyFound = 0;
					_.each(map, function(list, typeCodeStr){
						var typeCode = parseInt(typeCodeStr);
						_.each(list, function(v){
							if(_.isInteger(v)){
								handle.streamObjectState(typeCode, v, addObjectCb, endCb);
								++manyFound;
							}
						});
					});
					return manyFound;
				}
			}else{
				if(p.type.type !== 'primitive') _.errout('TODO: ' + JSON.stringify(p));
			}
		});
		var propertyCodes = [];
		_.each(objSchema.properties, function(p, pName){
			propertyCodes.push(p.code);
		});
		return function(id, obj, addObjectCb, endCb){				
			_.assertDefined(obj.meta);
			var remainingCount = 0;
			var finished = false;

			for(var i=0;i<propertyCodes.length;++i){
				var propertyCode = propertyCodes[i];
				var v = obj[propertyCode];
				if(v !== undefined){
					var f = funcs[propertyCode];
					if(f !== undefined){
						var manyToWait = f(v, addObjectCb, function(){
							--remainingCount;
							if(finished && remainingCount === 0){
								endCb();
								endCb = undefined;
							}
						});
						remainingCount += manyToWait;
					}
				}
			}
			finished = true;
			if(remainingCount === 0){
				endCb();
				endCb = undefined;
			}
		}
	}