function startHandler(e) {	
		function startUp() {			
			
			// also do this after importing a package
			F5.scopePackages();
			F5.parseResources(F5.appPkg);
			if (F5.isDebug()) {
				F5.parseSchemas(F5.appPkg);				
			}			
									
			// create the essential divs
			var appframeEl = document.createElement('div');
			appframeEl.id = 'f5appframe';
			
			// NOTE: by adding the application package class to the appframe, system objects like
			// dialogs etc. can be styled by the application css packages by applying styling
			// #f5screen (which is one level below appframe)
			F5.addClass(appframeEl, F5.packageClass());
			
			var screenframeEl = document.createElement('div');
			screenframeEl.id = 'f5screen';		
			appframeEl.appendChild(screenframeEl);
			document.body.appendChild(appframeEl);

			setupScreenGeometry(F5.isMobile(), F5.isNative());	
										
			try {
				F5.Global.flowController.start(function () {
					// TODO: extract
					/*global PhoneGap*/
					console.log('started');
					var splash = document.getElementById('f5splash');
					if (splash) {
						// TODO: why is the delay required?
						setTimeout(function () {
							splash.style.display = 'none';							
						}, 500);
					}
					setTimeout(function () {
						if (typeof PhoneGap !== 'undefined') {
							// TODO: unify
							console.log('hiding splash: ' + F5.platform());
							if (F5.platform() === 'android') {
								setTimeout(function () {
								    PhoneGap.exec(F5.noop, F5.noop, "App", "hideSplashScreen", [false]);
								}, 500);
							} else {
								PhoneGap.exec(
									function (result) { // success
									console.log(result);
								}, function (result) { // failure
									console.log(result);
								}, "com.phonegap.splashscreen", "hide", []);									
							}							
						}						
					}, 1000); 
					// NOTE: the delay shouldn't be necessary, but on older devices	
					// sometimes the webview doesn't reflow completely before the
					// splashscreen is hidden otherwise																		
				});
			} catch (exception) {
				console.log(exception.message);
				document.body.className = 'errorframe';
				document.body.innerHTML = exception.message;
			}
		}
		// increase to delay to allow attaching to webview from remote debugger
		function start() {
			setTimeout(startUp, 0);
		}
	
		function updateReady() {
			console.log('updateready');
			window.location.reload();
		}
				
		window.applicationCache.addEventListener('updateready', function (e) {
			updateReady();
		}, false);
		if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
			updateReady();
		}

		if (window.applicationCache.status === window.applicationCache.IDLE || 
				window.applicationCache.status === window.applicationCache.UNCACHED || 
				!F5.connection.online()) {
			start();			
		} else {
			
			window.applicationCache.addEventListener('noupdate', function (e) {
				console.log('noupdate');
				start();
			}, false);

			window.applicationCache.addEventListener('cached', function (e) {
				console.log('cached');
				start();
			}, false);

			window.applicationCache.addEventListener('error', function (e) {
				console.log('error');
				start();
			}, false);			
		}				
	}