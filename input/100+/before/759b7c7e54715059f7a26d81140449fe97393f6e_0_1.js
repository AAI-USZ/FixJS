function(name, target){
			if(target != undefined){
				var results = definitions.filter(function(definition){
					return(definition.name.search(name, "i") != -1 && definition['with'] && definition['with'].search(target, "i") != -1);
				});
				if(results.length != 0){
                    return results;
				}
			}
            
			var results = definitions.filter(function(definition){
				return(definition.name.search(name, "i") != -1 && definition['with'] == undefined);
			});

			return results;
		}