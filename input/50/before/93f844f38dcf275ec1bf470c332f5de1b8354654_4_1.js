function(path, file){
		var trackerLocation = path + '/' + _filename;
		if (_path.existsSync(trackerLocation)){
			_fs.unlinkSync(trackerLocation);
		}
		
		_createTrackerFile(path, file);
	}