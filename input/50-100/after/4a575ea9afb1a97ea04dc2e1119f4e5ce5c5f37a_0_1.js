function(ctor, name){
			var m = ctor._m, c;
			if(m){
				c = (+m.w[name] || 0);
				if(c && c != id){
					dcl._e("set chaining", name, ctor, id, c);
				}
				m.w[name] = id;
			}
		}