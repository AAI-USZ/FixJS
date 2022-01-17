function(cb){
	var local = this;
	if(this.schema.type.value.type === 'primitive'){
		if(this.schema.type.key.type === 'primitive'){
			Object.keys(this.obj).forEach(function(key){
				var value = local.obj[key];
				cb(key, value);
			})
		}else{
			if(this.schema.type.key.type === 'object'){
				Object.keys(this.obj).forEach(function(key){
					key = parseInt(key)
					var value = local.obj[key];
					var wrappedKey = local.getObjectApi(key);
					wrappedKey.prepare()
					cb(wrappedKey, value);
				})
			}else{
				_.errout('TODO: ' + JSON.stringify(this.schema.type.key))
			}
		}
	}else if(this.schema.type.value.type === 'set'){
		if(this.schema.type.value.members.type === 'primitive'){
			Object.keys(this.obj).forEach(function(key){
				var value = local.obj[key];
				for(var i=0;i<value.length;++i){
					cb(key, value[i]);
				}
			})
		}else if(this.schema.type.value.members.type === 'object'){
			Object.keys(this.obj).forEach(function(key){
				var value = local.obj[key];
				//console.log('d: ' + JSON.stringify(local.obj))
				//if(value !== undefined){
					for(var i=0;i<value.length;++i){
						var id = value[i]
						_.assertInt(id)
						var a// = local.apiCache[idOrValue];
						if(a === undefined) a = local.getObjectApi(id);
						a.prepare()
						cb(key, a);
						//cb(key, value[i]);
					}
				//}
			})
		}else{
			_.errout('TODO: ' + JSON.stringify(local.schema));
		}
	}else{
		Object.keys(this.obj).forEach(function(key){
			var idOrValue = local.obj[key];
			if(typeof(idOrValue) === 'number'){
				var a = local.apiCache[idOrValue];
				if(a === undefined) a = local.getObjectApi(id);
				cb(key, a);
			}else{
				_.errout('TODO: ' + JSON.stringify(local.schema));
			}
		})
		
	}
}