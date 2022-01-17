function() {
		this.checkedIfSubmitting = true;
		if ((location.href.match(/\/r\/[\w]+\/submit\/?/i)) || (location.href.match(/reddit.com\/submit\/?/i))) {
			var thisSubRedditInput = document.getElementById('sr-autocomplete');
			if (thisSubRedditInput) {
				var thisSubReddit = thisSubRedditInput.value;
				var title = document.querySelector('textarea[name=title]');
				if (typeof(this.thisSubRedditInputListener) == 'undefined') {
					this.thisSubRedditInputListener = true;
					thisSubRedditInput.addEventListener('change', function(e) {
						RESUtils.checkIfSubmitting();
					}, false);
				}
				if ((thisSubReddit.toLowerCase() == 'enhancement') || (thisSubReddit.toLowerCase() == 'resissues')) {
					RESUtils.addCSS('#submittingToEnhancement { display: none; min-height: 300px; font-size: 14px; line-height: 15px; margin-top: 10px; width: 518px; position: absolute; z-index: 999; } #submittingToEnhancement ol { margin-left: 10px; margin-top: 15px; list-style-type: decimal; } #submittingToEnhancement li { margin-left: 25px; }');
					RESUtils.addCSS('.submittingToEnhancementButton { border: 1px solid #444444; border-radius: 2px; padding: 3px 6px; cursor: pointer; display: inline-block; margin-top: 12px; }');
					RESUtils.addCSS('#RESBugReport, #RESFeatureRequest { display: none; }');
					RESUtils.addCSS('#RESSubmitOptions .submittingToEnhancementButton { margin-top: 30px; }');
					var textDesc = document.getElementById('text-desc');
					this.submittingToEnhancement = createElementWithID('div','submittingToEnhancement','RESDialogSmall');
					this.submittingToEnhancement.innerHTML = " \
					<h3>Submitting to r/Enhancement</h3> \
					<div class=\"RESDialogContents\"> \
						<div id=\"RESSubmitOptions\"> \
							What kind of a post do you want to submit to r/Enhancement? So that we can better support you, please choose from the options below, and please take care to read the instructions, thanks!<br> \
							<div id=\"RESSubmitBug\" class=\"submittingToEnhancementButton\">I want to submit a bug report</div><br> \
							<div id=\"RESSubmitFeatureRequest\" class=\"submittingToEnhancementButton\">I want to submit a feature request</div><br> \
							<div id=\"RESSubmitOther\" class=\"submittingToEnhancementButton\">I want to submit a general question or other item</div> \
						</div> \
						<div id=\"RESBugReport\"> \
							Are you sure you want to submit a bug report? We get a lot of duplicates and it would really help if you took a moment to read the following: <br> \
							<ol> \
								<li>Have you searched /r/RESIssues to see if someone else has reported it?</li> \
								<li>Have you checked the <a target=\"_blank\" href=\"http://redditenhancementsuite.com:8080/wiki/index.php?title=Category:FAQ\">RES FAQ?</a></li> \
								<li>Are you sure it's a bug with RES specifically? Do you have any other userscripts/extensions running?  How about addons like BetterPrivacy, Ghostery, CCleaner, etc?</li> \
							</ol> \
							<br> \
							Please also check out the latest known / popular bugs first:<br> \
							<ul id=\"RESKnownBugs\"><li style=\"color: red;\">Loading...</li></ul> \
							<span id=\"submittingBug\" class=\"submittingToEnhancementButton\">I still want to submit a bug!</span> \
						</div> \
						<div id=\"RESFeatureRequest\"> \
							So you want to request a feature, great!  Please just consider the following, first:<br> \
							<ol> \
								<li>Have you searched /r/Enhancement to see if someone else has requested it?</li> \
								<li>Is it something that would appeal to Reddit as a whole?  Personal or subreddit specific requests usually aren't added to RES.</li> \
							</ol> \
							<br> \
							Please also check out the latest known popular feature requests first:<br> \
							<ul id=\"RESKnownFeatureRequests\"><li style=\"color: red;\">Loading...</li></ul> \
							<span id=\"submittingFeature\" class=\"submittingToEnhancementButton\">I still want to submit a feature request!<span> \
						</div> \
					</div>";
					insertAfter(textDesc, this.submittingToEnhancement);
					setTimeout(function() {
						$('#RESSubmitBug').click(
							function() { 
								$('#RESSubmitOptions').fadeOut(
									function() { 
										$('#RESBugReport').fadeIn(); 
										GM_xmlhttpRequest({
											method:	"GET",
											url:	'http://redditenhancementsuite.com/knownbugs.json',
											onload:	function(response) {
												$('#RESKnownBugs').html('');
												var data = safeJSON.parse(response.responseText);
												$.each(data, function(key, val) {
													$('#RESKnownBugs').append('<li><a target="_blank" href="'+val.url+'">'+val.description+'</a></li>');
												});
											}
										});
									}
								);
							}
						);
						$('#RESSubmitFeatureRequest').click(
							function() { 
								$('#RESSubmitOptions').fadeOut(
									function() { 
										$('#RESFeatureRequest').fadeIn(); 
										$.getJSON('http://redditenhancementsuite.com/knownfeaturerequests.json', function(data) {
											$('#RESKnownFeatureRequests').html('');
											$.each(data, function(key, val) {
												$('#RESKnownFeatureRequests').append('<li><a target="_blank" href="'+val.url+'">'+val.description+'</a></li>');
											});
										});
									}
								);
							}
						);
						$('#submittingBug').click(
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
								txt+= "- Platform: " + BrowserDetect.OS + "\n";
								txt+= "- Did you search /r/RESIssues before submitting this: No. That, or I didn't notice this text here and edit it!\n\n";
								$('.usertext-edit textarea').val(txt);
								title.value = '[bug] Please describe your bug here. If you have screenshots, please link them in the selftext.';
							}
						);
						$('#submittingFeature').click(
							function() { 
								$('#sr-autocomplete').val('Enhancement');
								$('#submittingToEnhancement').fadeOut();
								title.value = '[feature request] Please summarize your feature request here, and elaborate in the selftext.';
							}
						);
						$('#RESSubmitOther').click(
							function() { 
								$('#sr-autocomplete').val('Enhancement');
								$('#submittingToEnhancement').fadeOut();
								title.value = '';
							}
						);
						$('#submittingToEnhancement').fadeIn();
					}, 1000);
				} else if (typeof(this.submittingToEnhancement) != 'undefined') {
					this.submittingToEnhancement.parentNode.removeChild(this.submittingToEnhancement);
					if (title.value == 'Submitting a bug? Please read the box above...') {
						title.value = '';
					}
				}
			}
		} 
	}