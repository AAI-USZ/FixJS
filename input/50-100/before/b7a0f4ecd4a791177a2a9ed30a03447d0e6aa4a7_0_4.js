function handleKey(ev) {
    switch (ev.keyCode) {
        case KEY_LEFT:
            direction = [-1,0];
            break;
        case KEY_UP:
            direction = [0,-1];
            break;
        case KEY_RIGHT:
            direction = [1,0];
            break;
        case KEY_DOWN:
            direction = [0,1];
            break;
        default:
            return true;
    }
    try {
        player.move(direction);
    }
    catch (e) {
        return true;
    }
}