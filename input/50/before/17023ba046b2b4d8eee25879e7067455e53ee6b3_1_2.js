function() {
		var a = arguments;
		return this.replace(/\{(\d+)\}/g, function(_, i){return a[i]});
	}