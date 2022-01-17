function() { 
								$('#sr-autocomplete').val('RESIssues');
								$('li a.text-button').click();
								$('#submittingToEnhancement').fadeOut();
								var thisBrowser;
								if (typeof(self.on) == 'function') {
									thisBrowser = 'Firefox';
								} else if (typeof(chrome) != 'undefined') {
									thisBrowser = 'Chrome';
								} else if (typeof(safari) != 'undefined') {
									thisBrowser = 'Safari';
								} else if (typeof(opera) != 'undefined') {
									thisBrowser = 'Opera';
								} else {
									thisBrowser = 'Unknown';
								}
								var txt = "- RES Version: " + RESVersion + "\n";
								// turns out this is pretty useless info, commenting it out.
								// txt += "- Browser: " + navigator.appCodeName + " " + navigator.appName + "\n";
								// txt += "- Browser: " + thisBrowser + "\n";
								txt += "- Browser: " + BrowserDetect.browser + "\n";
								if (typeof(navigator) == 'undefined') navigator = window.navigator;
								txt+= "- Browser Version: " + BrowserDetect.version + "\n";
								txt+= "- Cookies Enabled: " + navigator.cookieEnabled + "\n";
								txt+= "- Platform: " + BrowserDetect.OS + "\n\n";
								$('.usertext-edit textarea').val(txt);
								title.value = '[bug] Please describe your bug here. If you have screenshots, please link them in the selftext.';
							}