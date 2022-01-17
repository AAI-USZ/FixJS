function fdjtAjax(success_callback,base_uri,args,other_callback){
	    var req=new XMLHttpRequest();
	    var uri=((args)?(compose_uri(base_uri,args)):(base_uri));
	    req.open("GET",uri,true);
	    req.withCredentials=true;
	    req.onreadystatechange=function () {
		if ((req.readyState == 4) && (req.status == 200)) {
		    success_callback(req);}
		else if (other_callback) other_callback(req);};
	    req.send(null);
	    return req;}