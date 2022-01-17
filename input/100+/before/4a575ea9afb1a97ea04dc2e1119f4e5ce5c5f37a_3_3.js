function(chain, stub, name){
			var i = 0, f, t, pi = 0;
			for(; f = chain[i]; ++i){
				if(isSuper(f)){
					t = i - pi;
					t = chain[i] = f.f(t == 0 ? 0 : t == 1 ? chain[pi] : stub(chain.slice(pi, i)));
					t.ctr = f.ctr;
					pi = i;
				}
			}
			t = i - pi;
			return t == 0 ? 0 : t == 1 && name != cname ? chain[pi] : stub(pi ? chain.slice(pi) : chain);
		}