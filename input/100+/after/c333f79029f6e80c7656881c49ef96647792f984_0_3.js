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