function(path, count){
	for (var i = 0; i <  count; i++){
		_fs.writeFileSync(path + '/mod' + i + '.js', index);
	}
}