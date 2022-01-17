function(chain, name){
			var i = 0, f, p = empty[name];
			for(; f = chain[i]; ++i){
				if(isSuper(f)){  // intentional assignment
					p = chain[i] = dcl._f(f, p, name);
				}else{
					p = f;
				}
			}
			return name != cname ? p : function(){ p.apply(this, arguments); };
		}