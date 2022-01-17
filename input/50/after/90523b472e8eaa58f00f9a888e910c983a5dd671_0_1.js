function(location){
		$.post('/bump', Geo.extract(location));
	}