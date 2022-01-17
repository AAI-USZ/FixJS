function() {
		var t = this, f = t.clone(), i = 0;
		f[P] = Object.create(t[P]);
		while (t = arguments[i++]) Object.merge(f[P], t);
		return f;
	}