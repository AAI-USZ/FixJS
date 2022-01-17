function foldersToFiles(specFolders){
	var files = [];
	specFolders.forEach(function(folder){
		fs.readdirSync(Path.join(JS_COVERAGE_BASE, folder)).forEach(function(filename){
			if(Path.extname(filename) === '.js'){
				files.push(Path.join(JS_COVERAGE_BASE, folder, filename));
			}
		});
	});
	return files;
}