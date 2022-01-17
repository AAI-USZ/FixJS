function() {
				// websocket is connected
				C4.status("Connected to server");
				if (C4.playerId) 
					C4.send("CONNECT AS "+C4.playerId);
				else	
					C4.send("CONNECT");
				C4.add_handler(C4.cb_welcome);
			}