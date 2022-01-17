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
		return false;
	}