function(bases, name, advice){
			var i = bases.length - 1, r = [], b, f, around = advice == "f";
			for(; i >= 0; --i){
				b = bases[i];
				// next line contains 5 intentional assignments
				if((f = b._m) ? (f = f.h).hasOwnProperty(name) && (isSuper(f = f[name]) ? (around ? f.f : (f = f[advice])) : around) : around && (f = b[pname][name]) && f !== empty[name]){
					r.push(f);
				}
			}
			return r;
		}