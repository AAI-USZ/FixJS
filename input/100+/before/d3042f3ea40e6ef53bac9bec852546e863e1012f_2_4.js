function(name, path){
				module.exports.stream(name, path);
				if(!aliasString){
					aliasString = name;
				} else {
					aliasString += '.'+name
				}
			}