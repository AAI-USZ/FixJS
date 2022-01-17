function(event) {
	    websocket.state = WebSocketsWorking;

	    /*
	     * WebSockets are suppossedly reliable, but there is nothing
	     * in the protocol that makes them so...
	     *
	     * WebSockets are supposedly using a ping/pong protocol to
	     * motivate proxies to keep connections open, but we've never
	     * seen a browser pinging us ?
	     *
	     * So, we ping pong ourselves. It costs virtually nothing.
	     */
	    websocket.keepAlive = setInterval
	    (function() {
	       if (ws.readyState == 1)
		 ws.send('&signal=ping');
	       else {
		 clearInterval(websocket.keepAlive);
		 websocket.keepAlive = null;
	       }
	     }, _$_SERVER_PUSH_TIMEOUT_$_);
	  }