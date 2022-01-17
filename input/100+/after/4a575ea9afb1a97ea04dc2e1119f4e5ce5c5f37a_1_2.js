function(args, ctor){
		// validate that chaining is consistent
		var meta = ctor._m, weaver = meta.w, bases = meta.b,
			name, chain, base, i, c;
		for(name in weaver){
			chain = (+weaver[name] || 0);
			for(i = bases.length - 1; i >= 0; --i){
				base = bases[i];
				meta = base._m;
				if(meta){
					c = (+meta.w[name] || 0);
					if(chain != c && (!chain || c)){
						dcl._e("chain", name, ctor, chain, base, c);
					}
				}
			}
		}
	}