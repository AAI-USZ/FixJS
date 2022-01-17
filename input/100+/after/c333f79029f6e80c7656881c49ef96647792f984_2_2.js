function startUp() {
			
			// set the meta tag programmatically. using the tag in the html causes a white flash
			// after the startup image for full screen ios webapps
			var meta = document.createElement('meta');
			meta.name = 'viewport';
			meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
			document.head.appendChild(meta);						
			
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
			screenframeEl.style.opacity = 0;	
			appframeEl.appendChild(screenframeEl);
			document.body.appendChild(appframeEl);

			setupScreenGeometry(F5.isMobile(), F5.isNative());	
			
			hideAddressBar();
										
			try {
				F5.Global.flowController.start(function () {
					// TODO: extract
					/*global PhoneGap*/
					console.log('started');
					
					setTimeout(function () {
						screenframeEl.style.opacity = '';
						F5.addTransitionEndListener(screenframeEl, function () {
							document.body.style['background-image'] = '';							
							F5.removeTransitionEndListener(screenframeEl);
						});
					}, 500);
					
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