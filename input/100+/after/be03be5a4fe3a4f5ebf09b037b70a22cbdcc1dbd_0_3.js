function(msg)
	{
		if (C4.gameId)
			return false;
		
		var m;
		if (m = msg.match(/^SEEK_ISSUED (\d+) C4 (STD|POP) (\d+)x(\d+)$/)) {
			C4.debug("Adding seek "+msg);
			C4.add_seek({variant:m[2],id:+m[1],board_width:+m[3],board_height:+m[4]});
			return true;
		} 
		if(m = msg.match(/^SEEK_REMOVED (\d+)$/)) {
			C4.debug("Removing seek : "+msg);
			C4.remove_seek(+m[1]);
			return true;
		} 
		if (m = msg.match(/^SEEK_PENDING ANON (\d+) C4 (STD|POP) (\d+)x(\d+)$/)){
			var seek = {id:+m[1],variant:m[2],board_width:+m[3],board_height:+m[4]};
			C4.add_my_seek(seek);
			C4.debug("Waiting for another player");
			return true;
		}
		
		if (m = msg.match(/^SEEK_PENDING PRIV (\d+) C4 (STD|POP) (\d+)x(\d+)$/)){
			var seek = {id:+m[1],variant:m[2],board_width:+m[3],board_height:+m[4]};
			$("#email-btn").attr("href", "mailto:?subject=Join a game of 4-in-line" +
					"&body=Click to join the game %0A%0A" +
					"http://"+window.location.hostname+"/?g="+seek.id);
			$("#priv-game-id").text(seek.id);
			C4.debug("Waiting for another player");
			$.mobile.changePage($("#friend-wait"));
			return true;
		}
		
		if (m = msg.match(/^DUPLICATE_SEEK (\d+)$/)) {
			return true;
		}
		
		if(m = msg.match(/^SEEK_CANCELED (\d+)$/)){
			C4.debug(msg);
			var seekId = +m[1];
			C4.remove_my_seek(seekId);
			return true;
		}
		
		if(msg.match(/^NO_SEEK_FOUND (\d+)$/)){
			C4.debug(msg);
			return  true;
		}
		if (msg.match(/^NO_GAMES$/)){
			$.mobile.changePage($("#main"));
			return true;
		}
		return false;
	}