function (errorText, xhrError) {
    	if (typeof(xhrError === "object")){
	    	var responseText = dojo.fromJson(xhrError.xhr.response);
	    	error(responseText.error);
    	} else {
    		error(errorText || "undefined error");
    	}
    }