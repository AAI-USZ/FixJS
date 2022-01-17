function(path, migration){
		
		if (typeof migration === "undefined"){
			_clog.error("*******************************************************");
			_clog.error("* A migration version must be specified to migrate down.");
			_clog.error("* If you wish to completely roll back to initial schema, migrate to 0.");
			_clog.error("*******************************************************");
			return false;
		}
		
		if (migration === "0"){return true;}

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