function(path, count){
	path = _path.resolve(_path.dirname(module.parent.filename), path);
	_fs.mkdirSync(path);
	createTestFiles(path, count);
}