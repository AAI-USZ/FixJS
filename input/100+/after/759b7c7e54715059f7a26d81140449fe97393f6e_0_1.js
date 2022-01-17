function(definition){
    				return(definition.name.search(target, "i") != -1 && definition['with'] && definition['with'].search(name, "i") != -1);
				}