function(path){
		if (!_fs.existsSync(path)){
			_clog.warn("*******************************************************");
			_clog.warn("* Migrations directory not found.");
			_clog.warn("* Creating migrations directory. at '" + path + "'.");
			_clog.warn("*******************************************************");
			_fs.mkdirSync(path);
		} else {
			_clog.debug("Migrations directory exists at '" + path + "'.");
		}
	}