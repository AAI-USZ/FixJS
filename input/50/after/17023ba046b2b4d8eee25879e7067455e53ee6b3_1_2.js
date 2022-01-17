function(m) {
		var a = typeof m == "object" ? m : arguments;
		return this.replace(/\{(\w+)\}/g, function(_, i){return a[i]});
	}