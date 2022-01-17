function(/*sup*/){
		return function(f, a, n){
			if(typeof f.f != "function"){
				dcl._e("wrong super call", f.ctr, n);
			}
			if(a && typeof a != "function"){
				dcl._e("wrong super", f.ctr, n);
			}
			var t = f.f(a);
			if(typeof t != "function"){
				dcl._e("wrong super result", f.ctr, n);
			}
			t.ctr = f.ctr;
			return t;
		};
	}