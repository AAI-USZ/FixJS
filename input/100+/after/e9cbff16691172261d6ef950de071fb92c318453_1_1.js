function (query, cb) {
	
//	debugger;
	
	var pkg;
	if (!query.pkg) {
		pkg = query.domain;
	} else {
		pkg = query.domain + '.' + query.pkg;
	}
	
	
	var script = '';
			
	function injectManifest(pkg, cb) {		
		var manifestName = packageManifestName(pkg);
		var pkgBase = packageBase(pkg);

		parseJSON(pkgBase + manifestName, cb, function (manifest) {
			var tasks = [];

			tasks.push(function (cb) {
				// recurse
				function injectPackages(packages, type, cb) {
					var tasks = [];
					packages.forEach(function (pkg) {
						tasks.push(function (cb) {
							injectManifest(pkg, cb);						
						});
					});
					async.series(tasks, cb);
				}
				processManifest(manifest, query, 'packages', injectPackages, cb);				
			});

			tasks.push(function (cb) {
				script += 'F5.pushPkg("' + pkg + '");\n';

				function injectScripts(scripts, type, cb) {
					var tasks = [];
					scripts.forEach(function (file) {
						tasks.push(function (cb) {
							script += '// ' + pkgBase + file + '\n';
							get(pkg, resolveURL(pkgBase, file), 'utf8', cb, function (content) {
								script += content + '\n';
								cb();								
							});
						});
					});	
					async.series(tasks, cb);
				}
				processManifest(manifest, query, 'scripts', injectScripts, cb);					
			});

			tasks.push(function (cb) {
				var flows = {};
				function injectFlows(flowFiles, type, cb) {
					var tasks = [];					
					flowFiles.forEach(function (file) {
						tasks.push(function (cb) {
							parseJSON(pkgBase + file, cb, function (json) {
								extend(flows, json);
								cb();										
							});
						});
					});			
					async.series(tasks, cb);
				}		
				processManifest(manifest, query, 'flows', injectFlows, function (err) {
					if (err) {
						cb(err);
					} else {
						script += 'F5.addFlows("' + pkg + '", ' + JSON.stringify(flows) + ');\n';										
						script += 'F5.popPkg();\n';
						cb();						
					}
				});					
			});

			async.series(tasks, cb);				
		});
	}
	
	
	var f5Base = packageBase('f5');

	var tasks = [];
	
	if (!bool(query.lib)) {
		tasks.push(function (cb) {
			var path = f5Base + 'lib/f5.js';
			script += '// ' + path + '\n';		
			get(pkg, path, 'utf8', cb, function (content) {
				script += content + '\n';	
				script += 'F5.query = ' + JSON.stringify(query) + '\n';				
				script += 'F5.appPkg = ' + JSON.stringify(pkg) + '\n';				
				cb();													
			});
		});
	}		
	
	tasks.push(function (cb) {
		injectManifest(pkg, cb);		
	});
			
	if (!bool(query.lib)) {
		tasks.push(function (cb) {
			var path = f5Base + 'lib/register.js';
			script += '// ' + path + '\n';		
			get(pkg, path, 'utf8', cb, function (content) {
				script += content + '\n';	
				cb();						
			});	
		});		
		tasks.push(function (cb) {
			var path = f5Base + 'lib/headlessstart.js';
			script += '// ' + path + '\n';		
			get(pkg, path, 'utf8', cb, function (content) {
				script += content + '\n';			
				cb();						
			});
		});		
	}

	async.series(tasks, function (err) {
		cb(err, script);
	});
}