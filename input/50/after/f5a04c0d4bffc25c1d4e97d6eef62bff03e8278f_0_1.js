function(info){
		info.canCompress = false;
		info.headers = {
			"Access-Control-Allow-Origin": "*",
			"Content-Type":"font/"+info.ext.substr(1)
		};
	}