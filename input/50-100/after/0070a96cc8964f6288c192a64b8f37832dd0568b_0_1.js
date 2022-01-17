function (errorText, xhrError) {
    	if (typeof(xhrError === "object")){
	    	var responseText = dojo.fromJson(xhrError.xhr.response);
	    	error(responseText.error.message);
    	} else {
    		error(errorText || "undefined error");
    	}
    }