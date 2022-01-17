function(/*String*/ url){
		// summary:
		//		Opens the application at the specified URL for testing, redirecting dojo to point to the application environment instead of the test environment.
		//
		// url:
		//		URL to open. Any of the test's dojo.doc calls (e.g. dojo.byId()), and any dijit.registry calls (e.g. dijit.byId()) will point to elements and widgets inside this application.
		//

		iframe.src=url;
		// see above note about race conditions
		if(robotReady){
			attachIframe();

		}
	}