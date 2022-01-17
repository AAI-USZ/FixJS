function(event) {
	    websocket.state = WebSocketsWorking;

	    /*
	     * WebSockets are suppossedly reliable, but there is nothing
	     * in the protocol that makes them so ?
	     */
	    websocket.keepAlive = setInterval
	    (function() {
	       if (ws.readyState == 1)
		 ws.send('&signal=none');
	       else {
		 clearInterval(websocket.keepAlive);
		 websocket.keepAlive = null;
	       }
	     }, 3 * _$_SERVER_PUSH_TIMEOUT_$_);
	  }