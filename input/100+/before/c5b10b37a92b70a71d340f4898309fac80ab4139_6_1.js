function(cb){
	if(this.schema.type.value.type === 'primitive'){
		var local = this;
		Object.keys(this.obj).forEach(function(key){
			var value = local.obj[key];
			cb(key, value);
		})
	}else{
		var local = this;
		Object.keys(this.obj).forEach(function(key){
			var idOrValue = local.obj[key];
			if(typeof(idOrValue) === 'number'){
				var a = this.apiCache[idOrValue];
				if(a === undefined) a = this.getObjectApi(id);
				cb(key, a);
			}else{
				_.errout('TODO');
			}
		})
		
	}
}