function(args, ctor){
		// decorate all methods with necessary nom/ctr variables
		var bases = ctor._m.b, i = bases.length - 1, base, meta, name, f;
		for(; i >= 0; --i){
			base = bases[i];
			if((meta = base._m)){ // intentional assignment
				meta = meta.h;
				for(name in meta){
					f = meta[name];
					if(typeof f == "function"){
						if(f.nom === name){ break; }
						f.ctr = base;
						f.nom = name;
					}
				}
			}
		}
		ctor.prototype.inherited = inherited;
	}