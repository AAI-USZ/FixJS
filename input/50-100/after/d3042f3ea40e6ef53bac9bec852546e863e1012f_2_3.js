function(name, path){
				streamur.stream(name, path);
				if(!aliasString){
					aliasString = name;
				} else {
					aliasString += '.'+name
				}
			}