function(ctor, name){
			var m = ctor._m, c;
			if(m){
				c = (+m.w[name] || 0);
				if(c && c != id){
					dcl._er("set chaining", name, ctor, id, c);
				}
				m.w[name] = id;
			}
		}