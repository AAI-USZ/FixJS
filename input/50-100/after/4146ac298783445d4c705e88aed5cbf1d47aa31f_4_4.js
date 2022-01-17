function() {
	//TODO:: http://code.jquery.com/jquery-1.7.2.js:8138// #5280: Internet Explorer will keep connections alive if we don't abort on unload http://bugs.jquery.com/ticket/5280
	//TODO:: http://code.jquery.com/jquery-1.7.2.js:7587// Add protocol if not provided (#5866: IE7 issue with protocol-less urls) http://bugs.jquery.com/ticket/5866
	//TODO:: full XMLHttpRequest shim
	var xhr;
	try {
		xhr = new ActiveXObject("Msxml2.XMLHTTP");
	}
	catch (ex) {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var _xhr_send = xhr.send;
	
	xhr.send = function() {
		//Fixes IE Caching problem
        this.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");//TODO:: tests
        _xhr_send.apply(this, arguments);
	}
}