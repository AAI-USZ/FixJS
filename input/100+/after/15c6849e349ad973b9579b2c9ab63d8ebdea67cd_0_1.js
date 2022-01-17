function showMenu(){
    clear();
    // turn off game loop and event handlers
    document.onkeydown = null;
    document.onkeyup = null;
    if (gameLoop) cancelAnimationFrame(gameLoop);
    if (settingsLoop) cancelAnimationFrame(settingsLoop);
    // turn on menu loop and event handlers
    menuLoop = requestAnimationFrame(drawMenu);
    document.onclick = menuClick;
    document.onmousedown = function(){
    	click = true;
    }
    document.onmouseup = function(){
    	click = false;
    }
    document.onkeydown = function(evt){
    	keydown = true;
    	if(evt.keyCode > 48 && evt.keyCode < 57){
    		keys.key1 = true;
    	}else if(evt.keyCode > 65 && evt.keyCode < 90){
    		keys[evt.keycode-54] = true;
    	}else if(evt.keyCode === 16){
    		keys[37] = true;
    	}
    	keycode = evt.keyCode;
    	console.log(String.fromCharCode(keycode))
    }
    document.onkeyup = function(evt){
    	keydown = false;
    	keycode = 0;
    	lastkeycode = 0;
    }
}