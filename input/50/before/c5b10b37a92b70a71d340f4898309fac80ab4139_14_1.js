function(name){
		//console.log('preparing: ' + name)
		var p = s.typeSchema.properties[name];
		var v = s.property(name);
		v.prepare();
		s[name] = v;
		
	}