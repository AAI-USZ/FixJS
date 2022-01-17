function(newVal) {
    if (arguments.length > 0) {
        boardLocked = newVal;
        this.refreshBoard();
    }
    return boardLocked;
}