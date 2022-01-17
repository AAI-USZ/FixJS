function(msg) 
	{
		var welcome = msg.match(/^WELCOME (.+)$/);
		if (welcome) {
			var newPlayerId = !C4.playerId || (welcome[1] != C4.playerId);
			C4.playerId = welcome[1];
			C4.debug("We are player "+C4.playerId);
			$("#disconnected-warning").text("");
			C4.remove_handler(C4.cb_welcome);
			C4.add_handler(C4.cb_seek_notifications);
			C4.add_handler(C4.cb_new_game);
			if (C4.privGameId)
				C4.send("ACCEPT_SEEK "+C4.privGameId);
			if (newPlayerId)
				$.mobile.changePage($("#main"));
			return true;
		} else
			return false;
	}