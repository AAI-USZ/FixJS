function middleware(sourcePath, options) {
	options = options || {};
	options.mount = options.mount || '/views/';
	if(typeof options.runtimeMount == "undefined")
		options.runtimeMount = '/blade/blade.js';
	if(typeof options.pluginsMount == "undefined")
		options.pluginsMount = '/blade/plugins/';
	if(options.compileOptions == null)
		options.compileOptions = {
			'cache': process.env.NODE_ENV == "production",
			'minify': process.env.NODE_ENV == "production",
			'includeSource': process.env.NODE_ENV == "development"
		};
	options.compileOptions.basedir = sourcePath;
	var fileCache = {}, pluginPath = __dirname + "/../plugins/";
	return function(req, res, next) {
		var pathname = url.parse(req.url).pathname;
		if(options.runtimeMount && pathname == options.runtimeMount)
		{
			if(fileCache['runtime'])
				res.type('application/javascript').send(fileCache['runtime']);
			else
				fs.readFile(__dirname + "/../dist/blade-runtime.min.js", function(err, data) {
					if(err) return next(err);
					fileCache['runtime'] = data;
					res.type('application/javascript').send(data);
				});
		}
		else if(options.pluginsMount &&
			pathname.substr(0, options.pluginsMount.length) == options.pluginsMount)
		{
			var filename = path.normalize(pathname.substr(options.pluginsMount.length) );
			var fullPath = path.join(pluginPath, filename);
			//fullPath may contain /../../../etc/passwd ... no good
			if(fullPath.indexOf(pluginPath) != 0)
				res.type("text/plain").send("403 Forbidden", 403); //malicious filename
			else if(fileCache[fullPath])
				res.type('application/javascript').send(fileCache[fullPath]);
			else
				fs.readFile(fullPath, function(err, data) {
					if(err) return next(err);
					fileCache[fullPath] = data;
					res.type('application/javascript').send(data);
				});
		}
		else if(pathname.substr(0, options.mount.length) == options.mount)
		{
			var filename = path.normalize(pathname.substr(options.mount.length) );
			var fullPath = path.join(sourcePath, filename);
			//fullPath may contain /../../../etc/passwd ... no good
			if(fullPath.indexOf(sourcePath) != 0)
				return res.type("text/plain").send("403 Forbidden", 403); //malicious filename
			compileFile(fullPath, options.compileOptions, function(err, tmpl) {
				if(err) return next(err);
				res.type('application/javascript');
				res.send("blade.cachedViews[" + JSON.stringify(filename) + "]=" + tmpl.toString() +
					"; if(blade.cb[" + JSON.stringify(filename) + "]) blade.cb[" +
					JSON.stringify(filename) + "](" + JSON.stringify(tmpl.dependencies) + ", " +
					tmpl.unknownDependencies + ");");
			});
		}
		else next();
	};
}