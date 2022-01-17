function(evt){
	var mousePos = getMousePos(canvas, evt);
	
	// Set player x to mouse's x
	player.x = mousePos.x-player.width/2;
	
	// Check bounds with canvas size, correct if outside bounds
	if(player.x >= canvas.width-player.width){
	    player.x = canvas.width-player.width;
	} else if(player.x <= 0){
	    player.x = 0;
	}
    }