function(p, name){
		if(p.type.type !== 'object' || s.hasProperty(name)){
			if(s.isReadonlyAndEmpty){
				s.__defineGetter__(name, emptyReadonlyObjectProperty);
			}else{
				var v = s.property(name);
				s[name] = v;
				v.prepare();
			}
		}
	}