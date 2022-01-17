function (query, cb) {
	
//	debugger;	
	
	getSizes = [];
	
	var pkg;
	if (!query.pkg) {
		pkg = query.domain;
	} else {
		pkg = query.domain + '.' + query.pkg;
	}

	console.error(pkg + ' building html');
	
	var document = new Element('html');
	document.head = new Element('head');
	document.appendChild(document.head);
	document.body = new Element('body');
	document.appendChild(document.body);	
				

	function appendMeta(properties) {
		var meta = new Element('meta');
		var name;
		for (name in properties) {
			if (properties.hasOwnProperty(name)) {
				meta.setAttribute(name, properties[name]);
			}
		}		
		document.head.appendChild(meta);
	}
	
	function appendLink(rel, href, type, pkg) {
		var link = new Element('link');
		link.setAttribute('rel', rel);
		if (pkg) {
			link.setAttribute('href', '/' + packageUrl(pkg) + '/' + href);			
		} else {
			link.setAttribute('href', href);			
		}
		if (type) {
			link.setAttribute('type', type);
		}
		if (pkg) {
			link.setAttribute('f5pkg', pkg);			
			link.setAttribute('f5applyscope', true);			
		}
		document.head.appendChild(link);
	}
		
	function makeScript(pkg, file, cb) {
		var script = new Element('script');		
		if (!bool(query.inline)) {
			// reference scripts
			script.setAttribute('src', '/' + packageUrl(pkg) + '/' + file);
			cb(null, script);
		} else {
			var src = packageBase(pkg) + file;
			// inline scripts
			// devserv layer will compress and minify	
			script.id = src;			
			get(pkg, src, 'utf8', cb, function (code) {
				if (bool(query.compress)) {
					minify(code, {engine: 'uglify'}, function (err, code) {
						script.innerHTML = code;
						cb(err, script);
					});
				} else {
					script.innerHTML = code + '\n//@ sourceURL=' + src + '\n';
					cb(null, script);											
				}
			});
		}
	}		
	
	function facebookId() {
		try {
			var path = packageBase(pkg) + 'facebook_appid.txt';
			return fs.readFileSync(path).toString();
		} catch (e) {
//			console.error('Could not find facebook_appid.txt');
		}		
	}	
	
	function injectPackage(pkg, manifest, base, cb) {
		var pkgEl = new Element('div');
		pkgEl.setAttribute('f5pkg', pkg);
		document.body.appendChild(pkgEl);


		var scriptsEl = new Element('div');
		scriptsEl.setAttribute('f5id', pkg + '.scripts');
		pkgEl.appendChild(scriptsEl);

		var templatesEl = new Element('div');
		templatesEl.setAttribute('f5applyscope', true);
		templatesEl.setAttribute('f5pkg', pkg);
		templatesEl.setAttribute('style', 'display:none;');			
		pkgEl.appendChild(templatesEl);	

		var flowsEl = new Element('script');
		flowsEl.setAttribute('f5id', pkg + '.flows');
		pkgEl.appendChild(flowsEl);

		var resourcesEl = new Element('script');
		resourcesEl.setAttribute('f5id', pkg + '.resources');
		pkgEl.appendChild(resourcesEl);				

		var schemasEl = new Element('script');
		resourcesEl.setAttribute('f5id', pkg + '.schemas');
		pkgEl.appendChild(schemasEl);				
	
		// javascript
		function injectScripts(scripts, type, cb) {
			var tasks = [];			
			scripts.forEach(function (file) {
				tasks.push(function (cb) {
					makeScript(pkg, file, function (err, script) {
						if (err) {
							cb(err);
						} else {
							scriptsEl.appendChild(script);
							cb();
						}
					});
				});
			});			
			async.series(tasks, cb);	
		}

		// html and css
		function injectElements(elements, type, cb) {
			var tasks = [];
			elements.forEach(function (file) {
				tasks.push(function (cb) {
					if (file.match('.css')) {
						if (bool(query.inline)) {
							var resolvedPath = resolveURL(base, file);
							get(pkg, resolvedPath, 'utf8', cb, function (style) {
								if (bool(query.compress)) {
									style = cssmin(style);
								}

								var statements = style.split(/(;|\}|,)/);

								var tasks = [];
								var i;
								
								function makeTask(cssBase, url, index) {
									return function (cb) {
										inlineData(pkg, resolveURL(cssBase, url), cb, function (data) {
											statements[index] = statements[index].replace(url, data);
											cb();														
										});
									};
								}
								
								for (i = 0; i < statements.length; i += 1) {
									var matches = cssURLRegExp.exec(statements[i]);
									if (matches && matches.length > 1) {
										var url = matches[1];

										// resolve the url relative to the css base
										var cssBase = require('path').dirname(resolvedPath) + '/';

										tasks.push(makeTask(cssBase, url, i));
									}
								}		
								
								async.parallel(tasks, function (err) {
									if (err) {
										cb(err);
									} else {
										var styleDiv = new Element('style');
										styleDiv.setAttribute('f5id', resolvedPath);
										styleDiv.setAttribute('f5pkg', pkg);
										styleDiv.setAttribute('f5applyscope', true);
										styleDiv.innerHTML = statements.join('');
										document.head.appendChild(styleDiv);
										cb();																				
									}						
								});																								
							});												
						} else {
							appendLink('stylesheet', file, 'text/css', pkg);
							cb();
						}
					} else {
						var elementsDiv = new Element('div');
						get(pkg, resolveURL(base, file), 'utf8', cb, function (data) {
							
							// pull out stylesheet references. these should be done through the manifest
							data = data.replace(/<link.*stylesheet[^>]*>/g, '');
							data = data.replace(/<meta.*viewport[^>]*>/g, '');
							
							var fragments = data.split(/(>)/);
							async.map(fragments, function (fragment, cb) {								
								if (bool(query.inline)) {
									var matches = imgSrcRegExp.exec(fragment);// inline styles? || cssURLRegExp.exec(fragment);
									if (matches && matches.length > 1) {
										inlineData(pkg, resolveURL(base, matches[1]), cb, function (data) {
											cb(null, fragment.replace(matches[1], data));																					
										});										
									} else {
										cb(null, fragment);										
									}
								} else {
									// this shouldn't be needed
//									cb(null, fragment.replace(/(<img.*[\'\"]+)(.*)([\'\"]+)/, '$1/' + 
//																		packageUrl(pkg) + '$2$3'));	
									cb(null, fragment);
								}
							}, function (err, results) {
								elementsDiv.innerHTML = results.join('');						
								elementsDiv.setAttribute('f5id', file);				
								templatesEl.appendChild(elementsDiv);				
								cb();				
							});
						});
					}					
				});
			});
			async.series(tasks, cb);
		}

		// resource files
		var resources = {};
		function injectResources(resourceFiles, type, cb) {
			var tasks = [];
			resourceFiles.forEach(function (file) {
				tasks.push(function (cb) {
					parseJSON(base + file, cb, function (r) {
						var tasks = [];
						if (bool(query.inline)) {
							handleURLsRecursive(r, function (obj, id, value) {	
								tasks.push(function (cb) {
									inlineData(pkg, resolveURL(base, getURL(value)), cb, function (data) {
										obj[id] = data;
										cb();
									});																				
								});
							});
						} else {
							handleURLsRecursive(r, function (obj, id, value) {
								obj[id] = getURL(value);										
							});								
						}
						async.parallel(tasks, function (err) {
							if (err) {
								cb(err);
							} else {
								extend(resources, r);		
								cb();																								
							}
						});
					});						
				});				
			});	
			async.series(tasks, cb);
		}

		var flows = {};
		function injectFlows(flowFiles, type, cb) {
			var tasks = [];			
			flowFiles.forEach(function (file) {
				tasks.push(function (cb) {
					parseJSON(base + file, cb, function (flow) {
						extend(flows, flow);											
						cb();							
					});
				});
			});	
			async.series(tasks, cb);
		}
		
		var schemas = [];
		function injectSchemas(schemaFiles, type, cb) {
			var tasks = [];			
			schemaFiles.forEach(function (file) {
				tasks.push(function (cb) {
					parseJSON(base + file, cb, function (schema) {
						extend(schemas, schema);											
						cb();							
					});
				});
			});	
			async.series(tasks, cb);
		}		



		var tasks = [];
		
		tasks.push(function (cb) {
			processManifest(manifest, query, 'flows', injectFlows, function (err) {
				if (err) {
					cb(err);
				} else {
					flowsEl.innerHTML = 'F5.addFlows("' + pkg + '", ' + JSON.stringify(flows) + ');';
					cb();
				}
			});	
		});
		
		tasks.push(function (cb) {
			processManifest(manifest, query, 'resources', injectResources, function (err) {
				if (err) {
					cb(err);
				} else {
					resourcesEl.innerHTML = 'F5.addResources("' + pkg + '", ' + JSON.stringify(resources) + ');';
					cb();
				}
			});	
		});
		
		tasks.push(function (cb) {
			processManifest(manifest, query, 'schemas', injectSchemas, function (err) {
				if (err) {
					cb(err);
				} else {
					schemasEl.innerHTML = 'F5.addSchemas("' + pkg + '", ' + JSON.stringify(schemas) + ');';
					cb();
				}
			});	
		});		

		tasks.push(function (cb) {
			processManifest(manifest, query, 'elements', injectElements, cb);				
		});


		tasks.push(function (cb) {
			var pushPkg = new Element('script');
			pushPkg.innerHTML = 'F5.pushPkg("' + pkg + '", ' + (manifest.meta ? JSON.stringify(manifest.meta) : '{}') + ');';
			scriptsEl.appendChild(pushPkg);
			cb();
		});
		
		tasks.push(function (cb) {
			processManifest(manifest, query, 'scripts', injectScripts, cb);
		});
		
		tasks.push(function (cb) {
			processManifest(manifest, query, 'domscripts', injectScripts, cb);
		});
		
		tasks.push(function (cb) {
			var popPkg = new Element('script');
			popPkg.innerHTML = 'F5.popPkg();';
			scriptsEl.appendChild(popPkg);
			cb();			
		});		

		async.series(tasks, cb);
	}
	
	function injectManifest(pkg, cb) {		
		
		// TODO: move to function packageInfo()		
		var manifestName = packageManifestName(pkg);
		var pkgBase = packageBase(pkg);
		
		if (!pkgBase) {
			cb(new Error('Unknown package: ' + pkg + '. Did you flow5 link?'));
			return;
		}
		
		parseJSON(pkgBase + manifestName, cb, function (manifest) {
			function injectPackages(packages, type, cb) {
				var tasks = [];			
				packages.forEach(function (pkg) {
					tasks.push(function (cb) {
						injectManifest(pkg, cb);					
					});
				});
				async.series(tasks, cb);			
			}
						
			// recurse
			processManifest(manifest, query, 'packages', injectPackages, function (err, result) {
				if (err) {
					cb(err);
				} else {
					injectPackage(pkg, manifest, pkgBase, cb);				
				}
			});				
		});									
	}	
	
	function injectHeader(pkg, cb) {
		// manifest	
		if (bool(query.cache)) {
			delete query.devserv;
			var manifestString = 'cache.manifest?' + urlParameters(query);
			document.setAttribute('manifest', manifestString);				
		}

		// TODO: create a meta section in manifest for this stuff		
		// TODO: if manifest.type === 'app' add this stuff. otherwise not

		// ios webapp stuff
		appendMeta({name: 'apple-mobile-web-app-status-bar-style', content: 'black'});
		appendMeta({name: 'apple-mobile-web-app-capable', content: 'yes'});
		appendMeta({name: 'format-detection', content: 'telephone=no'});
		// ios
		appendMeta({'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8'});
		// this causes a flash when using a home screen webapp on iOS. instead set it programmatically on the client
//		appendMeta({name: 'viewport', content: 'width=device-width initial-scale=1.0 maximum-scale=1.0 user-scalable=0'});

		// android
		appendMeta({name: 'viewport', content: 'target-densitydpi=device-dpi'});
		
		var tasks = [];
		tasks.push(function (cb) {
			// TODO: move to function packageInfo()		
			var manifestName = packageManifestName(pkg);
			var pkgBase = packageBase(pkg);

			parseJSON(pkgBase + manifestName, cb, function (manifest) {
				if (manifest.meta && manifest.meta.title) {
					var title = new Element('title');
					title.innerHTML = manifest.meta.title;
					document.head.appendChild(title);
				}				
				
				if (manifest.meta && manifest.meta.icon) {
					appendLink('apple-touch-icon', manifest.meta.icon, null);					
				}
				if (manifest.meta && manifest.meta.splash) {
					appendLink('apple-touch-startup-image', manifest.meta.splash, null);					
				}		
				
				function complete(src) {
					document.body.setAttribute('style', 'background-image: url(' + src + '); background-size: cover;');
					cb();																			
				}
				if (manifest.meta && manifest.meta.splash) {
					if (bool(query.inline)) {
						inlineData(pkg, pkgBase + manifest.meta.splash, cb, function (data) {
							complete(data);
						});													
					} else {
						complete(manifest.meta.splash);
					}
				} else {
					cb();
				}											
			});
		});

		tasks.push(function (cb) {
			// setup
			makeScript('f5', 'lib/f5.js', function (err, script) {
				if (err) {
					cb(err);
				} else {
					document.body.appendChild(script);						

					var queryScript = new Element('script');
					queryScript.setAttribute('f5id', 'F5.query');
					queryScript.innerHTML = "F5.query = " + JSON.stringify(query) + '\n' +
						'F5.appPkg = ' + JSON.stringify(pkg) + '\n';				

					document.body.appendChild(queryScript);

					// TODO: don't make facebook id a first class feature
					var facebook_appid = facebookId();
					if (facebook_appid) {
						var facebookScript = new Element('script');
						facebookScript.innerHTML = "F5.facebook_appid = " + facebook_appid;
						document.body.appendChild(facebookScript);		
					}	

					cb();				
				}			
			});			
		});

		async.series(tasks, cb);
	}	
	
	function injectFooter(cb) {
		var tasks = [];
		tasks.push(function (cb) {
			makeScript('f5', 'lib/register.js', function (err, script) {
				if (err) {
					cb(err);
				} else {
					document.body.appendChild(script);
					cb();
				}
			});
		});
		tasks.push(function (cb) {
			makeScript('f5', 'lib/domstart.js', function (err, script) {
				if (err) {
					cb(err);
				} else {
					document.body.appendChild(script);
					cb();
				}
			});
		});		
		async.series(tasks, cb);
	}	
	
	/***********************************/
	/************** BUILD **************/
	/***********************************/
	
	var tasks = [];
					
	if (!bool(query.lib)) {
		tasks.push(function (cb) {
			injectHeader(pkg, cb);
		});
	}
		
	// inject the app manifest (and recursively insert packages)
	tasks.push(function (cb) {
		injectManifest(pkg, cb);		
	});																				
					
	// finally		
	if (!bool(query.lib)) {
		tasks.push(injectFooter);
	}		
	
	async.series(tasks, function (err, result) {
		var html;
		if (!err) {			
			html = document.outerHTML();
			
			// TODO: this is quite inefficient since it's happening after image inlining
			// should do this transform when loading elements and scripts
			// Need a better general transformation approach. Or I start typing a lot of extra CSS
			// the mapping would allow the server to blow up if a non-compatible property is used
			if (query.agent === 'MSIE') {
				html = html.replace(/-webkit/g, '-ms').replace(/-ms-box-sizing/g, 'box-sizing');		
			} else if (query.agent === 'FF') {
				html = html.replace(/-webkit/g, '-moz');		
			}			
		}
		cb(err, html);
		
//		dumpSizes();
	}};
