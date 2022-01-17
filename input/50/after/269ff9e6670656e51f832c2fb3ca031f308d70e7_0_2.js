function() {
				// websocket was closed, try to reconnect in a bit.
				C4.status("No connection to server");
				C4.clear_seeks();
				setTimeout(function(){C4.connect(url);}, 5000);
			}