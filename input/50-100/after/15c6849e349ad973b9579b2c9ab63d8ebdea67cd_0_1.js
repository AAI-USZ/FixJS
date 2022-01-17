function showGame(){
    // turn off menu loop and event handlers
    document.onclick = null;
    document.onkeydown = null;
    document.onkeyup = null;
    if (menuLoop) cancelAnimationFrame(menuLoop);
    // turn on game loop and event handlers
    document.onkeydown = gameKeydown;
    document.onkeyup = gameKeyup;
	gameLoop = requestAnimationFrame(drawGame);
	return false;
}