function() {
    var ui = this;
    var move = calculateMove(this.board.squares);
    if (move.error) {
        alert(move.error);
        return;
    }
    this.endMove();
    for (var i = 0; i < move.tilesPlaced.length; i++) {
        var tilePlaced = move.tilesPlaced[i];
        var square = ui.board.squares[tilePlaced.x][tilePlaced.y];
        square.tileLocked = true;
        ui.updateBoardSquare(square);
    }
    console.log(move.tilesPlaced);
    ui.sendMoveToServer('makeMove',
                        move.tilesPlaced,
                        bind(this.processMoveResponse, ui));

    ui.enableNotifications();
}