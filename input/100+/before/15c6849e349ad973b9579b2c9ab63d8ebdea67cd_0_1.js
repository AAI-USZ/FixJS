function showMenu(){
    clear();
    // turn off game loop and event handlers
    document.onkeydown = null;
    document.onkeyup = null;
    if (gameLoop) cancelAnimationFrame(gameLoop);
    // turn on menu loop and event handlers
    document.onclick = menuClick;
    document.onmousedown = function(){
    	click = true;
    }
    document.onmouseup = function(){
    	click = false;
    }
    document.onkeydown = function(evt){
    	keydown = true;
    	keycode = evt.keyCode;
    	console.log(String.fromCharCode(keycode))
    }
    document.onkeyup = function(evt){
    	keydown = false;
    	keycode = 0;
    }
    menuLoop = requestAnimationFrame(drawMenu);
}