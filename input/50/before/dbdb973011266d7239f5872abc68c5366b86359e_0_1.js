function(info){
		info.canCompress = false;
		var ext = path.extname(info.filename).substr(1);
		return "image/"+ext;
	}