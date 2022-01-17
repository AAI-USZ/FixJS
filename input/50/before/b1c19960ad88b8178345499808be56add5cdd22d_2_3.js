function(path, count){
	_fs.mkdirSync(path);
	createTestFiles(path, count);
}