function(url, params, load, error, formEnabled, loadingFunction) {
    //validate form param.
    formEnabled = formEnabled == null ? true : formEnabled;
    //default error.
    var defaultError = function(error, ioargs) {
        console.error("default error ", error);
    };
    if (error == null) {
      error = defaultError;
    }
    //get the xhr encapsulated error message.
    errorWrapper = function (errorText, xhrError) {
    	if (typeof(xhrError === "object")){
	    	var responseText = dojo.fromJson(xhrError.xhr.response);
	    	error(responseText.error);
    	} else {
    		error(errorText || "undefined error");
    	}
    };
    //console.debug("Form POST ", form);
    if (load == null || url == null || params == null){
        console.error("error params required.");
    } else {
    	var innerLoad = function(data) {
    		loadingFunction == null ? "" : loadingFunction.end();
    		load(data);
    	};
    	//load = innerLoad(load);    	
        var xhrArgs = {
            url: url,
            postData: dojo.objectToQuery(params),
            handleAs: "json",
            //headers: { "Content-Type": "application/json", "Accept": "application/json" },
            load: innerLoad,
            preventCache: true,
            error: errorWrapper
        };
        //initialize the loading
        loadingFunction == null ? "" : loadingFunction.init();
        //make the call
        var deferred = dojo.xhrPost(xhrArgs);
    }
}