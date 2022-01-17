function(path, count){
	for (var i = 0; i <  count; i++){
		_fs.writeFileSync(_path.join(path, '/mod' + i + '.js'), index);
	}
}