function(path){
	path = _path.resolve(_path.dirname(module.parent.filename), path);
	_fs.writeFileSync(_path.join(path, '/.hiddenFile.js'), index);
}