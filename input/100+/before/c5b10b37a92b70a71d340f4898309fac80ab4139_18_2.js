function(p){
		var name = p.name;
		var pv = json[name];
		taken[name] = true;
		
		if(pv !== undefined && pv !== null){
			//console.log('t: ' + JSON.stringify(pv));
			if(p.type.type === 'primitive'){
				var v = valueOrId(pv);;
				assertPrimitiveType(v,p.type.primitive, p.name);
				obj[p.code] = v;
			}else if(p.type.type === 'map'){
				var c = collections[p.code];
				if(c === undefined){
					c = collections[p.code] = [];
					//obj.push([p.code, c]);
					obj[p.code] = c;
				}
				_.each(pv, function(value, key){
					if(value != undefined){
						c.push([valueOrId(key), valueOrId(value)]);
					}
				});
			}else if(p.type.type === 'set'){
				//console.log('arg: ' + JSON.stringify(p.type));
				if(p.type.members.type === 'primitive'){
					_.each(pv, function(value){
						var v = valueOrId(value);
						assertPrimitiveType(v,p.type.members.primitive);
						c.push(v);
					});
				}else{
					var types = recursivelyGetLeafTypes(dbSchema[p.type.members.object], dbSchema);
					if(types.length !== 1) _.errout('TODO support type polymorphism in JSON'); 
					var actualType = dbSchema[types[0]];
					
					var arr = c[actualType.code];
					if(arr === undefined) arr = c[actualType.code] = [];

					_.each(pv, function(value){
						arr.push(valueOrId(value));
					});
				}
			}else if(p.type.type === 'list'){
			
				var c = collections[p.code];
				if(c === undefined){
					c = collections[p.code] = [];
					//obj.push([p.code, c]);
					obj[p.code] = c;
				}

				if(p.type.members.type === 'primitive'){
					_.each(pv, function(value){
						if(value === undefined) _.errout('invalid data for property ' + p.name + ': ' + JSON.stringify(pv));
						//_.assertDefined(value);
						var v = valueOrId(value);
						assertPrimitiveType(v,p.type.members.primitive);
						c.push(v);
					});
				}else{
					var types = recursivelyGetLeafTypes(dbSchema[p.type.members.object], dbSchema);
					if(types.length !== 1) _.errout('TODO support type polymorphism in JSON'); 
					var actualType = dbSchema[types[0]];
				
					_.each(pv, function(value){
						c.push(valueOrId(value));
					});
				}
			}else if(p.type.type === 'object'){
				if(_.isInteger(pv)){
					//_.errout('TODO: ' + JSON.stringify(p));
					//var typeCode = dbSchema[p.type.object].code;
					//obj.push([p.code, [typeCode, pv]]);
					obj[p.code] = pv;
				}else{
					var typeCode = dbSchema[p.type.object].code;
					////obj.push([p.code, [typeCode, pv]]);
					obj[p.code] = pv.id()
					//_.errout('TODO: ' + JSON.stringify(pv) + ' (' + name + ')');
				}
			}else{
				_.errout('TODO: ' + p.type.type + ' (' + name + ')');
			}
		}
	}