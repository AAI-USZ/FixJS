function(){
			var p, r, t = this, a = arguments;
			// running the before chain
			for(p = x.pb; p !== x; p = p.pb){
				p.b.apply(t, a);
			}
			// running the around chain
			try{
				if(x.pf !== x){ r = x.pf.f.apply(t, a); }
			}catch(e){
				r = e;
			}
			// running the after chain
			for(p = x.na; p !== x; p = p.na){
				p.a.call(t, a, r);
			}
			if(r instanceof Error){
				throw r;
			}
			return r;
		}