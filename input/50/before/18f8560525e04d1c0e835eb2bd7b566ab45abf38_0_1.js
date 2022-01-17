function initMenu(){
    // test image data
    load_char();
    window.menu = Menu();
    // also init game, but don't start it yet
    initGame();
    showMenu();
}