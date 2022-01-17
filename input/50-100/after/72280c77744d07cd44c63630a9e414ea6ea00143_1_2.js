function(msg) {
		console.log(msg);
		if(msg == "Connection down :-(") {
			initialKillProcess();
		}
	}