function(gType) 
	{
		var boardSize = $("input[type='radio'][name='board-size']:checked").val();
		var gVar = $("input[type='radio'][name='game-variation']:checked").val();
		var cmd = "SEEK "+gType+" C4 "+gVar+" "+boardSize;
		C4.status(cmd);
		C4.sock.send(cmd);
		C4.add_handler(C4.cb_seek_reply);
		C4.add_handler(C4.cb_new_game);
		$.mobile.changePage($("#main"));
		// TODO: Disable the seek button, re-enable on timeout
	}