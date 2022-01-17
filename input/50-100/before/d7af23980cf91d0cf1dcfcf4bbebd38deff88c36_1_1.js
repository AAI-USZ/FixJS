f		//_.each(fs.readdirSync(path.join(collection.dir,'views')), function(view) {
		_.each(wrench.readdirSyncRecursive(path.join(collection.dir,CONST.DIR.VIEW)), function(view) {
			if (viewRegex.test(view)) {
				console.log(view);
				// var basename = path.basename(view, '.'+CONST.FILE_EXT.VIEW);
				// parseView(basename, collection.dir, basename, collection.manifest);
				parseView(view, collection.dir, collection.manifest);
			}
		});
	});
