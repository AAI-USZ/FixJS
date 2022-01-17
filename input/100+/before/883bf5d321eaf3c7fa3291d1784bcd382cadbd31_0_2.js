function(callback,base_uri){
	    return fdjtAjax(function(req) {
		callback(req.responseXML);},
			    base_uri,fdjtDOM.Array(arguments,2));}