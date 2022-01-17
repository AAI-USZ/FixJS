function(path, migration){

		if (!_fs.existsSync(path + "/" + migration)){
			_clog.error("*******************************************************");
			_clog.error("* Migration '" + migration + "' does not exist");
			_clog.error("* - in " + path);
			_clog.error("*******************************************************");
			return false;
		}
		
		_clog.debug("Migration found");
		
		return true;
	}