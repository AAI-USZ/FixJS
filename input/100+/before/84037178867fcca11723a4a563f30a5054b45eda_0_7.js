function(event) {
		keydown = true;
    	if(event.keyCode > 48 && event.keyCode < 57){
    		keys.key1 = true;
    	}else if(event.keyCode > 65 && event.keyCode < 90){
    		keys[event.keycode-54] = true;
    	}else if(event.keyCode === 16){
    		keys[37] = true;
    	}else if(event.keyCode === 32){
    		keys.space = true;
    	}
    	keycode = event.keyCode;
    	
		switch (event.keyCode) {
			case 87: // 'w' key
			case 38: // up arrow
				move.down = move.right = move.left = false;
				move.up= move.up_m = true;
			break;

			case 65: // 'a' key
			case 37: // left arrow
				move.right = move.up= move.down = false;
				move.left = move.left_m = true;
			break;

			case 83: // 's' key
			case 40: // down arrow
				move.up= move.left = move.right = false;
				move.down = move.down_m = true;
			break;

			case 68: // 'd' key
			case 39: // right arrow
				move.left = move.up= move.down = false;
				move.right = move.right_m = true;
			break;
			
			case 27: // 'esc' key
			    showMenu();
			    break;
			
		}
}