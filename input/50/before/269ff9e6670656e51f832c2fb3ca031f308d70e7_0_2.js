function() {
				// websocket was closed, try to reconnect in a bit.
				C4.status("Connection was closed by server");
				C4.clear_seeks();
				setTimeout(function(){C4.connect(url);}, 5000);
			}