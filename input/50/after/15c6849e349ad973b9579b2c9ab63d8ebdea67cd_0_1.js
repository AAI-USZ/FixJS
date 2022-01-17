function initMenu(){
    window.menu = Menu();
    window.settings = Settings();
    // also init game, but don't start it yet
    initGame();
    showMenu();
}