function setProperties(obj,map){
		for(var key in map){
			var value=map[key];
			obj[key]=value;
		}
	}