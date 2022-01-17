function(dst, src){
		for(var name in src){
			if(name.substr(0, 2).toLowerCase() == "on"){
				dst[name] = src[name];
				src[name] = null;
			}
		}
	}