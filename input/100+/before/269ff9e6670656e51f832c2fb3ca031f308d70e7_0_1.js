function(url) 
	{
		C4.status("Trying to connect to server "+url);
		if ("MozWebSocket" in window) {
			WebSocket = MozWebSocket;
		}
		if ("WebSocket" in window) {
			// browser supports websockets
			var ws = new WebSocket("ws://"+url);
			ws.onopen = function() {
				// websocket is connected
				C4.status("Connected to server");
				if (C4.playerId) 
					C4.send("CONNECT AS "+C4.playerId);
				else	
					C4.send("CONNECT");
				C4.add_handler(C4.cb_welcome);
			};
			ws.onmessage = function (evt) {
				var receivedMsg = evt.data;
				C4.onmessage(receivedMsg);
			};
			ws.onclose = function() {
				// websocket was closed, try to reconnect in a bit.
				C4.status("Connection was closed by server");
				C4.clear_seeks();
				setTimeout(function(){C4.connect(url);}, 5000);
			};
			this.sock = ws;
		} else {
			// browser does not support websockets
			this.status("sorry, your browser does not support websockets.");
		}
	}