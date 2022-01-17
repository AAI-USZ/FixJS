function convertJsonToEdits(dbSchema, type, json){
	//_.errout('TODO')
	_.assertLength(arguments, 3);
	_.assertObject(json);
	
	var edits = []
	
	var t = dbSchema[type];
	var allProperties = []
	function getProperties(t){
		Object.keys(t.properties).forEach(function(key){
			var p = t.properties[key]
			allProperties.push(p)
		})
		Object.keys(t.superTypes).forEach(function(sn){
			var st = dbSchema[sn]
			if(st) getProperties(st)
		})
	}
	getProperties(t)
	
	var taken = {};
	_.each(allProperties, function(p){
		var name = p.name;
		var pv = json[name];
		taken[name] = true;
		
		if(pv !== undefined && pv !== null){
			
			edits.push({op: 'selectProperty', edit: {typeCode: p.code}})
			
			if(p.type.type === 'primitive'){
				var v = valueOrId(pv);
				assertPrimitiveType(v,p.type.primitive, p.name);
				var ts = getTypeSuffix(p.type.primitive)
				edits.push({op: 'set'+ts,  edit: {value: v}})
			}else if(p.type.type === 'map'){

				if(_.size(pv) > 0){
					var ts = getTypeSuffix(p.type.key)
					var next = 'select'+ts+'Key'
					_.each(pv, function(value, key){
						if(value != undefined){
							edits.push({op: next, edit: {key: primitiveCast(key,p.type.key)}})
							edits.push({op: 'put'+ts, edit: {value: value}})
							next = 'reselect'+ts+'Key'
						}
					});
					console.log('json map ascend1')
					edits.push({op: 'ascend1', edit: {}})
				}
			}else if(p.type.type === 'set'){
				if(p.type.members.type === 'primitive'){
					_.each(pv, function(value){
						var v = valueOrId(value);
						assertPrimitiveType(v,p.type.members.primitive);
						var ts = getTypeSuffix(p.type.members.primitive)
						edits.push({op: 'add'+ts, edit: {value: v}})
					});
				}else{
					/*var types = recursivelyGetLeafTypes(dbSchema[p.type.members.object], dbSchema);
					if(types.length !== 1) _.errout('TODO support type polymorphism in JSON'); 
					var actualType = dbSchema[types[0]];*/
					
					_.each(pv, function(value){
						edits.push({op: 'addExisting', edit: {id: valueOrId(value)}})
					});
				}
			}else if(p.type.type === 'list'){
				if(p.type.members.type === 'primitive'){
					_.each(pv, function(value){
						if(value === undefined) _.errout('invalid data for property ' + p.name + ': ' + JSON.stringify(pv));
						var v = valueOrId(value);
						assertPrimitiveType(v,p.type.members.primitive);
						var ts = getTypeSuffix(p.type.members.primitive)
						edits.push({op: 'add'+ts, edit: {value: v}})
					});
				}else{
					//var types = recursivelyGetLeafTypes(dbSchema[p.type.members.object], dbSchema);
					//if(types.length !== 1) _.errout('TODO support type polymorphism in JSON'); 
					//var actualType = dbSchema[types[0]];
				
					_.each(pv, function(value){
						edits.push({op: 'addExisting', edit: {id: valueOrId(value)}})
					});
				}
			}else if(p.type.type === 'object'){
				if(_.isInteger(pv)){
					edits.push({op: 'setObject', edit: {id: pv}})
				}else{
					var typeCode = dbSchema[p.type.object].code;
					edits.push({op: 'setObject', edit: {id: pv._internalId()}})
				}
			}else{
				_.errout('TODO: ' + p.type.type + ' (' + name + ')');
			}
			console.log('json property ascend1')
			edits.push({op: 'ascend1', edit: {}})
		}
	});

	_.each(json, function(value, attr){
		if(!taken[attr]){
			_.errout('unprocessed json attribute: ' + attr + '(' + value + ')');
		}
	});
	
	edits.forEach(function(e){
		e.editId = -2
	})
	//return obj;
	return edits
}