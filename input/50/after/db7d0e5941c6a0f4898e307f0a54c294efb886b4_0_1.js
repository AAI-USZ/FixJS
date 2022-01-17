function(url){
		var f = steal.File(url);
		return f.isCrossDomain() ? f.path : f.join(steal.root, true);
	}