function(port) {
  console.log("Got an incoming connection: " + port.name);
  if (port.name == 'bummer_facebook') {
    port.onMessage.addListener(function(msg) {
      console.log("Got a request from bummer.js: " + msg.type);
      if (msg.type == 'access_token_request') {
	fetch_current_fbuid(function(cookie) {
	  console.log("Returning the access token: " + localStorage['access_token_' + Current_FBUID]);
	  port.postMessage({ 
	    type: 'access_token_response', 
	    status: 'ok',
	    access_token: localStorage['access_token_' + Current_FBUID],
	  });
	});
      }
      if (msg.type == 'uid_request') {
	fetch_current_fbuid(function(cookie) {
	  console.log("Returning the FBUID: " + Current_FBUID);
	  port.postMessage({
	    type: 'uid_response',
	    status: 'ok',
	    id: Current_FBUID
	  });
	});
      }
    });
    port.id = Bummer_Facebook_Ports.length;
    Bummer_Facebook_Ports[port.id] = port;
    port.onDisconnect.addListener(function(p) {
      console.log("port disconnect detected");
      console.log("Disconnecting " + p.id);
      delete Bummer_Facebook_Ports[p.id];
    });
  }
}