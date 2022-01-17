function(square) {
    var oldCursorSquare = ui.cursor.square;
    ui.cursor.square = square;
    ui.updateBoardSquare(square);
    ui.updateBoardSquare(oldCursorSquare);
}