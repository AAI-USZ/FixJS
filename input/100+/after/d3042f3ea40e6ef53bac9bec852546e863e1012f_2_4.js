function(name, alias){
	
	if(typeof alias === 'string'){
		
		if(aliases[name]){
			throw "Alias with name "+name+" already exists";
		}
		
		if(streams[name] || processors[name]){
			throw name+" cannot be used as an alias: it is already a stream or a processor.";
		}
		var segs = alias.split('.');
		for(var i=0; i<segs.length; i++){
			if(!streams[segs[i]] && !processors[segs[i]] && !aliases[segs[i]]){
				throw "Segment "+segs[i]+" part of alias "+alias+" is not a valid stream, processor or alias.";
			}
		}
		aliases[name]=alias;
	} else if(typeof alias === 'function'){
		var aliasString;
		var ref = {
			stream: function(name, path){
				streamur.stream(name, path);
				if(!aliasString){
					aliasString = name;
				} else {
					aliasString += '.'+name
				}
			}
		};
		alias(ref);
		streamur.alias(name, aliasString);
	} else {
		throw alias+" is not a valid alias";
	}
}