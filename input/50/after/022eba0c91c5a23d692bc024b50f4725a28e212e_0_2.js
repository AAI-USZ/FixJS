function(/*String*/ url){
		// summary:
		//		Opens the application at the specified URL for testing, redirecting dojo to point to the application environment instead of the test environment.
		// url:
		//		URL to open. Any of the test's dojo.doc calls (e.g. dojo.byId()), and any dijit.registry calls (e.g. dijit.byId()) will point to elements and widgets inside this application.

		if(robotReady){
			// If robot has already finished loading then create iframe pointing to specified URL
			attachIframe(url);
		}else{
			// Otherwise, set flag for robot to call attachIframe() when robot finishes initializing
			iframeUrl = url;
		}
	}