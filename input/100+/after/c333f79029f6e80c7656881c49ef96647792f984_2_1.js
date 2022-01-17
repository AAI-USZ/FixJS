function () {
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
				}