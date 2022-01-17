function fdjtAjax(callback,base_uri,args){
	    var req=new XMLHttpRequest();
	    var uri=compose_uri(base_uri,args);
	    req.open("GET",uri,true);
	    req.withCredentials=true;
	    req.onreadystatechange=function () {
		if ((req.readyState == 4) && (req.status == 200)) {
		    callback(req);}};
	    req.send(null);
	    return req;}