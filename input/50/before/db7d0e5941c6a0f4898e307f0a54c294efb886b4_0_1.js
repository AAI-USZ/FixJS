function(url){
		var f = steal.File(url);
		return f.protocol() ? f.path : f.joinFrom(steal.pageUrl().dir(), true);
	}