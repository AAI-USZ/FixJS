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
    menuLoop = requestAnimationFrame(drawMenu);
}