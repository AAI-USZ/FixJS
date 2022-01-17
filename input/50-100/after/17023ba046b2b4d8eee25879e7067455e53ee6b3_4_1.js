function(ev, fn, scope) {
		var t = this
		  , o = fn.chain(t.non.bind(t, ev, o))
		  //, o = fn.chain(function(){t.non(ev, o)})
		t.on(ev, o, scope);
		return t;
	}