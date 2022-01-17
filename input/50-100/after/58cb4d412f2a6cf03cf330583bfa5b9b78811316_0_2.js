function toAbsPathFiles(relPathFiles, basePath){
	var files = [];
	relPathFiles.forEach(function(filename){
		if(Path.extname(filename) === '.js'){
			files.push(Path.join(basePath, filename));
		}
	});
	return files;
}