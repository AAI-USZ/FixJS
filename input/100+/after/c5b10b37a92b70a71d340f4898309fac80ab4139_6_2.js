function(key){
			var idOrValue = local.obj[key];
			if(typeof(idOrValue) === 'number'){
				var a = local.apiCache[idOrValue];
				if(a === undefined) a = local.getObjectApi(id);
				cb(key, a);
			}else{
				_.errout('TODO: ' + JSON.stringify(local.schema));
			}
		}