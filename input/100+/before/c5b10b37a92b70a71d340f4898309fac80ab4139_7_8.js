function propertyToJson(name){
		var p = local.typeSchema.properties[name];
		
		var v = local.obj[p.code];
		if(v === undefined) return;
		
		if(p.type.type !== 'primitive'){
			if(p.type.type === 'list' && p.type.members.type === 'primitive'){
				//just use the e[1]
			}else{
				v = local.property(p.name).toJson();//TODO optimize
			}
		}
		if(v !== undefined){
			obj[p.name] = v;
		}
		
	}