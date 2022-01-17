function() {
		if(C4.gameId){
			C4.sock.send("QUIT_GAME "+C4.gameId);
		}
	}