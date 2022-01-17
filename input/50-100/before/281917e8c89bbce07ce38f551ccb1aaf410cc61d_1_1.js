function fixRequirePaths(config) {
	var resourcesDir =  compileConfig.dir.resources, 
		files = wrench.readdirSyncRecursive(resourcesDir);

	_.each(files,function(file){
		var ext = file.substring(file.length-3);
		if (ext == '.js') {
			var f = path.join(resourcesDir,file);

			// we fix require paths to make sure they are correct and relative to the project
			var newSrc = requires.makeRequiresRelative(f,resourcesDir,config);
			fs.writeFileSync(f,newSrc,'utf-8');
		}
	});
}