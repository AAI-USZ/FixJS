function() {
			console.log("Navigating to " + title);
			if(options.hideCurrent) {
				$("#content").show();
				// see http://forrst.com/posts/iOS_scrolling_issue_solved-rgX
				// Fix for bug causing page to not scroll in iOS 5.x when visited from nearby
				chrome.scrollTo("#content", 0);
			}			
		}