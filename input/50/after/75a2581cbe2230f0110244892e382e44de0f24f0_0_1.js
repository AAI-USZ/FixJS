function(newVal) {
    if (arguments.length > 0) {
        this.board.locked = newVal;
        this.refreshBoard();
    }
    return this.board.locked;
}