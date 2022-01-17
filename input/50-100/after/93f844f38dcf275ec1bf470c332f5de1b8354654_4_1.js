function(path){
		var trackerLocation = path + '/' + _filename;
		if (!_fs.existsSync(trackerLocation)){
			_clog.debug("* Migration Tracker file not found");
			_clog.debug("* in '" + trackerLocation + "'.");
			return "0";
		} 
		
		return _fs.readFileSync(trackerLocation, "utf8");
	}