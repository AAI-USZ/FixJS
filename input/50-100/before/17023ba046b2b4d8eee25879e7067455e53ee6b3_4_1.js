function(ev) {
		var t = this;
		if ("_e" in t && ev in t._e) {
			for (var i=0, e=t._e[ev], a=e.slice.call(arguments, 1); ev=e[i++];) ev[0].apply(ev[1]||t, a);
		}
		return t;
	}