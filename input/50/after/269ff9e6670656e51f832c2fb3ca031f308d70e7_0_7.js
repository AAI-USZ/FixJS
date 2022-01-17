function(col) {
		if (C4.canPlay()){
			C4.sock.send("PLAY "+C4.gameId+" DROP "+col);
			C4.debug("Sending move");
		}
	}