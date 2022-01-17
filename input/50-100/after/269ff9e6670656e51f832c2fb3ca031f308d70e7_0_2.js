function(msg) 
	{
		var welcome = msg.match(/^WELCOME (.+)$/);
		if (welcome) {
			C4.playerId = welcome[1];	
			C4.debug("We are player "+C4.playerId);
			C4.remove_handler(C4.cb_welcome);
			C4.add_handler(C4.cb_seek_notifications);
			$.mobile.changePage($("#main"));
			return true;
		} else
			return false;
	}