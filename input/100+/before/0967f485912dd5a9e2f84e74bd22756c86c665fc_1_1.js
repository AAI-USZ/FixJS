function WebGLPrepare(users) {
	players = new Array();
  $.each(users, function(id, user){
    players[user.nick] = new player();
  });
	var plrcnt = 0;
	for(xplr in players){
		plrcnt++;
	}
	if(plrcnt < 4){
		var ah=0;
		for(xplr in players) {
			players[xplr].min_hue = ah;
			players[xplr].max_hue = ah + 180/plrcnt;
			ah += 360/plrcnt;
		}
	} else {
		var ah=0;
		for(xplr in players) {
			players[xplr].min_hue = ah;
			players[xplr].max_hue = ah;
			ah += 360/plrcnt;
		}
	}

	init();
}