function(path){
		_verifyDirectory(path);

		var fileList = []
			, modules = [];

		var files = _fs.readdirSync(path);

		return _importFiles(path, files);
	}