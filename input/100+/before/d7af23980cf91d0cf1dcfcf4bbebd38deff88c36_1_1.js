f	var inputPath = args.length > 0 ? args[0] : U.resolveAppHome(),
		alloyConfigPath = path.join(inputPath,'config','alloy.' + CONST.FILE_EXT.CONFIG),
		alloyConfig = {},
		outputPath, tmpPath, compilerMakeFile;

	// validate input and output paths
	if (!path.existsSync(inputPath)) {
		U.die('inputPath "' + inputPath + '" does not exist');
	} else if (!path.existsSync(path.join(inputPath,'views','index.' + CONST.FILE_EXT.VIEW))) {
		U.die('inputPath has no views/index.' + CONST.FILE_EXT.VIEW + ' file.');
	}	

	if (!program.outputPath) {
		tmpPath = path.join(inputPath,'views','index.'+CONST.FILE_EXT.VIEW);
		if (path.existsSync(tmpPath)) {
			outputPath = path.join(inputPath,'..');
		}
	}
	outputPath = outputPath ? outputPath : (program.outputPath || path.join(U.resolveAppHome(),".."));
	U.ensureDir(outputPath);

	// construct compiler config from alloy.json and the command line config parameters
	if (path.existsSync(alloyConfigPath)) {
		alloyConfig = JSON.parse(fs.readFileSync(alloyConfigPath, 'utf8'));
		logger.info("found alloy configuration at " + alloyConfigPath.yellow);
	}
	if (program.config && _.isString(program.config)) {
		_.each(program.config.split(','), function(v) {
			var a = v.split('=');
			alloyConfig[a[0]]=a[1];
		});
	}
	alloyConfig.deploytype = alloyConfig.deploytype || 'development';
	alloyConfig.beautify = alloyConfig.beautify || alloyConfig.deploytype === 'development';

	// create compile config from paths and various alloy config files
	compilerMakeFile = new CompilerMakeFile();
	compileConfig = CU.createCompileConfig(inputPath, outputPath, alloyConfig);
	logger.info("Generating to " + compileConfig.dir.resources.yellow + " from ".cyan + inputPath.yellow);

	// process project makefiles
	var alloyJMK = path.resolve(path.join(inputPath,"alloy.jmk"));
	if (path.existsSync(alloyJMK)) {
		logger.info("Found project specific makefile at " + "app/alloy.jmk".yellow);
		var vm = require('vm'),
			util = require('util');
		var script = vm.createScript(fs.readFileSync(alloyJMK), 'alloy.jmk');
		
		try {
			script.runInNewContext(compilerMakeFile);
		} catch(E) {
			logger.error("project build at "+alloyJMK.yellow + " generated an error during load: "+E.red);
		}
	}
	
	// trigger our custom compiler makefile
	compilerMakeFile.trigger("pre:compile",_.clone(compileConfig));

	// TODO: remove this once the this is merged: https://github.com/appcelerator/titanium_mobile/pull/2610
	// Make sure that ti.physicalSizeCategory is installed
	if (!path.existsSync(path.join(outputPath,'ti.physicalSizeCategory-android-1.0.zip')) && 
		!path.existsSync(path.join(outputPath,'modules','android','ti.physicalsizecategory','1.0','timodule.xml'))) {
		wrench.copyDirSyncRecursive(path.join(alloyRoot,'modules'), outputPath, {preserve:true})
	}
	U.installModule(outputPath, {
		id: 'ti.physicalSizeCategory',
		platform: 'android',
		version: '1.0'
	});

	// create components directory for view/controller components
	U.copyAlloyDir(alloyRoot, 'lib', compileConfig.dir.resources); 
	wrench.mkdirSyncRecursive(path.join(compileConfig.dir.resourcesAlloy, 'components'), 0777);
	wrench.mkdirSyncRecursive(path.join(compileConfig.dir.resourcesAlloy, 'widgets'), 0777);

	// create the global style, if it exists
	var globalStylePath = path.join(inputPath,CONST.DIR.STYLE,CONST.GLOBAL_STYLE);
	if (path.existsSync(globalStylePath)) {
		var contents = fs.readFileSync(globalStylePath, 'utf8');
		if (!/^\s*$/.test(contents)) {
			try {
				compileConfig.globalStyle = JSON.parse(CU.processTssFile(contents));
			} catch(e) {
				logger.error(e);
				U.die('Error processing global style at "' + globalStylePath + '"');
			}
		}
	} 

	// Process all models
	var models = processModels();

	// Process all views, including all those belonging to widgets
	var viewCollection = U.getWidgetDirectories(outputPath);
	viewCollection.push({ dir: path.join(outputPath,CONST.ALLOY_DIR) });
	_.each(viewCollection, function(collection) {
		//_.each(fs.readdirSync(path.join(collection.dir,'views')), function(view) {
		_.each(wrench.readdirSyncRecursive(path.join(collection.dir,CONST.DIR.VIEW)), function(view) {
			if (viewRegex.test(view)) {
				console.log(view);
				// var basename = path.basename(view, '.'+CONST.FILE_EXT.VIEW);
				// parseView(basename, collection.dir, basename, collection.manifest);
				parseView(view, collection.dir, collection.manifest);
			}
		});
	});

	// copy assets and libraries
	U.copyAlloyDir(inputPath, [CONST.DIR.ASSETS,CONST.DIR.LIB], compileConfig.dir.resources);
	U.copyAlloyDir(inputPath, CONST.DIR.VENDOR, path.join(compileConfig.dir.resources,CONST.DIR.VENDOR));

	// generate app.js
	var appJS = path.join(compileConfig.dir.resources,"app.js");
	var code = _.template(fs.readFileSync(path.join(alloyRoot,'template','app.js'),'utf8'),{models:models});
	
	try {
		code = CU.processSourceCode(code, alloyConfig, 'app.js');
	} catch(e) {
		logger.error(code);
		U.die(e);
	}

	// trigger our custom compiler makefile
	var njs = compilerMakeFile.trigger("compile:app.js",_.extend(_.clone(compileConfig), {"code":code, "appJSFile" : path.resolve(appJS)}));
	if (njs) {
		code = njs;
	}
	fs.writeFileSync(appJS,code);
	logger.info("compiling alloy to " + appJS.yellow);

	// copy builtins and fix their require paths
	copyBuiltins();
	optimizeCompiledCode(alloyConfig);

	// trigger our custom compiler makefile
	compilerMakeFile.trigger("post:compile",_.clone(compileConfig));
};
