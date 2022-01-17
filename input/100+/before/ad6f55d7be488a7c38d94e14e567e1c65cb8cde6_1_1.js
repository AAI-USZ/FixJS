function(port) {
    if (port.name == 'bummer_facebook') {
	port.onMessage.addListener(function(msg) {
	    if (msg.type == 'access_token_request') {
		Current_FBUID = msg.id;
		port.postMessage({ 
		    type: 'access_token_response', 
		    access_token: localStorage['access_token_' + Current_FBUID] 
		});
	    }
	});
	Bummer_Facebook_Port = port;
    }
}