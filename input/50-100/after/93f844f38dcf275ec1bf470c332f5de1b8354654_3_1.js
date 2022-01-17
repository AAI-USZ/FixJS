function(path){
		if (!_fs.existsSync(path)){
			_clog.error("*******************************************************");
			_clog.error("* Migrations directory not found.");
			_clog.error("* " + path);
			_clog.error("*******************************************************");
			return false;
		} 
		
		_clog.debug("Migrations directory exists at '" + path + "'.");
		return true;
	}