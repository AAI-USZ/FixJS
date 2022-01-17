function(path, file){
		var trackerLocation = path + '/' + _filename;
		if (_fs.existsSync(trackerLocation)){
			_fs.unlinkSync(trackerLocation);
		}
		
		_createTrackerFile(path, file);
	}