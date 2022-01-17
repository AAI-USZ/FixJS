function foldersToFiles(specFolders, basePath){
	var files = [];
	specFolders.forEach(function(folder){
		fs.readdirSync(Path.join(basePath, folder)).forEach(function(filename){
			if(Path.extname(filename) === '.js'){
				files.push(Path.join(basePath, folder, filename));
			}
		});
	});
	return files;
}