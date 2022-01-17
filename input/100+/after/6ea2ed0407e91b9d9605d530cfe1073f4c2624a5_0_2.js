function WebGLPrepare(users) {
	players = new Array();
  	$.each(users, function(id, user){
    		players[user.nick] = new player(new point(user.x, user.y), user.direction);
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
			ui_set_user_color(xplr, rgbtostring(hsv2rgb(new hsv(players[xplr].min_hue, 1, 1))), 
					rgbtostring(hsvtorgb(new hsv(players[xplr].max_hue, 1, 1))))
		}
	} else {
		var ah=0;
		for(xplr in players) {
			players[xplr].min_hue = ah;
			players[xplr].max_hue = ah;
			ui_set_user_color(xplr, rgbtostring(hsvtorgb(new hsv(players[xplr].min_hue, 1, 1))), 
					rgbtostring(hsvtorgb(new hsv(players[xplr].max_hue, 1, 1))))
			ah += 360/plrcnt;
		}
	}

	init();
}