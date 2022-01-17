function () {
    // ensure disconnection
    var xhr = io.util.request();
 	var uri = [
 	     'http' + (this.options.secure ? 's' : '') + ':/'
 	     , this.options.host + ':' + this.options.port
 	     , this.options.resource
 	     , io.protocol
 	     , this.sessionid
 	     ].join('/'); 
         
    xhr.open('GET', uri, true);
    xhr.send(null); 

    // handle disconnection immediately
    this.onDisconnect('booted');
  }